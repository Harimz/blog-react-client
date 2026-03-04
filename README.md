# Blog Client (Frontend)

## Overview
This project is a TypeScript React frontend for a blog platform backed by a Spring Boot monolith. The client is organized by feature modules (`auth`, `posts`, `admin`, `profile`, `home`) with clear `domain/api/ui` boundaries to keep state, transport, and presentation concerns separated. Routing is file-based with route guards for authenticated and admin-only areas. Data reads/writes are handled through TanStack Query with shared API/error primitives to standardize backend integration.

## Tech Stack
- Frontend: React 19, TypeScript, Vite, TanStack Router, Tailwind CSS v4, shadcn/ui (Radix)
- Data Fetching: TanStack Query + custom `useApiFetch` wrapper + centralized `requestJson` / `ApiError`
- Database: N/A in frontend (owned by Spring Boot backend)
- Auth & Payments:
  - Auth: JWT access token + refresh flow via HTTP-only cookies, role checks (`ADMIN`) in guarded routes
  - Payments: N/A for this project
- Deployment: Netlify (`@netlify/vite-plugin-tanstack-start`, `netlify.toml`)

## Core Features
- Auth: register/login/logout, token refresh bootstrap, protected routes, admin-only route protection
- Posts: create/edit/view posts, rich text editing with TipTap, status selection (`DRAFT`/`PUBLISHED`)
- Taxonomy: category/tag management in admin UI, mutation flows with cache invalidation
- Discovery: paginated + sortable post listing, category filters, post detail pages
- Profile: user profile view, avatar updates, "my posts" management
- Uploads: presigned upload flow for post cover images (backend-issued presign + direct object-storage upload)

## Architecture Overview
### API & Data Flow
- UI components call feature hooks (`useQuery`/`useMutation`) instead of calling `fetch` directly.
- API clients are split per feature module and composed around shared HTTP utilities.
- `useApiFetch` injects auth headers, retries once on 401/403 after refresh, and normalizes credential handling.
- `requestJson` + `throwIfNotOk` enforce a single error contract (`ApiError`) across modules.

### Server vs Client Components
- This app is client-driven React with TanStack Start tooling; no React Server Components architecture is used.
- Decision: keep all interactive UI logic in client modules for faster iteration and simpler local debugging.
- Tradeoff: first-load bundle is larger than a server-component approach; SEO/TTFB optimization requires additional SSR-focused work.
- Alternative: Next.js App Router + RSC for selective server rendering and smaller client payloads.

### Caching Strategy
- TanStack Query is the source of truth for remote state.
- Query keys are defined per feature (`postKeys`, `categoryKeys`, `tagKeys`) to keep invalidation scoped.
- Mutations invalidate list queries or patch detail cache where appropriate.
- Default query policy: retries enabled, `refetchOnWindowFocus: false`, and short `staleTime` to reduce noisy refetching.
- Tradeoff: manual invalidation discipline is required; stale views are possible if keys/invalidation are missed.
- Alternative: stricter normalization layer (e.g., RTK Query entity adapters) at the cost of extra complexity.

## Checkout & Order Processing
Not applicable in this project. There is no Stripe integration, checkout flow, or webhook processing.

If payments were added:
- Frontend would create checkout sessions through backend endpoints only.
- Webhook signature verification and order fulfillment would stay server-side in Spring Boot.
- Client would poll/subscribe for payment status instead of trusting redirect query params.

## Database Design
Database schema is managed by the Spring Boot backend, not this frontend repository.

Frontend data modeling decisions:
- Strong TypeScript contracts per feature (`domain/types.ts`) to mirror backend DTOs.
- Form schemas with Zod colocated in domain modules (`create-post-schema`, `login-schema`, etc.).
- Decision: keep transport DTO types close to features for maintainability.
- Tradeoff: duplicated contracts between frontend and backend can drift.
- Alternative: generate types from OpenAPI to reduce drift and manual maintenance.

## Tradeoffs & Future Improvements
- Current auth state is context-based and request-scoped in hooks; could move to a dedicated auth state machine for clearer edge-case handling.
- Some API clients parse JSON directly while others use shared `requestJson`; standardizing all clients would reduce inconsistency.
- Add route-level prefetch and optimistic updates for better perceived latency on heavy mutation pages.
- Add stronger test coverage for auth-refresh and guarded-route flows (currently infra supports Vitest but behavior tests are limited).
- Introduce OpenAPI-based type generation and client stubs to reduce contract drift with the Spring backend.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   ```bash
   VITE_API_URL=http://localhost:8080
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm run test
   ```
