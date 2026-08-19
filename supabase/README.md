# Listas compartidas — Supabase

## 1. Crear proyecto en Supabase

1. [supabase.com](https://supabase.com) → nuevo proyecto.
2. **SQL Editor** → ejecutar:
   - `migrations/001_shared_lists.sql`
   - `migrations/002_shared_list_items_due_date.sql`
3. **Database → Replication** → activar Realtime en:
   - `shared_lists`
   - `shared_list_items`

## 2. Variables de entorno

Copia `.env.example` a `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

(La anon key es pública — coherente con el modelo sin login.)

## 3. Instalar dependencias

```bash
npm install
```

## 4. Arrancar

```bash
npm run dev
```

La primera conexión con BD vacía inserta las listas demo (Carrefour, Mercadona).

## Modelo

- `shared_lists` — listas
- `shared_list_items` — elementos (CASCADE al borrar lista)
- RLS público: lectura y escritura para `anon`

## Fuente de verdad

- **Supabase** = verdad
- `barriguitas:lists-cache` = caché local (solo lectura rápida / offline)
- `barriguitas:data` → ya **no** incluye listas
