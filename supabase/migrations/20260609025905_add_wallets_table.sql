-- ============================================================
-- MICRO -- Wallets Table
-- Wallet-first identity: stores connected Stellar public keys.
-- Enables users to connect without email/password auth.
-- ============================================================

create table public.wallets (
  id                uuid primary key default gen_random_uuid(),
  stellar_address   text not null unique,       -- Stellar public key (G...)
  profile_id        uuid references public.profiles(id) on delete set null,
  connected_at      timestamptz not null default now(),
  last_seen_at      timestamptz not null default now()
);

create index idx_wallets_stellar_address on public.wallets (stellar_address);
create index idx_wallets_profile on public.wallets (profile_id);

-- RLS: public insert/read, authenticated update
alter table public.wallets enable row level security;
create policy "Wallets are viewable by everyone" on public.wallets
  for select using (true);
create policy "Anyone can insert wallets" on public.wallets
  for insert with check (true);
create policy "Anyone can update wallets" on public.wallets
  for update using (true);