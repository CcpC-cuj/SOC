# SOC Release Runbook

This runbook defines the controlled rollout order for the SOC registration platform.

The goal is simple:

- ship trust, safety, and correctness fixes before polish
- verify each batch before moving forward
- keep rollback steps clear and lightweight

## Release Order

Ship in this exact order:

1. Batch A: Phase 1, 2, 3, 4
2. Batch B: Phase 5, 9
3. Batch C: Phase 6, 7
4. Batch D: Phase 8, 10
5. Batch E: Phase 11

Do not combine these batches unless the same version has already been validated in staging and the launch window is short enough that splitting is impossible.

## Preflight

Complete these checks before any production release:

1. Backend env values are present in `apps/server/.env`.
2. Frontend env values are present in `apps/client-user/.env`.
3. Production MongoDB backup exists from the same day.
4. Admin credentials are confirmed to work.
5. At least one showcase project and one real delivery project exist in staging.
6. Staging passes:
   - `cd apps/server && npm test`
   - `cd apps/client-user && npm test`
   - `cd apps/client-user && npm run lint`
   - `cd apps/client-user && npm run build`

## Batch A

Scope:

- Phase 1: admin settings safety
- Phase 2: dashboard data accuracy
- Phase 3: loading, error, and empty states
- Phase 4: sensitive data exposure lock-down

Why this batch goes first:

- it prevents accidental data loss
- it fixes misleading dashboard numbers
- it removes obvious trust and privacy risks

Verify after deploy:

1. Open admin dashboard.
2. Confirm registration settings load before the form enables.
3. Change `contactEmail`, save, and reload to confirm persistence.
4. Confirm participant dashboard counts match the admin task data.
5. Confirm a normal member cannot see teammate email or GitHub data.
6. Force one failed API call in staging and confirm visible error UI appears instead of a stuck loader.

Rollback if:

- admin settings cannot load or save
- dashboards show empty or contradictory counts
- protected member data becomes visible again

Rollback method:

- revert the release to the previous tagged build
- restore the last known-good frontend bundle and backend process
- do not restore database data unless settings were corrupted

## Batch B

Scope:

- Phase 5: freeze and version registration data
- Phase 9: workflow edge-case fixes for tasks and submissions

Why this batch goes second:

- it stabilizes the data admins review from
- it prevents contradictory project, task, and submission states

Verify after deploy:

1. Submit a participant profile in `pending_review` and confirm full edits still work.
2. Move that participant to `shortlisted` and confirm locked fields become request-only.
3. Assign the participant and confirm assignment-relevant fields no longer overwrite the reviewed profile directly.
4. In workspace, submit a milestone and confirm it locks while review is pending.
5. Reject the milestone from admin and confirm the project status does not get forced to `active`.
6. Resubmit after rejection and confirm history is preserved.
7. Confirm only the assigned member can change task progress.

Rollback if:

- admins lose access to participant change requests
- rejected submissions leave the project in a broken state
- members can no longer perform valid task updates

Rollback method:

- revert application code first
- keep database records unless a migration or destructive script ran

## Batch C

Scope:

- Phase 6: participant dashboard redesign
- Phase 7: admin ops console redesign

Why this batch goes third:

- once the workflow is trustworthy, the dashboards can safely become the main control surfaces

Verify after deploy:

1. Participant dashboard shows:
   - registration state
   - next action
   - assignment
   - notices
   - active tasks
2. Admin dashboard shows:
   - review queues
   - bottlenecks
   - team health
   - recent review activity
   - registration controls lower on the page
3. Confirm all primary CTA buttons navigate correctly.

Rollback if:

- dashboards become confusing enough to block normal operations
- critical metrics disappear from the top-level view

Rollback method:

- revert frontend deployment only if backend APIs remain compatible

## Batch D

Scope:

- Phase 8: scalable admin workflows
- Phase 10: UI system standardization

Why this batch goes fourth:

- it improves speed and consistency after correctness is already stable

Verify after deploy:

1. Participant admin list supports:
   - debounced search
   - pagination
   - modal-on-demand detail loading
2. Project admin list supports:
   - filters
   - pagination
   - create/edit/delete still working
3. Leaders page still supports:
   - project switching
   - team creation
   - leader assignment
4. Confirm the main pages share the same header rhythm, spacing, empty states, and toast style.

Rollback if:

- filtered admin lists stop loading
- assignment modal breaks
- major UI regression blocks common tasks

Rollback method:

- revert frontend first
- revert backend list API changes only if the previous frontend depends on old shapes

## Batch E

Scope:

- Phase 11: regression tests and workflow checks

Why this batch goes last:

- tests are the safety net for the now-stabilized behavior
- shipping them after the behavior settles reduces rewrite churn

Verify after deploy:

1. CI or local release runner passes:
   - `cd apps/server && npm test`
   - `cd apps/client-user && npm test`
2. Confirm smoke coverage still includes:
   - login
   - participant dashboard load
   - admin dashboard settings save
   - participant assignment flow
   - workspace access control

Rollback if:

- release automation breaks because the new tests are flaky or invalid

Rollback method:

- revert test harness changes only
- keep production app code deployed if app behavior is healthy

## Go / No-Go Checklist

Mark each batch complete only if all items below are true:

- staging deploy succeeded
- backend tests passed
- frontend tests passed
- frontend lint passed
- frontend build passed
- manual smoke checks for that batch passed
- at least one admin reviewer signs off

Do not continue to the next batch on a partial pass.

## Recommended Tags

Create one git tag or release marker per batch:

- `soc-batch-a`
- `soc-batch-b`
- `soc-batch-c`
- `soc-batch-d`
- `soc-batch-e`

This makes rollback much faster than trying to reconstruct the right commit under launch pressure.

## Launch Day Sequence

1. Run full backup.
2. Deploy Batch A and verify.
3. Deploy Batch B and verify.
4. Deploy Batch C and verify.
5. Deploy Batch D and verify.
6. Deploy Batch E and verify.
7. Open registration publicly only after Batch A and B are confirmed healthy.

## Minimum Manual Smoke Pack

Run this after every production push:

1. Participant registration works.
2. Participant login works.
3. Admin login works.
4. Admin can review a participant.
5. Admin can assign a participant to a real project and optional team.
6. Assigned participant can open workspace.
7. Leader can create a task.
8. Assignee can update task status.
9. Admin can review a task.
10. Leader can save and submit a milestone.
11. Admin can reject and approve a milestone.

## Ownership

Recommended sign-off split:

- Product or club lead: registration copy, project flow, public messaging
- Technical owner: backend tests, deploy health, rollback readiness
- Admin operations owner: participant review, assignment, dashboard checks

If any one of these sign-offs fails, stop the rollout.
