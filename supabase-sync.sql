-- OSCI Motion Lager-Sync: sichere Supabase Tabellen + Row Level Security
-- Diese Datei im Supabase Dashboard unter "SQL Editor" ausführen.
-- Sie kann erneut ausgeführt werden und ersetzt alte Policies sauber.

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
alter table public.warehouses alter column owner set default auth.uid();

drop policy if exists "warehouse owners can insert" on public.warehouses;
drop policy if exists "warehouse owners and members can read" on public.warehouses;
drop policy if exists "warehouse owners and write members can update" on public.warehouses;
drop policy if exists "warehouse owners can delete" on public.warehouses;
drop policy if exists "members visible to owners and themselves" on public.warehouse_members;
drop policy if exists "only warehouse owners can add members" on public.warehouse_members;
drop policy if exists "only warehouse owners can change members" on public.warehouse_members;
drop policy if exists "only warehouse owners can remove members" on public.warehouse_members;

drop trigger if exists set_warehouse_owner_before_insert on public.warehouses;

drop function if exists public.upsert_warehouse_data(uuid, text, jsonb);
drop function if exists public.upsert_warehouse_data(uuid, jsonb, text);
drop function if exists public.list_accessible_warehouses();
drop function if exists public.save_warehouse(uuid, jsonb, text);
drop function if exists public.save_warehouse(uuid, text, jsonb);
drop function if exists public.can_manage_warehouse_members(uuid);
drop function if exists public.has_warehouse_access(uuid, text);
drop function if exists public.is_warehouse_owner(uuid);
drop function if exists public.current_user_email();
drop function if exists public.set_warehouse_owner();

create or replace function public.current_user_email()
returns text
language sql
stable
security definer
set search_path = public
as $$
    select lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

create or replace function public.is_warehouse_owner(target_warehouse_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.warehouses w
        where w.id = target_warehouse_id
          and w.owner = auth.uid()
    );
$$;

create or replace function public.has_warehouse_access(target_warehouse_id uuid, required_role text default 'read')
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select
        public.is_warehouse_owner(target_warehouse_id)
        or exists (
            select 1
            from public.warehouse_members wm
            where wm.warehouse_id = target_warehouse_id
              and lower(wm.email) = public.current_user_email()
              and (
                  required_role = 'read'
                  or wm.role = 'write'
              )
        );
$$;

create or replace function public.can_manage_warehouse_members(target_warehouse_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select public.is_warehouse_owner(target_warehouse_id);
$$;

create or replace function public.set_warehouse_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    new.owner := auth.uid();
    return new;
end;
$$;

create trigger set_warehouse_owner_before_insert
before insert on public.warehouses
for each row
execute function public.set_warehouse_owner();

create or replace function public.upsert_warehouse_data(
    target_warehouse_id uuid,
    warehouse_name text,
    warehouse_data jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
    saved_id uuid;
begin
    if auth.uid() is null then
        raise exception 'not authenticated';
    end if;

    if target_warehouse_id is null then
        insert into public.warehouses (owner, name, data, updated_at)
        values (auth.uid(), coalesce(warehouse_name, 'Lager'), coalesce(warehouse_data, '{}'::jsonb), now())
        returning id into saved_id;
        return saved_id;
    end if;

    if not public.has_warehouse_access(target_warehouse_id, 'write') then
        raise exception 'no write access for warehouse %', target_warehouse_id;
    end if;

    update public.warehouses
    set name = coalesce(warehouse_name, name),
        data = coalesce(warehouse_data, data),
        updated_at = now()
    where id = target_warehouse_id
    returning id into saved_id;

    return saved_id;
end;
$$;

create or replace function public.list_accessible_warehouses()
returns table (
    id uuid,
    owner uuid,
    owner_email text,
    name text,
    data jsonb,
    updated_at timestamptz,
    access_role text
)
language sql
stable
security definer
set search_path = public
as $$
    select
        w.id,
        w.owner,
        lower(coalesce(u.email, '')),
        w.name,
        w.data,
        w.updated_at,
        'owner'::text as access_role
    from public.warehouses w
    left join auth.users u on u.id = w.owner
    where w.owner = auth.uid()

    union all

    select
        w.id,
        w.owner,
        lower(coalesce(u.email, '')),
        w.name,
        w.data,
        w.updated_at,
        wm.role as access_role
    from public.warehouse_members wm
    join public.warehouses w on w.id = wm.warehouse_id
    left join auth.users u on u.id = w.owner
    where lower(wm.email) = public.current_user_email()
      and w.owner <> auth.uid();
$$;

create policy "warehouse owners can insert"
on public.warehouses
for insert
to authenticated
with check (true);

create policy "warehouse owners and members can read"
on public.warehouses
for select
to authenticated
using (public.has_warehouse_access(id, 'read'));

create policy "warehouse owners and write members can update"
on public.warehouses
for update
to authenticated
using (public.has_warehouse_access(id, 'write'))
with check (public.has_warehouse_access(id, 'write'));

create policy "warehouse owners can delete"
on public.warehouses
for delete
to authenticated
using (public.is_warehouse_owner(id));

create policy "members visible to owners and themselves"
on public.warehouse_members
for select
to authenticated
using (
    lower(email) = public.current_user_email()
    or public.can_manage_warehouse_members(warehouse_id)
);

create policy "only warehouse owners can add members"
on public.warehouse_members
for insert
to authenticated
with check (public.can_manage_warehouse_members(warehouse_id));

create policy "only warehouse owners can change members"
on public.warehouse_members
for update
to authenticated
using (public.can_manage_warehouse_members(warehouse_id))
with check (public.can_manage_warehouse_members(warehouse_id));

create policy "only warehouse owners can remove members"
on public.warehouse_members
for delete
to authenticated
using (public.can_manage_warehouse_members(warehouse_id));

grant execute on function public.current_user_email() to authenticated;
grant execute on function public.is_warehouse_owner(uuid) to authenticated;
grant execute on function public.has_warehouse_access(uuid, text) to authenticated;
grant execute on function public.can_manage_warehouse_members(uuid) to authenticated;
grant execute on function public.set_warehouse_owner() to authenticated;
grant execute on function public.upsert_warehouse_data(uuid, text, jsonb) to authenticated;
grant execute on function public.list_accessible_warehouses() to authenticated;

notify pgrst, 'reload schema';
