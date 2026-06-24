-- OSCI Motion Lager-Sync: sichere Supabase Tabellen + Row Level Security
-- Diese Datei im Supabase Dashboard unter "SQL Editor" ausführen.

create table if not exists public.warehouses (
    id uuid primary key default gen_random_uuid(),
    owner uuid not null references auth.users(id) on delete cascade default auth.uid(),
    name text not null default 'Lager',
    data jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.warehouse_members (
    id uuid primary key default gen_random_uuid(),
    warehouse_id uuid not null references public.warehouses(id) on delete cascade,
    email text not null,
    role text not null default 'read' check (role in ('read', 'write')),
    created_at timestamptz not null default now(),
    unique (warehouse_id, email)
);

alter table public.warehouses enable row level security;
alter table public.warehouse_members enable row level security;

drop policy if exists "warehouse owners can insert" on public.warehouses;
create policy "warehouse owners can insert"
on public.warehouses
for insert
to authenticated
with check (owner = auth.uid());

drop policy if exists "warehouse owners and members can read" on public.warehouses;
create policy "warehouse owners and members can read"
on public.warehouses
for select
to authenticated
using (
    owner = auth.uid()
    or exists (
        select 1
        from public.warehouse_members wm
        where wm.warehouse_id = warehouses.id
          and lower(wm.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
);

drop policy if exists "warehouse owners and write members can update" on public.warehouses;
create policy "warehouse owners and write members can update"
on public.warehouses
for update
to authenticated
using (
    owner = auth.uid()
    or exists (
        select 1
        from public.warehouse_members wm
        where wm.warehouse_id = warehouses.id
          and lower(wm.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
          and wm.role = 'write'
    )
)
with check (
    owner = auth.uid()
    or exists (
        select 1
        from public.warehouse_members wm
        where wm.warehouse_id = warehouses.id
          and lower(wm.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
          and wm.role = 'write'
    )
);

drop policy if exists "warehouse owners can delete" on public.warehouses;
create policy "warehouse owners can delete"
on public.warehouses
for delete
to authenticated
using (owner = auth.uid());

drop policy if exists "members visible to owners and themselves" on public.warehouse_members;
create policy "members visible to owners and themselves"
on public.warehouse_members
for select
to authenticated
using (
    lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or exists (
        select 1
        from public.warehouses w
        where w.id = warehouse_members.warehouse_id
          and w.owner = auth.uid()
    )
);

drop policy if exists "only warehouse owners can add members" on public.warehouse_members;
create policy "only warehouse owners can add members"
on public.warehouse_members
for insert
to authenticated
with check (
    exists (
        select 1
        from public.warehouses w
        where w.id = warehouse_members.warehouse_id
          and w.owner = auth.uid()
    )
);

drop policy if exists "only warehouse owners can change members" on public.warehouse_members;
create policy "only warehouse owners can change members"
on public.warehouse_members
for update
to authenticated
using (
    exists (
        select 1
        from public.warehouses w
        where w.id = warehouse_members.warehouse_id
          and w.owner = auth.uid()
    )
)
with check (
    exists (
        select 1
        from public.warehouses w
        where w.id = warehouse_members.warehouse_id
          and w.owner = auth.uid()
    )
);

drop policy if exists "only warehouse owners can remove members" on public.warehouse_members;
create policy "only warehouse owners can remove members"
on public.warehouse_members
for delete
to authenticated
using (
    exists (
        select 1
        from public.warehouses w
        where w.id = warehouse_members.warehouse_id
          and w.owner = auth.uid()
    )
);
