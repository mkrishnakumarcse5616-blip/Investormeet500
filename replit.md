# Investor Meet 500

## Run & Operate

- `pnpm --filter @workspace/investor-meet-500 run dev` — run the website
- `pnpm --filter @workspace/investor-meet-500 run typecheck` — check website types

## Stack

- pnpm workspace, React, Vite, TypeScript, Wouter
- Tailwind CSS and local project stylesheet

## Where things live

- `artifacts/investor-meet-500/src/App.tsx` — public page routes
- `artifacts/investor-meet-500/src/components/SiteShell.tsx` — shared navigation and footer
- `artifacts/investor-meet-500/src/pages/Pages.tsx` — public pages and browser-local forms
- `artifacts/investor-meet-500/src/data/content.ts` — event details, tracks, speakers, and schedule
- `artifacts/investor-meet-500/public/images/` — locally bundled photography

## Architecture decisions

- Participant and consultation forms save drafts in the visitor's browser; they are not sent to organizers.
- The public site does not use a database or claim that an application has been received.
- Event details must remain marked unannounced until the owner confirms them.

## Product

The site introduces Investor Meet 500 and its five investment tracks, guides startups, investors, and sponsors, and provides programme, venue, global-opportunity, women-entrepreneur, and consultation information.

## User preferences

- Use the supplied reference image and source photography as visual guidance.

## Gotchas

- Do not present the event date, venue, speakers, partner identities, or participation terms as confirmed unless the owner supplies confirmation.
- Keep the browser-only draft notice visible anywhere a form can be saved.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
