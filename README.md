# Orbit — refactoring assignment 01

A working device storefront built with Next.js App Router, React, TypeScript, and Redux. The interface is intentionally polished; the implementation is intentionally tangled. This is the **starting point** for a refactoring exercise, not an example of recommended architecture.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run typecheck` and `npm run build`, then `npm start`.

## What works

- Dashboard with independently simulated user and product APIs.
- Six smartphones and tablets with search, category filters, and price sorting.
- Product details with specifications, an independently simulated detail API, and support for direct URLs such as `/product/3`.
- A $1,050 USD demo wallet, a simulated buy API, and a pending state that prevents duplicate submissions. Affordable purchases show a success dialog; purchases above the balance show an insufficient-balance dialog. Both dialogs return to the dashboard. The demo balance stays fixed and is not deducted after purchases.
- Responsive layouts, loading states, an unknown-product state, and keyboard focus in the success dialog.

All APIs are local Promise/setTimeout simulations inside the page files. No backend, credentials, payment provider, or external product images are required. Purchases are fictitious. Redux state and orders reset on a full reload. Prices and specifications are demonstration data. Device illustrations use CSS. Google Fonts are optional; system fonts are the fallback.