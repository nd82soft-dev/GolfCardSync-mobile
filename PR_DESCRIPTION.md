# Add 9-hole support

This PR implements initial support for 9-hole rounds across the app:

- DB migration to add `hole_count` with default 18
- Backfill migration to set existing records to 18
- AI prompt updated for 9/18 hole extraction
- Frontend HoleSelector component to choose 9 vs 18 at upload
- Score utilities and unit tests
- GitHub Action to build & test PRs to enable preview pipelines

Migration & release checklist
- [ ] Run migrations in staging
- [ ] Backfill existing data (hole_count=18)
- [ ] Deploy backend changes and run tests
- [ ] Update frontend upload flow to include HoleSelector
- [ ] Deploy AI prompt/analysis config
- [ ] Monitor extraction confidence metrics after deploy
