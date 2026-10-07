# Worksplice — notes for coding agents

This repository is the full Worksplice public website. Clone it and work from the files; you do not need prior chat context.

**Canonical GitHub repo:** https://github.com/Kai-0501/worksplice

## Product

- Homepage plus a reusable buyer proof at `/demo/rfq-intake`.
- Brand name: **Worksplice**.
- Founder display name comes only from `lib/site-config.ts` → `founder`. Do not hardcode it in components.
- Bootstrapped Singapore startup, founded 2026 (`siteConfig.founded`). Do not claim customers, revenue, funding, or live AI integrations.
- GitHub account remains `Kai-0501`.
- Contact: `alfredling@worksplice.site`, LinkedIn `https://www.linkedin.com/in/alfred-ling-5a9880200`.
- No auth, database, AI APIs, forms, or environment variables.

## Stack

Next.js App Router (TypeScript), Tailwind CSS 4, React 19. Port **43180**.

## Run

```bash
node scripts/restore-lockfile.mjs   # rebuilds package-lock.json from .part files if needed
npm ci
npm run build                       # restores public/images/alfred.jpg from b64 parts
npm start
```

`next start` is the stable preview. Prefer it over `next dev` when checking styles or the RFQ demo.

## Where to edit

| Change | File |
| --- | --- |
| Name, email, LinkedIn, domain | `lib/site-config.ts` |
| About / photo | `components/AboutFounder.tsx`, `public/images/` |
| RFQ intake proof | `data/demo-001-rfq-intake.ts`, `components/demo/RfqIntakeDemo.tsx`, `app/demo/rfq-intake/page.tsx` |
| Homepage demo teaser | `components/WorkflowDemo.tsx` |
| Example cards | `data/workflow-examples.ts` |
| Security headers | `lib/security-headers.ts` |

Do not add secrets. See `SECURITY.md`.
