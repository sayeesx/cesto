# Migration Guide: Supabase to Self-Hosted Hetzner

This guide outlines the procedure to safely migrate the Cesto production database from Supabase to a self-hosted Hetzner PostgreSQL deployment without changing application code.

## 1. Preparation & Backup (Supabase)

1. Pause application traffic (enable maintenance mode on frontend).
2. Export the current database from Supabase using `pg_dump`:
   ```bash
   pg_dump -h YOUR_SUPABASE_DB_HOST -U postgres -d postgres -F c -b -v -f cesto_prod_backup.dump
   ```
   *Note: Use your Supabase connection string. RLS policies will be included.*

## 2. Restore to Hetzner

1. Ensure the Hetzner PostgreSQL instance is running and accessible (via Docker/compose).
2. Restore the backup:
   ```bash
   pg_restore -h YOUR_HETZNER_IP -U postgres -d cesto_prod -1 cesto_prod_backup.dump
   ```
3. Verify row counts on critical tables:
   ```sql
   SELECT count(*) FROM "Product";
   SELECT count(*) FROM "Order";
   SELECT count(*) FROM "User";
   ```

## 3. Environment Variable Updates

1. On the NestJS backend host, update the `.env` file:
   ```dotenv
   # Old
   # DATABASE_URL=postgresql://postgres:supa_pass@db.xxxx.supabase.co:5432/postgres
   # New
   DATABASE_URL=postgresql://postgres:your_hetzner_pass@your_hetzner_ip:5432/cesto_prod
   ```

## 4. Prisma Verification

1. Run Prisma migrate status to ensure the shadow database and migration history match:
   ```bash
   npx prisma migrate status
   ```
2. If utilizing connection pooling, ensure `PrismaPg` adapter is appropriately configured for the Hetzner PgBouncer setup if applicable.

## 5. R2 Media and Webhooks Continuity

1. Cloudflare R2 configurations remain unchanged since they are independent of Supabase storage.
2. Update the Razorpay webhook URL to point to the new Hetzner backend IP/Domain:
   * Current: `https://api.cesto.in/v1/payments/webhook` (ensure DNS points to Hetzner).

## 6. RLS Notes (Important Caveat)

**Crucial Architecture Note regarding Security**:
While hosted on Supabase, "Deny All Public" RLS policies were applied to prevent direct frontend queries to the database. 
However, **the NestJS backend uses a direct PostgreSQL connection string (typically with superuser or privileged roles)**. Prisma executes queries overriding RLS.
Therefore, moving to Hetzner (where RLS might not be natively enforced at the edge) is fully secure and safe because all database interactions are brokered by the NestJS backend via Prisma, which enforces its own RBAC rules.
The lack of Supabase edge RLS does not compromise the application when self-hosted.

## 7. Rollback Checklist

If the Hetzner migration fails:
1. Revert `DATABASE_URL` back to the Supabase connection string.
2. Disable maintenance mode.
3. Investigate the `pg_restore` logs.
