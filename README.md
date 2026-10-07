# Worksplice

**Live site:** [www.worksplice.site](https://www.worksplice.site) · **RFQ intake demo:** [www.worksplice.site/demo/rfq-intake](https://www.worksplice.site/demo/rfq-intake)

Worksplice builds small, practical automations for repetitive B2B sales and operations admin. It is a bootstrapped Singapore startup founded in 2026, run by its founder, who works with each business directly.

Coding agents should start from [FOR_AGENTS.md](FOR_AGENTS.md).

## Focus

Singapore B2B teams with repetitive sales and operations admin: RFQ intake, quotation prep, CRM updates and follow-ups. RFQ intake for suppliers is the first worked example. Worksplice picks one repetitive workflow, automates the routine part around the tools the team already uses, and keeps it only if it saves real time.

## RFQ workflow concept

1. An RFQ arrives by email.
2. Worksplice extracts the key fields (customer, part, quantity, material, finish, drawing, delivery, deadline) into an intake checklist.
3. Missing or ambiguous information is flagged, e.g. no required delivery date or no material-certification requirement.
4. A clarification email is drafted for the customer.
5. A person chooses **Approve**, **Edit** or **Discard**. Nothing is sent before that.

## Human-in-the-loop boundaries

- Pricing, commercial terms, engineering judgement and customer commitments stay with people.
- Nothing goes to a customer without explicit human approval.
- Worksplice does not write to the ERP; the ERP remains the system of record.

## Current status

- Early stage. No customers, revenue or outside funding to report yet.
- This repository is the public website. The RFQ demo at `/demo/rfq-intake` is a fictional, scripted preview that runs entirely in the browser. It does not call an AI model.
- Worksplice uses Claude and Claude Code in its own build workflow and is starting to use Claude Cowork for prospecting. Direct Claude integration for RFQ intake is on the roadmap, to be added once it is appropriate for a real pilot.

## Website

Static-first Next.js site: a homepage plus the reusable RFQ intake proof. It helps outbound prospects check who Worksplice is, what the work looks like, and how to reply. It is not a customer portal and does not run live AI.

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
npm test
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

The founder display name is set once in `siteConfig.founder`; components read it from there. Keep GitHub account URLs pointing at `Kai-0501` unless that username changes.

## Where to replace images

- Founder headshot: `public/images/alfred.jpg` (optionally committed as `alfred.jpg.b64` for GitHub-friendly text; `npm run build` restores the JPEG if needed). If no photo is present, the About section renders without one.
- Favicon: `app/icon.svg`
- Social share image: `app/opengraph-image.tsx`

## Where to edit workflow examples

- Example cards: `data/workflow-examples.ts`
- How-it-works steps: `data/how-it-works.ts`
- Principles: `data/principles.ts`
- RFQ intake proof copy: `data/demo-001-rfq-intake.ts`
- RFQ intake proof UI: `components/demo/RfqIntakeDemo.tsx`, route `app/demo/rfq-intake/page.tsx`

The RFQ intake demo is entirely simulated in the browser. It does not call an AI API.

Deterministic recording states:

- `/demo/rfq-intake`
- `/demo/rfq-intake?step=idle|checking|flags|draft|approved`
- `/demo/rfq-intake?play=1`
- `/demo/rfq-intake?demo=record&play=1`

Open [http://localhost:43180/demo/rfq-intake](http://localhost:43180/demo/rfq-intake) after `npm start`.

## Analytics

Event names live in `lib/analytics.ts`. `track()` is a no-op until you wire a provider.

## Security

See [SECURITY.md](SECURITY.md).
