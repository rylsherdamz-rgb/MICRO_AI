-- ============================================================
-- MICRO — Profiles & Supporting Tables
-- Extends auth.users with public profiles, reviews, bookmarks,
-- notifications, and project milestones
-- ============================================================

-- ============================================================
-- PROFILES — Public user profiles (extends auth.users)
-- ============================================================
create table public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  display_name      text not null,
  username          text not null unique,
  avatar_url        text,
  bio               text,
  website_url       text,
  twitter_handle    text,
  github_handle     text,
  discord_handle    text,
  stellar_address   text,                     -- primary Stellar wallet
  skills            text[] default '{}',
  role              text not null default 'user',  -- user, builder, admin
  reputation        integer default 0,
  completed_projects integer default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Only create trigger if it doesn't already exist
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute function public.handle_new_user();
  end if;
end $$;

-- ============================================================
-- REVIEWS — User reviews for AI solutions
-- ============================================================
create table public.reviews (
  id            uuid primary key default gen_random_uuid(),
  solution_id   uuid not null references public.ai_solutions(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  rating        integer not null check (rating between 1 and 5),
  title         text,
  body          text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(solution_id, user_id)              -- one review per user per solution
);

-- ============================================================
-- BOOKMARKS — Users can save AI solutions for later
-- ============================================================
create table public.bookmarks (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  solution_id   uuid not null references public.ai_solutions(id) on delete cascade,
  created_at    timestamptz not null default now(),
  unique(user_id, solution_id)
);

-- ============================================================
-- NOTIFICATIONS — System notifications for users
-- ============================================================
create table public.notifications (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null,
  body          text,
  notification_type text not null default 'system',  -- system, recommendation, transaction, project_update
  reference_id  uuid,                            -- optional FK to related entity
  reference_type text,                           -- 'project', 'solution', 'transaction', etc.
  is_read       boolean default false,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- PROJECT_MILESTONES — Milestones within a project
-- ============================================================
create table public.project_milestones (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects(id) on delete cascade,
  title         text not null,
  description   text,
  amount        numeric(12,2),                -- payment amount for this milestone
  asset_code    text default 'XLM',
  due_date      timestamptz,
  status        text not null default 'pending',  -- pending, funded, in_progress, completed, paid, disputed
  sort_order    integer not null default 0,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_profiles_username on public.profiles (username);
create index idx_profiles_role on public.profiles (role);
create index idx_profiles_skills on public.profiles using gin (skills);

create index idx_reviews_solution on public.reviews (solution_id);
create index idx_reviews_user on public.reviews (user_id);

create index idx_bookmarks_user on public.bookmarks (user_id);
create index idx_bookmarks_solution on public.bookmarks (solution_id);

create index idx_notifications_user on public.notifications (user_id);
create index idx_notifications_unread on public.notifications (user_id, is_read) where (not is_read);
create index idx_notifications_type on public.notifications (notification_type);

create index idx_project_milestones_project on public.project_milestones (project_id);
create index idx_project_milestones_status on public.project_milestones (status);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger trg_reviews_updated_at
  before update on public.reviews
  for each row execute function public.update_updated_at();

create trigger trg_project_milestones_updated_at
  before update on public.project_milestones
  for each row execute function public.update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Profiles: public read, own write
alter table public.profiles enable row level security;
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Reviews: public read, authenticated write own
alter table public.reviews enable row level security;
create policy "Reviews are viewable by everyone" on public.reviews
  for select using (true);
create policy "Authenticated users can create reviews" on public.reviews
  for insert with check (auth.uid() = user_id);
create policy "Users can update own reviews" on public.reviews
  for update using (auth.uid() = user_id);
create policy "Users can delete own reviews" on public.reviews
  for delete using (auth.uid() = user_id);

-- Bookmarks: private to owning user
alter table public.bookmarks enable row level security;
create policy "Users can view own bookmarks" on public.bookmarks
  for select using (auth.uid() = user_id);
create policy "Users can create own bookmarks" on public.bookmarks
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own bookmarks" on public.bookmarks
  for delete using (auth.uid() = user_id);

-- Notifications: private to owning user
alter table public.notifications enable row level security;
create policy "Users can view own notifications" on public.notifications
  for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications
  for update using (auth.uid() = user_id);

-- Milestones: visible to project owner and (if published) public
alter table public.project_milestones enable row level security;
create policy "Project owner can manage milestones" on public.project_milestones
  for all using (
    exists (
      select 1 from public.projects
      where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
    )
  );
create policy "Published project milestones are public" on public.project_milestones
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = project_milestones.project_id
      and projects.status in ('in_progress', 'completed')
    )
  );

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Update company rating when a new review is added
create or replace function public.update_company_rating()
returns trigger as $$
declare
  solution_company_id uuid;
begin
  select company_id into solution_company_id
  from public.ai_solutions where id = new.solution_id;

  update public.companies
  set rating = (
    select coalesce(round(avg(r.rating)::numeric, 1), 0)
    from public.reviews r
    join public.ai_solutions s on r.solution_id = s.id
    where s.company_id = solution_company_id
  )
  where id = solution_company_id;

  return new;
end;
$$ language plpgsql security definer;

-- Only create trigger if it doesn't already exist
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'on_review_rating_update') then
    create trigger on_review_rating_update
      after insert or update or delete on public.reviews
      for each row execute function public.update_company_rating();
  end if;
end $$;

-- Notify user when a recommendation is created
create or replace function public.notify_on_recommendation()
returns trigger as $$
begin
  insert into public.notifications (user_id, title, body, notification_type, reference_id, reference_type)
  select
    p.user_id,
    'New AI recommendation',
    'A new AI solution was recommended for your project "' || p.title || '"',
    'recommendation',
    new.id,
    'recommendation'
  from public.projects p
  where p.id = new.project_id;

  return new;
end;
$$ language plpgsql security definer;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'on_recommendation_created') then
    create trigger on_recommendation_created
      after insert on public.recommendations
      for each row execute function public.notify_on_recommendation();
  end if;
end $$;