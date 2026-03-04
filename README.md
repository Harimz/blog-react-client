# Blog Client (Frontend)

## Overview
This project is a feature-modular React + TypeScript frontend for a blog platform. The design emphasizes predictable data flow, strict client-side validation, and reusable UI primitives over ad-hoc page logic. It integrates with a Spring Boot backend through a shared HTTP/error layer and auth-aware fetch wrappers. The frontend intentionally keeps domain models, API clients, and UI composition separated to make changes localized and safer.

## Tech Stack
- Frontend: React 19, TypeScript, Vite, TanStack Router, Tailwind CSS v4, shadcn/ui (Radix)
- Data Fetching: TanStack Query + feature query keys + mutation invalidation
- Form & Validation: React Hook Form + Zod
- Rich Content: TipTap editor/renderer
- Deployment: Netlify

## Core Features
- Authentication UI flows (register, login, logout) with bootstrap refresh behavior
- Role-gated navigation and routes for authenticated users and admin users
- Post creation/edit/read with rich text content and cover image upload flow
- Category/tag administration with CRUD mutations and cache refresh
- Post listing with filtering, sorting, pagination, skeleton loading, and error boundaries
- Profile management (avatar update + user posts view)

## Architecture Overview
### API & Data Flow
- `domain/api/ui` split per module (`auth`, `posts`, `admin`, `profile`, `home`, etc.)
- UI calls hooks (`useQuery`/`useMutation`), hooks call feature API clients
- Shared HTTP primitives (`requestJson`, `throwIfNotOk`, `ApiError`) enforce consistent error handling
- `useApiFetch` centralizes auth header injection, credentials mode, and refresh retry path

### Routing & Composition Strategy
- File-based routes via TanStack Router
- Route guards wrap protected pages (`RequireAuth`, `RequireAdminAuth`) instead of duplicating checks in each screen
- Root shell composes cross-cutting providers once (Query client, auth context, global toasts, nav/footer)

### State & Caching Strategy
- Server state lives in TanStack Query; local component state is kept minimal and UI-scoped
- Query key factories per domain reduce accidental collisions and simplify invalidation logic
- Mutation success paths update/invalidate target caches instead of hard page reloads
- Tradeoff: invalidation is manual and can miss edge cases if key discipline slips
- Alternative: stronger normalized entity layer for automatic fan-out updates

### UI System Decisions
- shadcn/Radix primitives were chosen for accessibility baseline and composability
- Tailwind utility styling keeps component styles close to usage context
- Suspense + skeletons are used for perceived performance while data resolves
- Tradeoff: utility-heavy JSX can get dense
- Alternative: CSS modules or design-token component wrappers for stricter style boundaries

## Design Tradeoffs & Alternatives
- Chosen: feature-local DTO/types in each module
- Tradeoff: backend/frontend contracts can drift
- Alternative: generate types/clients from backend OpenAPI spec

- Chosen: context + hook based auth/session handling
- Tradeoff: auth transition logic is spread across provider and fetch hook
- Alternative: dedicated auth state machine for explicit state transitions

- Chosen: mixed optimistic cache update + invalidation strategy
- Tradeoff: behavior can differ by mutation path
- Alternative: standardize one mutation policy per resource type

## Future Improvements
- Standardize all API clients on shared `requestJson` helpers (remove direct `res.json()` variance)
- Add integration tests around refresh-token retries and guarded-route redirects
- Add route-level prefetch for high-traffic list/detail transitions
- Introduce shared design tokens and stricter component-level style contracts

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```bash
   VITE_API_URL=http://localhost:8080
   ```
3. Run locally:
   ```bash
   npm run dev
   ```
4. Build:
   ```bash
   npm run build
   ```
5. Test:
   ```bash
   npm run test
   ```
