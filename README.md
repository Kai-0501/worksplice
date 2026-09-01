# Worksplice website

Canonical GitHub repository: [https://github.com/Kai-0501/worksplice](https://github.com/Kai-0501/worksplice)

Coding agents should start from [FOR_AGENTS.md](FOR_AGENTS.md).

Public website for **Worksplice**, a Singapore-based builder of small AI automations for repetitive B2B workflows. Alfred is the founder and the person clients work with directly.

This is a single-page, static-first Next.js site. It is meant to help outbound prospects check who Worksplice is, what the work looks like, and how to reply — not to run a customer portal or live AI.

## Local development

Requirements: Node.js 22 or later, npm.

```bash
node scripts/restore-lockfile.mjs
npm ci
npm run dev
```

If `package-lock.json` is already present, the restore script is a no-op. GitHub keeps the lockfile as `package-lock.json.part*` so clones stay under API size limits; the script concatenates them.

Open [http://localhost:43180](http://localhost:43180).

For a stable local preview that matches production (recommended):

```bash
npm run build
npm start
```

`next dev` is for editing. `next start` serves the production build and is what you should use if styles or the demo look flaky.

```bash
npm run lint
npm run typecheck
npm run build
npm start
npm run security
```

Use `npm ci` in CI and before production builds so the lockfile is respected.

## Production build

```bash
npm run build
```

The app is App Router + TypeScript. There is no database, no auth, and no environment variables required. Do not add `.env` files for V1.

## Vercel deployment

1. Import this GitHub repository in [Vercel](https://vercel.com), or run `npx vercel --yes`.
2. Framework preset: **Next.js**. Leave build settings at the defaults (`next build`).
3. Do not add environment variables for V1.
4. Assign the production domain and force HTTPS in the Vercel domain settings.
5. After the live URL is known, set `domain` in `lib/site-config.ts` to that `https://` origin.

Security headers, including CSP and HSTS, are set in `lib/security-headers.ts` via `next.config.ts`.

## Where to update contact details

Edit `lib/site-config.ts`:

- `email`
- `linkedin`
- `github`
- `domain` — canonical / Open Graph base URL
- `founder`, `location`, and short copy constants

External URLs must be `https`.

The founder display name is **Alfred**. Keep GitHub account URLs pointing at `Kai-0501` unless that username changes.

## Where to replace images

- Founder headshot: `public/images/alfred.jpg` (committed as `alfred.jpg.b64` for GitHub-friendly text; `npm run build` restores the JPEG if needed)
- Favicon: `app/icon.svg`
- Social share image: `app/opengraph-image.tsx`

## Where to edit workflow examples

- Example cards: `data/workflow-examples.ts`
- How-it-works steps: `data/how-it-works.ts`
- Principles: `data/principles.ts`
- RFQ demo enquiry, stages, and output fields: `data/rfq-demo.ts`

The RFQ demo is entirely simulated in the browser. It does not call an AI API.

## Analytics

Event names live in `lib/analytics.ts`. `track()` is a no-op until you wire a provider.

## Security

See [SECURITY.md](SECURITY.md).
