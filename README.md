# vox-ui

Shared React UI for Vox: the Timeline (spans and collections), Pulse and Spaces features, plus the UI primitives they use. It has no Tauri, Android or iOS dependency. Hosts supply the platform through two ports and install them once at startup.

## Using it

Add the dependency:

```json
"@vox/ui": "github:vox-suite/vox-ui#main"
```

Install the platform before rendering:

```ts
import { installPlatform } from "@vox/ui";

installPlatform({ http, live });
```

- `http.request({ method, path, query, body, timeoutMs })` returns the parsed JSON body of a `/v1/...` call.
- `live.subscribe(handler)` delivers live events and returns an unsubscribe function.

Entry points: `@vox/ui` (Timeline, Collections, hooks, types, platform, `createBrowserPlatform`), `@vox/ui/pulse`, `@vox/ui/spaces`, `@vox/ui/ui/*`, `@vox/ui/logo`, `@vox/ui/utils`, `@vox/ui/theme.css`.

Tailwind v4 consumers must scan the package sources:

```css
@source "../node_modules/@vox/ui/src";
```

## Browser hosts (Android, iOS WebViews)

- Get a token from `POST /v1/auth/web-token` using the native session. It lives 15 minutes and only reaches the span, collection, schema, chart, space and live-socket routes, so ask the native layer for a fresh one before it expires.
- Send it as `Authorization: Bearer <token>` on every request.
- Open the live socket at `/v1/me/events/socket` with the subprotocols `["vox.v1", "bearer.<token>"]`. Browsers cannot set headers on a WebSocket, so the token travels in the subprotocol.
- The API must list the host origin in `VOX_CORS_ALLOWED_ORIGINS`. `https://appassets.androidplatform.net` is allowed by default.

## WebView bundle

`webview/` is a small standalone app that renders the Timeline, Pulse and Spaces screens for native hosts. It is built with relative asset paths, so a host can serve it from any base path.

- Routes are hash based: `#/timeline` (default), `#/pulse`, `#/spaces`. The native navigation loads the route it wants.
- The host exposes `window.VoxHost.getSession()`, returning a JSON string `{ "apiUrl", "token", "expiresAt" }`. The bundle calls it again when the token is near expiry or the API answers 401, so the host should return a fresh web token each time. If it cannot produce a session it should return `{ "error": "<message>" }`, which the bundle surfaces as the error text.
- In `npm run dev:webview` you can skip the host with `?apiUrl=<url>&token=<token>` on the URL.
- Layers: `#/pulse` and `#/spaces` show a small Pulse | Spaces switch at the top; the host does not need its own switcher.
- Fonts (Inter, Geist Mono, latin subset) are bundled, so the page works offline.
- The theme comes from `src/styles/theme.css`, also exported as `@vox/ui/theme.css` for other apps.

```bash
npm run build:webview
npm run package:webview
```

`package:webview` writes `release/vox-ui-webview-<version>.zip`. Pushing a `v*` tag publishes that zip as a GitHub release asset, which is what the mobile apps pin and embed.

## Generated files

`npm run gen` regenerates `src/features/api.gen.ts` from `../vox-core/contracts/openapi.json` and `src/features/pulse/schema-tokens.gen.json` from `../vox-shared`. It expects those repos checked out next to this one. Commit the results.

## Checks

```bash
npm run typecheck
npm run lint
```
