# Worksplice — notes for coding agents

This repository is the full Worksplice public website. Clone it and work from the files; you do not need prior chat context.

**Canonical GitHub repo:** https://github.com/Kai-0501/worksplice

## Product

- Single-page credibility site for Singapore B2B outbound sales.
- Brand name: **Worksplice**.
- Founder display name in all UI copy: **Alfred** (`lib/site-config.ts` → `founder`).
- GitHub account remains `Kai-0501`. Do not put “Kai” in customer-facing copy.
- Contact: `lingkaiteng@gmail.com`, LinkedIn `https://www.linkedin.com/in/alfred-ling-5a9880200`.
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
| About / photo | `components/AboutAlfred.tsx`, `public/images/` |
| RFQ demo | `data/rfq-demo.ts`, `components/WorkflowDemo.tsx` |
| Example cards | `data/workflow-examples.ts` |
| Security headers | `lib/security-headers.ts` |

Do not add secrets. See `SECURITY.md`.
