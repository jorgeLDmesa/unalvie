# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application built with Supabase for authentication and data storage. It appears to be a project management system for "Gestor Proyectos VIE" (VIE Projects Manager) with sections for dashboard, researchers (investigadores), and projects (proyectos).

## Technology Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Database/Auth**: Supabase with SSR support
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives, Lucide React icons
- **Themes**: next-themes for dark/light mode
- **Charts**: Recharts for data visualization
- **Notifications**: Sonner for toast notifications
- **Date Handling**: date-fns and react-day-picker

## Common Commands

```bash
# Development
- `pnpm dev` — Start local development server
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint and code checks
```

## Architecture

### Routing Structure (App Router)
- `/` - Landing page
- `/auth/*` - Authentication pages (login, sign-up, forgot-password, etc.)
- `/(dashboard)/*` - Dashboard layout group containing:
  - `/dashboard` - Main dashboard with charts
  - `/investigadores` - Researchers management
  - `/proyectos` - Projects management

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components including shadcn/ui components
- `lib/supabase/` - Supabase client configurations (client, server, middleware)
- `middleware.ts` - Next.js middleware for route protection

### Authentication
- Uses Supabase Auth with cookie-based sessions
- SSR-compatible authentication across Client/Server Components
- Protected routes handled via middleware

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=[Supabase Project URL]
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=[Supabase Anon Key]
```

## Development Notes

- Uses TypeScript with strict mode enabled
- Path aliases: `@/*` maps to project root
- Tailwind configured with custom CSS variables for theming
- Component styling follows shadcn/ui patterns
- Uses Geist font as the primary typeface

# Design Principles
- Minimalist, modern, and functional design
- Aesthetic inspired by Vercel and Linear
- Primary font: Inter
- Neutral color palette with dark mode support
- Subtle shadows for depth, no visual overload
- Generous spacing and clear typography
- Elegant micro-interactions to enhance user experience
- No distracting animations or clutter