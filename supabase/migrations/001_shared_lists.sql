-- Listas compartidas (públicas, sin autenticación).
-- Ejecutar en el SQL Editor de Supabase.
-- Activar Realtime en Dashboard → Database → Replication para ambas tablas.

create table if not exists public.shared_lists (
  id text primary key,
  name text not null,
  icon text not null default '📝',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shared_list_items (
  id text primary key,
  list_id text not null references public.shared_lists (id) on delete cascade,
  text text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists shared_list_items_list_id_idx
  on public.shared_list_items (list_id);

alter table public.shared_lists enable row level security;
alter table public.shared_list_items enable row level security;

create policy "shared_lists_public_select"
  on public.shared_lists for select
  using (true);

create policy "shared_lists_public_insert"
  on public.shared_lists for insert
  with check (true);

create policy "shared_lists_public_update"
  on public.shared_lists for update
  using (true);

create policy "shared_lists_public_delete"
  on public.shared_lists for delete
  using (true);

create policy "shared_list_items_public_select"
  on public.shared_list_items for select
  using (true);

create policy "shared_list_items_public_insert"
  on public.shared_list_items for insert
  with check (true);

create policy "shared_list_items_public_update"
  on public.shared_list_items for update
  using (true);

create policy "shared_list_items_public_delete"
  on public.shared_list_items for delete
  using (true);

alter table public.shared_lists replica identity full;
alter table public.shared_list_items replica identity full;
