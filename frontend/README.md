# myNetwork - React frontend

React + TypeScript rewrite of the original SolidJS frontend. Same features,
same backend contract, same dev-server proxy - just React + Tailwind v4 +
shadcn-style UI components under the hood.

## Quick start (plug and play)

```bash
npm install
npm run dev
```

The dev server runs on `127.0.0.1:5173` and proxies `/api`, `/fs`,
`/metrics` and `/swagger` to `http://127.0.0.1:8840` (the Go backend),
exactly like the original app. Just start the backend and `npm run dev` -
no extra configuration needed.

```bash
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Architecture

- `src/services/ApiService.ts` - the **only** place in the app that talks
  to the backend. A single class with one clearly named method per
  endpoint (getAllHosts, editHost, deleteHost, wakeOnLan, scanPort,
  getHistory, getConfig, save*Config, ...). Everything else calls this
  service; nothing else calls `fetch` directly.
- `src/store/` - two small React Context providers:
  - `HostsContext` - fetches/polls the host list, and exposes it through a
    filter -> search -> sort pipeline, plus edit-mode/selection state.
  - `ConfigContext` - fetches the app configuration once and exposes it to
    every config form.
- `src/lib/hostSort.ts`, `hostFilter.ts`, `hostSearch.ts` - pure,
  side-effect-free functions, independently testable, each with a single
  responsibility.
- `src/components/ui/` - small shadcn-style primitives (Button, Input,
  Select, Table, Card, Switch, Toggle, Badge...) built on Radix UI +
  class-variance-authority + tailwind-merge.
- `src/components/{hosts,config,history,host-detail,layout}/` - one
  focused component per concern, mirroring the original component tree.
- `src/pages/` - route-level components wired up in `App.tsx` via
  `react-router-dom`.

## Notes on parity with the original

- The "Theme" field in Basic config is kept in the form (for backend
  compatibility - the API still stores a bootswatch theme name) even
  though this rewrite renders with Tailwind/shadcn rather than swapping
  Bootstrap stylesheets at runtime.
- "Color mode" still works: it toggles a `dark` class on `<html>` that
  Tailwind's dark: variant picks up.
- Config forms still submit as plain `FormData` (no JSON), matching the
  original API contract - `Select` and the config toggles are built on
  native `<select>`/`<input type="checkbox">` for that reason.
