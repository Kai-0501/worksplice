# Worksplice website security

This is a public, static marketing site. Keep the attack surface small.

## Rules

1. Never commit secrets, tokens, private keys, or `.env` files.
2. Never put secrets in `NEXT_PUBLIC_*` variables. Anything with that prefix is visible to every visitor.
3. Do not add API routes, server actions, or forms unless the product requires them.
4. Any endpoint that costs money or sends email must have abuse protection before it ships.
5. Do not store customer data in this repository or in Vercel for V1.
6. Review a dependency before adding it. Prefer no package over an unused package.
7. Before production: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run security`.
8. If a credential may have been exposed, rotate it immediately. Deleting it from git does not invalidate it.

## Current architecture

- Static Next.js App Router site, deployable on Vercel.
- No authentication, database, uploads, payments, or live AI.
- Contact is a `mailto:` link. The site does not send email.
- Analytics `track()` is a no-op until a provider is added.
- No environment variables are required.
- Vulnerability reports: `/.well-known/security.txt` → `lingkaiteng@gmail.com`.

## Checks

```bash
npm run security
```
