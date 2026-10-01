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

Entry points: `@vox/ui` (Timeline, Collections, hooks, types, platform), `@vox/ui/pulse`, `@vox/ui/spaces`, `@vox/ui/ui/*`, `@vox/ui/logo`, `@vox/ui/utils`.

Tailwind v4 consumers must scan the package sources:

```css
@source "../node_modules/@vox/ui/src";
```

## Generated files

`npm run gen` regenerates `src/features/api.gen.ts` from `../vox-core/contracts/openapi.json` and `src/features/pulse/schema-tokens.gen.json` from `../vox-shared`. It expects those repos checked out next to this one. Commit the results.

## Checks

```bash
npm run typecheck
npm run lint
```
