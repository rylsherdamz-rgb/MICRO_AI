-- ============================================================
-- MICRO — Initial Schema
-- AI Project Marketplace on Stellar
-- ============================================================

-- Clean slate: drop existing tables in reverse-dependency order
drop table if exists public.transactions cascade;
drop table if exists public.recommendations cascade;
drop table if exists public.projects cascade;
drop table if exists public.ai_solutions cascade;
drop table if exists public.categories cascade;
drop table if exists public.companies cascade;

-- ============================================================
-- COMPANIES — AI solution publishers/builders
-- ============================================================
create table public.companies (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text not null default '',
  long_description text default '',
  website_url   text,
  logo_url      text,
  stellar_address text,                     -- Stellar public key for payments
  tags          text[] default '{}',
  rating        numeric(2,1) default 0,     -- 0.0 to 5.0
  verified      boolean default false,      -- KYC/verification flag
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- CATEGORIES — Taxonomy for AI solutions
-- ============================================================
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text
);

-- ============================================================
-- AI_SOLUTIONS — Published AI models, agents, and workflows
-- ============================================================
create table public.ai_solutions (
  id              uuid primary key default gen_random_uuid(),
  company_id      uuid not null references public.companies(id) on delete cascade,
  title           text not null,
  slug            text not null unique,
  description     text not null,
  long_description text,
  category        text,                      -- denormalized for fast filtering
  pricing_model   text not null default 'free',  -- free, subscription, one_time, usage_based
  pricing_amount  numeric(12,2) default 0,
  asset_code      text default 'XLM',        -- Stellar asset for payment
  use_cases       text[] default '{}',
  examples        jsonb default '[]',        -- [{title, description, output}]
  tech_stack      text[] default '{}',       -- models, frameworks, APIs used
  status          text not null default 'draft',  -- draft, published, archived
  installs_count  integer default 0,
  stellar_contract_address text,             -- Soroban escrow contract
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- PROJECTS — User-created projects seeking AI solutions
-- ============================================================
create table public.projects (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  title               text not null,
  problem_description text not null,
  desired_outcome     text,
  status              text not null default 'draft',  -- draft, seeking, matched, in_progress, completed, cancelled
  budget_min          numeric(12,2),
  budget_max          numeric(12,2),
  asset_code          text default 'XLM',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ============================================================
-- RECOMMENDATIONS — AI ↔ project matching
-- ============================================================
create table public.recommendations (
  id              uuid primary key default gen_random_uuid(),
  project_id      uuid not null references public.projects(id) on delete cascade,
  solution_id     uuid not null references public.ai_solutions(id) on delete cascade,
  relevance_score numeric(3,2) default 0,     -- 0.00 to 1.00
  reasoning       text,
  status          text not null default 'suggested',  -- suggested, accepted, rejected
  created_at      timestamptz not null default now(),
  unique(project_id, solution_id)
);

-- ============================================================
-- TRANSACTIONS — Off-chain record of Stellar payments
-- ============================================================
create table public.transactions (
  id              uuid primary key default gen_random_uuid(),
  stellar_tx_hash text not null unique,
  from_address    text not null,
  to_address      text not null,
  amount          numeric(18,7) not null,
  asset_code      text not null default 'XLM',
  memo            text,
  project_id      uuid references public.projects(id) on delete set null,
  solution_id     uuid references public.ai_solutions(id) on delete set null,
  tx_type         text not null default 'payment',  -- payment, escrow_fund, escrow_release, refund
  status          text not null default 'pending',   -- pending, completed, failed
  created_at      timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_companies_tags on public.companies using gin (tags);
create index idx_companies_rating on public.companies (rating desc);
create index idx_companies_slug on public.companies (slug);

create index idx_ai_solutions_company on public.ai_solutions (company_id);
create index idx_ai_solutions_category on public.ai_solutions (category);
create index idx_ai_solutions_status on public.ai_solutions (status);
create index idx_ai_solutions_pricing on public.ai_solutions (pricing_model, pricing_amount);
create index idx_ai_solutions_use_cases on public.ai_solutions using gin (use_cases);
create index idx_ai_solutions_slug on public.ai_solutions (slug);

create index idx_projects_user on public.projects (user_id);
create index idx_projects_status on public.projects (status);

create index idx_recommendations_project on public.recommendations (project_id);
create index idx_recommendations_solution on public.recommendations (solution_id);
create index idx_recommendations_score on public.recommendations (relevance_score desc);

create index idx_transactions_project on public.transactions (project_id);
create index idx_transactions_solution on public.transactions (solution_id);
create index idx_transactions_hash on public.transactions (stellar_tx_hash);
create index idx_transactions_status on public.transactions (status);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_companies_updated_at
  before update on public.companies
  for each row execute function public.update_updated_at();

create trigger trg_ai_solutions_updated_at
  before update on public.ai_solutions
  for each row execute function public.update_updated_at();

create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Companies: public read, authenticated create/update own
alter table public.companies enable row level security;
create policy "Companies are viewable by everyone" on public.companies
  for select using (true);
create policy "Authenticated users can create companies" on public.companies
  for insert with check (auth.role() = 'authenticated');

-- Categories: public read
alter table public.categories enable row level security;
create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

-- AI Solutions: public read for published, company owner can write
alter table public.ai_solutions enable row level security;
create policy "Published solutions are viewable by everyone" on public.ai_solutions
  for select using (status = 'published');
create policy "Authenticated users can create solutions" on public.ai_solutions
  for insert with check (auth.role() = 'authenticated');

-- Projects: users see their own
alter table public.projects enable row level security;
create policy "Users can view own projects" on public.projects
  for select using (auth.uid() = user_id);
create policy "Users can create own projects" on public.projects
  for insert with check (auth.uid() = user_id);
create policy "Users can update own projects" on public.projects
  for update using (auth.uid() = user_id);

-- Recommendations: users see recs for their projects
alter table public.recommendations enable row level security;
create policy "Users can view recs for own projects" on public.recommendations
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = recommendations.project_id
      and projects.user_id = auth.uid()
    )
  );

-- Transactions: public read
alter table public.transactions enable row level security;
create policy "Transactions are viewable by everyone" on public.transactions
  for select using (true);

-- ============================================================
-- SEED DATA: Categories
-- ============================================================
insert into public.categories (name, slug, description) values
  ('Content Generation', 'content-generation', 'AI models for text, image, video, and audio creation'),
  ('Data Analysis', 'data-analysis', 'AI for analytics, forecasting, and business intelligence'),
  ('Customer Support', 'customer-support', 'Chatbots, virtual agents, and support automation'),
  ('Developer Tools', 'developer-tools', 'Code generation, review, testing, and documentation AI'),
  ('Education', 'education', 'AI tutors, learning assistants, and educational content'),
  ('Marketing', 'marketing', 'Campaign generation, SEO, and marketing automation'),
  ('Finance', 'finance', 'Trading bots, risk analysis, and financial forecasting'),
  ('Research', 'research', 'Literature review, data synthesis, and research assistants');