# Feature Contract: v1.5.0 Documentation Alignment

**Contract ID:** LM-003
**Priority:** P1 — Docs pages reference v1.3.0 toolset; users following them will call removed tools and get incorrect responses
**Estimated Effort:** 1 day
**Dependencies:** None — all changes are in `src/content/documentation/`
**Reference:** `~/Projects/local-memory-golang/CHANGELOG_v1.5.0.md`, `RELEASE_NOTES_v1.5.0.md`

---

## Problem Statement

All four documentation content files (`gettingStarted.ts`, `mcpTools.ts`, `cliReference.ts`, `restApi.ts`) describe Local Memory v1.3.0. v1.5.0 is a major release with breaking changes: tool removals, response shape changes, new tools, and behavior that the docs actively contradict. A user following the current docs will:

- Call `store_memory`, which returns `-32601 Method Not Found`
- Call `remember` from the CLI, which no longer exists
- Pattern-match the `observe` string response, which is now JSON
- Expect the REST `observe` endpoint to return `{success, data, message}`, which is now flat
- Expect `reflect` to be session-scoped when called with `session_id`, which was silently broken until v1.5.0

The deprecation timeline in `mcpTools.ts` also claims `store_memory` is "hidden but still functional" — it is not. It was removed in v1.5.0.

---

## Design Goal

Documentation describes v1.5.0 exactly. Tool names, response shapes, parameter names, and behavioral claims match what the server actually does.

---

## Changes Required

### `src/content/documentation/gettingStarted.ts`

**Version string (line 6, 9):** `v1.3.0` → `v1.5.0`

**Tool count claim (line 372):** `"See MCP Tools Reference for all 16 tools"` → `"See MCP Tools Reference for all 23 tools"`

**`observe` response example:** Any code block showing the plain-string observe response must be replaced with the JSON shape:

```json
{
  "memory_id": "uuid",
  "level_label": "observation (L0)",
  "knowledge_type": "observation",
  "importance": 0.4,
  "tags": ["tag1"],
  "domain": "your-domain",
  "summary": "Stored as an observation...",
  "suggested_actions": [...]
}
```

**`reflect`/`evolve` response example:** Any example showing root-level fields must be updated to the wrapped shape:

```json
{
  "operation": "reflect",
  "result": { "observations_processed": 5, "learnings_created": 3, "dry_run": false },
  "summary": "Processed 5 observations...",
  "suggested_actions": [...]
}
```

**`remember` CLI reference:** Remove or replace with `observe`.

---

### `src/content/documentation/mcpTools.ts`

This file needs the most significant rewrite.

**Version string (line 9):** `v1.3.0` → `v1.5.0`

**Tool count (line 9):** `16 MCP (Model Context Protocol) tools` → `23 MCP tools`

**Tool categories section:** Replace the 4-category/16-tool listing with the v1.5.0 canonical 23-tool roster:

| Category | Tools |
|----------|-------|
| Core Memory | `update_memory`, `delete_memory`, `get_memory_by_id`, `observe` |
| Search & Retrieval | `search`, `ask`, `summarize` |
| Relationships | `find_related`, `discover`, `map_graph`, `relate` |
| Knowledge Evolution | `reflect`, `evolve`, `question`, `resolve` |
| Reasoning | `predict`, `explain`, `counterfactual`, `validate` |
| Session & Orientation | `bootstrap`, `status` |
| Temporal Analysis | `temporal` |
| Management | `migrate_domain` |

**`store_memory` deprecation table:** Remove the table row for `store_memory` entirely. It is not deprecated — it is **removed** (`-32601 Method Not Found`). Remove the entire deprecation footnote: `*Deprecation timeline: v1.3.0 hidden (current) -> v1.4.0 logged -> v2.0.0 removed*`.

**`observe` tool docs:** Update return value description from the plain string to the v1.5.0 JSON response shape. Document the `auto_promote`, `promoted_from_level`, `promoted_to_level` fields that appear when auto-promotion fires.

**`question` tool docs:** Update return value description from the plain string to the v1.5.0 JSON response shape with `question_id`, `question_type`, `priority`, `summary`, `suggested_actions`.

**`reflect` tool docs:**
- Add `dry_run` parameter (boolean, default false): previews without creating learnings
- Document idempotency: observations are marked promoted; calling twice on the same session is safe
- Document wrapped response: `{operation, result, summary, suggested_actions}` where `result` contains `observations_processed`, `learnings_created`, `unpromoted_count`, `dry_run`

**`validate` tool docs:**
- Document `confirm_auto_fix` parameter (boolean): required when `auto_fix=true, dry_run=false`
- Without it the call returns an error — not a destructive default

**`temporal` tool docs (new):** Add complete entry:
- Operations: `patterns`, `progression`, `gaps`, `timeline`
- Parameters: `operation`, `analysis_type`, `timeframe`, `concept`, `focus_areas`, `memory_ids`, `session_id`, `response_format`
- Description: "Analyze how knowledge evolves over time. Replaces the deprecated `analysis` tool for temporal queries."

**`status` tool docs:** Update response field names: `pending_questions` → `epistemic_gaps` + `contradictions`. Document `level_distribution` field (observation/learning/pattern/schema counts).

**`level_label` callout:** Add a section or callout noting that all v1.5.0 responses include `level_label` using canonical vocabulary: `"observation (L0)"`, `"learning (L1)"`, `"pattern (L2)"`, `"schema (L3)"`.

---

### `src/content/documentation/cliReference.ts`

**Version string (line 6, 9):** `v1.3.0` → `v1.5.0`

**`remember` command:** Remove from the command listing. It is gone in v1.5.0 (`HandleRemember` was deleted). Replace with a note in the `observe` entry: "The `remember` command (removed in v1.5.0) is replaced by `observe`."

**`reflect` command:** Add the `--dry_run` flag documentation:
```
local-memory reflect batch --dry_run
local-memory reflect single --observation_id <uuid> --dry_run
local-memory reflect auto --dry_run
```
Dry-run previews which observations would be promoted without modifying the database.

**`migrate_domain` command (new):** Add entry:
```
local-memory migrate_domain --from <old-domain> --to <new-domain> [--dry_run]
```
Batch-renames all memories from one domain to another. `--dry_run` previews the affected count.

**`predict`, `explain`, `counterfactual`, `reflect` commands:** Document that `--session_id` and `--response_format` flags are now available on these commands.

---

### `src/content/documentation/restApi.ts`

**Version string (line 6, 9):** `v1.3.0` → `v1.5.0`

**Endpoint count:** `comprehensive REST API` or any count reference → `51 documented endpoints` (dynamically catalogued via `GET /api/v1/`).

**`POST /api/v1/observe` response shape:** Remove the `{success, data, message}` envelope example. Replace with the flat KE response:

```json
{
  "memory_id": "uuid",
  "level_label": "observation (L0)",
  "knowledge_type": "observation",
  "importance": 0.4,
  "tags": [],
  "domain": "example",
  "summary": "...",
  "suggested_actions": [...]
}
```

**`GET /api/v1/<unknown-path>`:** Document that unknown paths now return `404` (not `200` with the catalogue). The catalogue is at `GET /api/v1/` exactly.

**`GET /api/v1/status` response:** Update `pending_questions` → `epistemic_gaps` and `contradictions`. Add `level_distribution`.

**`POST /api/v1/validate` with `auto_fix=true`:** Document `X-Confirm-Auto-Fix: true` header requirement. Without it the call returns an error.

**`POST /api/v1/reflect` response:** Update to wrapped shape `{operation, result, summary, suggested_actions}`. Document `dry_run` body parameter. Add `response_format` enum validation (invalid values return `400`).

**Memory `level` field:** Document that `level` is an integer (0–3) and `level_name` is the string label. Any example showing `"level": "L1"` must change to `"level": 1, "level_name": "learning"`.

---

## Acceptance Criteria

- [ ] All four documentation files reference `v1.5.0`
- [ ] `store_memory` does not appear anywhere as available or deprecated-but-functional
- [ ] `remember` CLI command does not appear as available
- [ ] `reflect --dry_run` is documented across MCP, REST, and CLI
- [ ] `validate` `confirm_auto_fix` requirement is documented
- [ ] `temporal` MCP tool has a full entry in mcpTools.ts
- [ ] `observe` and `question` response shapes are JSON, not strings
- [ ] `status` response uses `epistemic_gaps` and `contradictions`, not `pending_questions`
- [ ] REST `observe` response is flat (no `data` envelope)
- [ ] `migrate_domain` CLI command is documented
- [ ] `level` field is documented as integer with `level_name` string companion
