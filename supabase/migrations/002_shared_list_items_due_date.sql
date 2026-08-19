-- Fecha opcional por elemento de lista (solo día, sin hora).
-- Seguro para datos existentes: due_date queda null en todos los elementos actuales.

alter table public.shared_list_items
  add column if not exists due_date date;
