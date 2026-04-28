# Feature Contract: v1.5.0 Site Copy and Demo Example Alignment

**Contract ID:** LM-004
**Priority:** P1 — SEO/structured data shows v1.3.0 and 8 tools on every page; paid checkout page quotes wrong counts; routed pages reference removed tools
**Estimated Effort:** 1 day
**Dependencies:** LM-003 (documentation) can proceed in parallel
**Reference:** `~/Projects/local-memory-golang/CHANGELOG_v1.5.0.md`, `RELEASE_NOTES_v1.5.0.md`

---

## Problem Statement

Version references across the site are frozen at v1.3.0. Tool count claims are inconsistent and wrong (8, 11, or 16 depending on which component — v1.5.0 has 23). Several routed pages are not covered by LM-003 but contain hard-coded counts, tool names, and structured data that contradict v1.5.0.

**Routing note:** `src/App.tsx` routes only the "New" page variants. Legacy pages (`Index.tsx`, `Docs.tsx`, `Architecture.tsx`, `Prompts.tsx`, `Payment.tsx`, `Features.tsx`) are unrouted and not user-visible. This contract handles them with a comment marker, not content edits.

---

## Design Goal

Every version reference, tool count, MCP tool name, and structured-data claim on any routed page matches the v1.5.0 release. Unrouted legacy files are clearly marked as out of scope.

---

## Changes Required

### Version Numbers

**`README.md` (project root)**
- Line 2: `Version 1.3.0` → `Version 1.5.0`
- Line 6: `v1.3.0 Difference` → `v1.5.0 Difference`

**`src/pages/ArchitectureNew.tsx`**
- Line 76: `Local Memory v1.3.0` → `Local Memory v1.5.0`

**`src/components/PostPurchaseAgentSetup.tsx`**
- Lines 266, 485, 683, 842: `v1.0.4+ with enhanced installation scripts` → `v1.5.0`

---

### Tool Count Claims

The canonical v1.5.0 count is **23 MCP tools** and **51 REST endpoints**.

**`src/components/Features.tsx`**
- Line 154: `11 MCP tools for complete control` → `23 MCP tools for complete control`
- Line 158: `27 REST API endpoints for integration` → `51 REST API endpoints for integration`

**`src/components/DynamicPageTitle.tsx`**
- Line 18: `8 unified MCP tools` → `23 MCP tools`
- Line 23: `8 unified MCP tools` (second instance) → `23 MCP tools`

**`README.md` (project root)**
- Line 9: `8 unified MCP tools with advanced AI capabilities` → `23 MCP tools with knowledge engineering capabilities`

**`src/pages/PaymentNew.tsx`** *(paid checkout page — high impact)*
- Line 41: `"11 MCP tools, 27 REST API endpoints, CLI access..."` → `"23 MCP tools, 51 REST API endpoints, CLI access..."`
- Line 98: `<span>11 MCP tools + 27 REST endpoints + CLI</span>` → `<span>23 MCP tools + 51 REST endpoints + CLI</span>`

**`src/pages/PromptsNew.tsx`**
- Line 354: heading `16 MCP Tools` → `23 MCP Tools`

**`src/pages/FeaturesNew.tsx`**
- Line 304: `16 tools` → `23 tools`
- Line 337: `27 endpoints` → `51 endpoints`

**`src/pages/ArchitectureNew.tsx`**
- Line 452: `16 tools` → `23 tools`

---

### SEO and Structured Data

These affect search ranking and AI crawler indexing on every page load.

**`index.html`**
- Line 52: `"softwareVersion": "v1.3.0"` → `"softwareVersion": "v1.5.0"` in JSON-LD
- Line 65: `"8 unified MCP (Model Context Protocol) tools"` → `"23 MCP tools"` in featureList
- Lines 126–129: Rewrite the FAQ answer block. Current text references `store_memory`, `categories`, `domains`, `sessions`, `stats` as named tools — none of these are in the v1.5.0 23-tool roster. Replace the tool enumeration with the canonical v1.5.0 roster (matching LM-003's mcpTools.ts table).

**`src/components/StructuredData.tsx`**
- Line 78: `"8 unified MCP tools"` → `"23 MCP tools"` in product JSON-LD (rendered on every page)

---

### Canonical Tool Roster Rewrite

**`src/pages/PromptsNew.tsx` lines 209–213**

The `mcpTools` array currently lists 16 tools in 5 categories. It must be rewritten to the canonical v1.5.0 roster. Use the same 8-category table from LM-003:

```typescript
const mcpTools = [
  { category: "Core Memory",        count: 4, tools: ["observe", "update_memory", "delete_memory", "get_memory_by_id"] },
  { category: "Search & Retrieval", count: 3, tools: ["search", "ask", "summarize"] },
  { category: "Relationships",      count: 4, tools: ["find_related", "discover", "map_graph", "relate"] },
  { category: "Knowledge Evolution",count: 4, tools: ["reflect", "evolve", "question", "resolve"] },
  { category: "Reasoning",          count: 4, tools: ["predict", "explain", "counterfactual", "validate"] },
  { category: "Session & Orientation", count: 2, tools: ["bootstrap", "status"] },
  { category: "Temporal Analysis",  count: 1, tools: ["temporal"] },
  { category: "Management",         count: 1, tools: ["migrate_domain"] },
];
```

Total: 23 tools across 8 categories. Verify the surrounding rendering code handles `count` and `tools` — if it does today, this is a data-only change.

---

### Response Format Examples

**`src/pages/FeaturesNew.tsx`**

- Line 320: `level: "learning"` — `level` is now an integer; update to `level: 1, level_name: "learning"`
- Line 323: existing inline comment (already in LM-004 original):
  ```
  // Returns: { id: "mem_7f3a9b", level: "L1", weight: 1.0 }
  ```
  → replace with:
  ```
  // Returns: { memory_id: "mem_7f3a9b", level: 1, level_label: "learning (L1)", importance: 1.0 }
  ```

---

### Terminology Fix (`src/components/v2/DemoNew.tsx`)

**Line 71** — `weight: 7.2 → 1.0 (deprecated)` — the label `(deprecated)` should be `(decayed)` to use the correct v1.5.0 terminology for the `evolve/decay` operation.

---

### Legacy Page Markers

The following files are not reachable from any live route. Rather than editing stale content or deleting history, add a top-of-file comment to each marking it out of v1.5.0 scope:

```
// UNROUTED — not served by any active route; content reflects legacy API. Out of v1.5.0 scope.
```

Files:
- `src/pages/Index.tsx`
- `src/pages/Docs.tsx`
- `src/pages/Architecture.tsx`
- `src/pages/Prompts.tsx`
- `src/pages/Payment.tsx`
- `src/pages/Features.tsx`
- `src/components/Demo.tsx`
- `src/components/WhyLocalMemory.tsx`

---

### Blog Historical Banners

Two blog posts contain code examples that use removed or non-existent MCP tool names (`store_memory`, `search_memories`, `analyze_memories`, etc.). These are time-stamped artifacts — the correct approach is a one-line contextual note, not a rewrite.

Add the following line immediately after the frontmatter block (before the first paragraph) in each post:

```markdown
> **Note:** Tool names in this post reflect the API at time of writing. See the [v1.5.0 release post](/blog/local-memory-v150-knowledge-engineering-verified) for current names.
```

Files:
- `src/content/blog/the-day-your-ai-stops-forgetting.md`
- `src/content/blog/my-journey-to-building-local-memory-mcp.md`

Leave `local-memory-1.3-blog-post.md` and `local-memory-1.4-multi-provider-ai.md` untouched — they describe specific historical releases.

---

## Acceptance Criteria

- [ ] No `v1.3.0` version string in any routed component or SEO surface (`grep -r "1\.3\.0" src/ index.html README.md` — only legacy-marked and historical blog files may appear)
- [ ] Tool count claims are consistent: `23 MCP tools`, `51 REST endpoints` across all routed pages and structured data
- [ ] `index.html` JSON-LD shows `softwareVersion: v1.5.0` and 23 tools
- [ ] `StructuredData.tsx` product JSON-LD shows 23 tools
- [ ] `DynamicPageTitle.tsx` shows 23 tools on both instances (lines 18, 23)
- [ ] `PaymentNew.tsx` FAQ and feature list shows 23 MCP tools and 51 REST endpoints
- [ ] `PromptsNew.tsx` tool roster matches canonical 23-tool / 8-category v1.5.0 list
- [ ] `FeaturesNew.tsx` response format examples use `memory_id`, integer `level`, and `level_label`
- [ ] `DemoNew.tsx` uses `(decayed)` not `(deprecated)`
- [ ] All 8 unrouted legacy files have the `// UNROUTED` comment at the top
- [ ] `the-day-your-ai-stops-forgetting.md` and `my-journey-to-building-local-memory-mcp.md` open with the historical banner
- [ ] `local-memory-1.3-blog-post.md` and `local-memory-1.4-multi-provider-ai.md` are unchanged
