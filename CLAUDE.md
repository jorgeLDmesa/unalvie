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

<!-- TRIGGER.DEV basic START -->
# Trigger.dev Basic Tasks (v4)

**MUST use `@trigger.dev/sdk` (v4), NEVER `client.defineJob`**

## Basic Task

```ts
import { task } from "@trigger.dev/sdk";

export const processData = task({
  id: "process-data",
  retry: {
    maxAttempts: 10,
    factor: 1.8,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 30_000,
    randomize: false,
  },
  run: async (payload: { userId: string; data: any[] }) => {
    // Task logic - runs for long time, no timeouts
    console.log(`Processing ${payload.data.length} items for user ${payload.userId}`);
    return { processed: payload.data.length };
  },
});
```

## Schema Task (with validation)

```ts
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";

export const validatedTask = schemaTask({
  id: "validated-task",
  schema: z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
  }),
  run: async (payload) => {
    // Payload is automatically validated and typed
    return { message: `Hello ${payload.name}, age ${payload.age}` };
  },
});
```

## Scheduled Task

```ts
import { schedules } from "@trigger.dev/sdk";

const dailyReport = schedules.task({
  id: "daily-report",
  cron: "0 9 * * *", // Daily at 9:00 AM UTC
  // or with timezone: cron: { pattern: "0 9 * * *", timezone: "America/New_York" },
  run: async (payload) => {
    console.log("Scheduled run at:", payload.timestamp);
    console.log("Last run was:", payload.lastTimestamp);
    console.log("Next 5 runs:", payload.upcoming);

    // Generate daily report logic
    return { reportGenerated: true, date: payload.timestamp };
  },
});
```

## Triggering Tasks

### From Backend Code

```ts
import { tasks } from "@trigger.dev/sdk";
import type { processData } from "./trigger/tasks";

// Single trigger
const handle = await tasks.trigger<typeof processData>("process-data", {
  userId: "123",
  data: [{ id: 1 }, { id: 2 }],
});

// Batch trigger
const batchHandle = await tasks.batchTrigger<typeof processData>("process-data", [
  { payload: { userId: "123", data: [{ id: 1 }] } },
  { payload: { userId: "456", data: [{ id: 2 }] } },
]);
```

### From Inside Tasks (with Result handling)

```ts
export const parentTask = task({
  id: "parent-task",
  run: async (payload) => {
    // Trigger and continue
    const handle = await childTask.trigger({ data: "value" });

    // Trigger and wait - returns Result object, NOT task output
    const result = await childTask.triggerAndWait({ data: "value" });
    if (result.ok) {
      console.log("Task output:", result.output); // Actual task return value
    } else {
      console.error("Task failed:", result.error);
    }

    // Quick unwrap (throws on error)
    const output = await childTask.triggerAndWait({ data: "value" }).unwrap();

    // Batch trigger and wait
    const results = await childTask.batchTriggerAndWait([
      { payload: { data: "item1" } },
      { payload: { data: "item2" } },
    ]);

    for (const run of results) {
      if (run.ok) {
        console.log("Success:", run.output);
      } else {
        console.log("Failed:", run.error);
      }
    }
  },
});

export const childTask = task({
  id: "child-task",
  run: async (payload: { data: string }) => {
    return { processed: payload.data };
  },
});
```

> Never wrap triggerAndWait or batchTriggerAndWait calls in a Promise.all or Promise.allSettled as this is not supported in Trigger.dev tasks.

## Waits

```ts
import { task, wait } from "@trigger.dev/sdk";

export const taskWithWaits = task({
  id: "task-with-waits",
  run: async (payload) => {
    console.log("Starting task");

    // Wait for specific duration
    await wait.for({ seconds: 30 });
    await wait.for({ minutes: 5 });
    await wait.for({ hours: 1 });
    await wait.for({ days: 1 });

    // Wait until specific date
    await wait.until({ date: new Date("2024-12-25") });

    // Wait for token (from external system)
    await wait.forToken({
      token: "user-approval-token",
      timeoutInSeconds: 3600, // 1 hour timeout
    });

    console.log("All waits completed");
    return { status: "completed" };
  },
});
```

> Never wrap wait calls in a Promise.all or Promise.allSettled as this is not supported in Trigger.dev tasks.

## Key Points

- **Result vs Output**: `triggerAndWait()` returns a `Result` object with `ok`, `output`, `error` properties - NOT the direct task output
- **Type safety**: Use `import type` for task references when triggering from backend
- **Waits > 5 seconds**: Automatically checkpointed, don't count toward compute usage

## NEVER Use (v2 deprecated)

```ts
// BREAKS APPLICATION
client.defineJob({
  id: "job-id",
  run: async (payload, io) => {
    /* ... */
  },
});
```

Use v4 SDK (`@trigger.dev/sdk`), check `result.ok` before accessing `result.output`

<!-- TRIGGER.DEV basic END -->