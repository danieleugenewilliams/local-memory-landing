# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React/TypeScript landing page for Local Memory, built with Vite and shadcn/ui components. The application includes Stripe payment integration for selling software downloads and features a comprehensive AI agent memory system.

## Development Commands

### Core Development
- `npm run dev` - Start Vite development server (frontend only, port 5173)
- `npm run build` - Build production frontend assets
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

### Backend Server
- `npm run dev:server` - Start Express backend server (port 3001)
- Backend handles Stripe payment processing and webhook endpoints

Note: The project has both frontend (Vite) and backend (Express) components that need to run simultaneously for full functionality.

## Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin
- **Routing**: React Router DOM with routes:
  - `/` - Landing page (Index)
  - `/payment` - Stripe payment page
  - `/success` - Post-payment success page with downloads
  - `/docs` - Documentation page
  - `*` - 404 Not Found page
- **UI Library**: shadcn/ui components built on Radix UI
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state

### Backend Architecture
- **Runtime**: Node.js with Express
- **Payment Processing**: Stripe integration with webhook support
- **API Endpoints**:
  - `POST /api/create-checkout-session` - Create Stripe checkout
  - `POST /api/webhook` - Handle Stripe webhooks
  - `GET /api/verify-payment/:sessionId` - Verify payment status

### Component Structure
- **UI Components**: Located in `src/components/ui/` (shadcn/ui components)
- **Page Components**: Located in `src/pages/`
- **Landing Page Sections**: 
  - `Hero.tsx` - Main hero section
  - `Features.tsx` - Feature highlights
  - `Demo.tsx` - Product demonstration
  - `ProblemSection.tsx` / `SolutionSection.tsx` - Problem/solution narrative
  - `BeforeAfter.tsx` - Before/after comparison
  - `CtaSection.tsx` - Call-to-action section
  - `Footer.tsx` - Site footer

### Payment Flow
1. User clicks CTA button → redirects to `/payment`
2. Payment page creates Stripe checkout session
3. Stripe processes payment → redirects to `/success`
4. Success page provides download links for executables

## Key Technologies

- **React 18** - Component framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Stripe** - Payment processing
- **Express** - Backend API server

## Environment Configuration

The project uses environment variables for Stripe configuration:
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (frontend)
- `VITE_STRIPE_PAYMENT_LINK` - Stripe payment link URL (frontend)
- `STRIPE_SECRET_KEY` - Stripe secret key (backend)
- `STRIPE_PRICE_ID` - Stripe price ID for the product
- `STRIPE_WEBHOOK_SECRET` - Webhook signature verification

## File Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── [sections]    # Landing page sections
├── pages/            # Route components
├── hooks/            # Custom React hooks
├── lib/              # Utilities (utils.ts)
└── main.tsx         # App entry point

public/
└── downloads/       # Software executables for download

server.ts            # Express backend server
```

## AI Agent Integration

The project includes extensive documentation for AI agent memory integration in `AGENTS.md`. The local-memory system allows AI agents to:
- Store and retrieve persistent memories across sessions
- Build cumulative knowledge and expertise
- Maintain context and continuity
- Develop specialized knowledge domains

Key memory integration patterns:
- Automatic memory storage of insights and learnings
- Semantic search for relevant past experiences
- Knowledge gap detection and expertise building
- Context-aware memory retrieval

## Payment Integration

Stripe is fully integrated with test and production modes:
- Test mode: Use test keys and card number `4242 4242 4242 4242`
- Webhook handling for `checkout.session.completed` events
- Download delivery through success page
- Payment verification endpoints available

## Development Notes

- Uses Lovable as the primary development platform
- ESLint configured with React hooks and TypeScript rules
- No test framework currently configured
- Server runs on port 3001, frontend on port 5173 (dev) or 8080 (production)
- All UI components follow shadcn/ui patterns and conventions
- TypeScript strict mode enabled with proper type definitions