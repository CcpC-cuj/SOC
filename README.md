# SOC Registration Platform

This project is a full-stack Seasons of Code portal with:

- public showcase projects to attract participants
- a capability-focused registration form
- admin review status controls
- admin assignment of members into projects and teams
- workspace/task/submission flow after assignment

## Structure

- `apps/client-user`: React + Vite frontend
- `apps/server`: Express + MongoDB backend

## Setup

1. Copy environment files:
   - `apps/server/.env.example` -> `apps/server/.env`
   - `apps/client-user/.env.example` -> `apps/client-user/.env`
2. Install dependencies:
   - `cd apps/server && npm install`
   - `cd apps/client-user && npm install`
3. Seed admin:
   - `cd apps/server && npm run seed:admin`
4. Optional: seed showcase projects:
   - `cd apps/server && npm run seed:showcase`
5. Run both apps:
   - `cd apps/server && npm run dev`
   - `cd apps/client-user && npm run dev`

## Current Workflow

1. Participants register and submit skills, preferences, and motivation.
2. Admin reviews profiles in `Participants`.
3. Admin updates review status and later assigns a member into a real project and optional team.
4. Team/leader setup is managed in `Teams`.
5. Assigned members see their workspace, tasks, and final submission area.

## Notes

- Direct self-join is disabled by design.
- Showcase projects are public-facing and should not be used for assignment.
- Assignment-ready projects should be created with `isShowcase = false`.

## Release

- Controlled rollout plan: [`RELEASE_RUNBOOK.md`](./RELEASE_RUNBOOK.md)
