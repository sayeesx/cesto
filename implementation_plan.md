# Implementation Plan - Cesto Production Backend Foundation

This plan outlines the steps to build a production-grade backend for Cesto, ensuring portability from Supabase to self-hosted infrastructure.

## User Review Required

> [!IMPORTANT]
> The current auth implementation lacks refresh token rotation. I will implement a safe refresh strategy.
> Razorpay webhooks will be implemented with strict HMAC verification and idempotency logic.
> Inventory management will use transaction-level locking to prevent overselling in high-concurrency scenarios.

## Proposed Changes

### 1. Project Infrastructure & Environment
- **[MODIFY] .env**: Define all required environment variables for Razorpay, Cloudflare R2, Redis, etc.
- **[MODIFY] Dockerfile / docker-compose.yml**: Ensure production-ready Docker setup.

---

### 2. Database & Schema
- **[MODIFY] prisma/schema.prisma**: Add missing fields if any (e.g., failed payment handling, more detailed audit logs).
- **[NEW] prisma/seed.ts**: Implement comprehensive seeding for Categories, Occasions, Relationships, and 30+ Products as requested.

---

### 3. Authentication & RBAC
- **[MODIFY] auth.service.ts**: Add Refresh Token support, Logout, and Current User endpoints.
- **[NEW] guards/roles.guard.ts**: Implement Role-Based Access Control (CUSTOMER, ADMIN, VENDOR, etc.).
- **[NEW] decorators/roles.decorator.ts**: Create roles decorator for controllers.

---

### 4. Core Ecommerce Modules
- **[MODIFY] orders.service.ts**: Enhance [createOrder](file:///c:/Users/unknown%20user/OneDrive/Desktop/Narrs/cesto/apps/api/src/modules/orders/orders.service.ts#12-96) to handle coupons, validate delivery zones, and include comprehensive audit logs.
- **[MODIFY] payments.service.ts**: Implement Razorpay signature verification and idempotent webhook processing.
- **[MODIFY] uploads.service.ts**: Implement Cloudflare R2 presigned URL generation and file validation.
- **[NEW] audit/audit.service.ts**: Create a dedicated service to log all sensitive admin and system actions.

---

### 5. Management & Admin
- **[NEW] admin/admin.controller.ts**: Implement dashboard statistics and management endpoints for products, orders, and users.
- **[NEW] health/health.controller.ts**: Implement comprehensive health checks (DB, Storage, connectivity).

---

## Progress Tracking

### Phase 1: Backend Infrastructure (COMPLETED)
- [x] Refactor Prisma 7 configuration (adapter-pg)
- [x] Fix Database Seeding for production schema
- [x] Implement Refresh Token rotation & hashing
- [x] Setup Audit Logging service
- [x] Build transaction-safe Checkout logic
- [x] Integrate Cloudflare R2 Uploads
- [x] Implement Idempotent Payment Webhooks
- [x] Secure Supabase with RLS (Deny All Public)

## Verification Plan

### Automated Tests
- Run `npm run test` to verify unit tests for Auth and Orders.
- Run `npx prisma validate` to ensure schema integrity.

### Manual Verification
- **Auth Flow**: Register a new user, login, verify JWT, attempt to access admin routes with a customer token (should fail).
- **Checkout Flow**: Add products to cart, proceed to checkout, verify order creation and stock deduction in a single transaction.
- **Payment Flow**: Simulate Razorpay webhook call and verify order status update and idempotency.
- **Admin Dashboard**: Verify stats endpoint returns correct counts for orders and revenue.
- **Upload Flow**: Test image upload to R2 and verify public URL accessibility.
