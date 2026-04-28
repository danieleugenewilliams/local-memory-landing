# Feature Contract: v1.5.0 Site Copy and Demo Example Alignment

**Contract ID:** LM-004
**Priority:** P2 — Version numbers and tool counts are cosmetic; incorrect tool names in demos are embarrassing and erode trust
**Estimated Effort:** Half day
**Dependencies:** LM-003 (documentation) can proceed in parallel
**Reference:** `~/Projects/local-memory-golang/CHANGELOG_v1.5.0.md`, `RELEASE_NOTES_v1.5.0.md`

---

## Problem Statement

Version references across the site are frozen at v1.3.0 or v1.4.0. Tool count claims are inconsistent and wrong (8, 11, or 16 depending on which component you look at — v1.5.0 has 23). The `Features.tsx` page demo scenarios use nine MCP tool names that do not exist (`store_memory`, `search_memories`, `search_by_tags`, `get_related_memories`, `analyze_memories`, `search_by_date_range`, `discover_relationships`, `map_memory_graph`, `detect_knowledge_gaps`, `track_learning_progression`). These were never valid tool names. A developer reading the demo copy and trying to replicate it will immediately hit errors.

---

## Design Goal

Every version reference, tool count, and MCP tool name on the site matches the v1.5.0 release. Demo scenarios use real tool names an agent would actually call.

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
- Line 78 (StructuredData): `"8 unified MCP tools"` → `"23 MCP tools"`

**`README.md` (project root)**
- Line 9: `8 unified MCP tools with advanced AI capabilities` → `23 MCP tools with knowledge engineering capabilities`

---

### Demo Scenario Tool Name Corrections (`src/pages/Features.tsx`)

All occurrences below are in inline narrative strings inside JSX. Replace the `<code>` tool name and its description label to use real v1.5.0 tool names. The surrounding narrative copy can stay; only the tool name label and its parenthetical description need to change.

**Line 383 — Performance investigation scenario:**
- Remove: `store_memory` — *Performance baseline and investigation findings*
- Replace with: `observe` — *Records observation at L0 for later reflection*

**Line 394 — Performance breakthrough scenario:**
- Remove: `store_memory` + `create_relationship` — *Links breakthrough to previous investigation*
- Replace with: `observe` + `relate` — *Records breakthrough and links it to the prior investigation*

**Line 405 — Scale import scenario:**
- Remove: `track_learning_progression` + `analyze_memories` — *Applies months of accumulated performance knowledge*
- Replace with: `search` + `predict` — *Retrieves prior performance patterns and generates scale projection*

**Line 456 — Security audit search scenario:**
- Remove: `search_memories` + `search_by_tags` — *Semantic search for vulnerabilities + tag-based categorization*
- Replace with: `search` — *Semantic and tag-based search across the knowledge base*

**Line 464 — Security cross-reference scenario:**
- Remove: `get_related_memories` + `analyze_memories` — *Cross-references vulnerability patterns*
- Replace with: `find_related` + `predict` — *Traverses relationship graph and projects risk patterns*

**Line 475 — Temporal security pattern scenario:**
- Remove: `search_by_date_range` + `discover_relationships` + `map_memory_graph` — *Temporal filtering with relationship mapping*
- Replace with: `search` + `discover` + `map_graph` — *Date-filtered search with relationship discovery and graph traversal*

**Line 526 — CI/CD infrastructure search scenario:**
- Remove: `search_memories` + `search_by_tags` — *Searches across all domain knowledge*
- Replace with: `search` — *Semantic search with tag filtering across all domains*

**Line 534 — Cross-agent discovery scenario:**
- Remove: `get_related_memories` + `discover_relationships` — *Finds cross-agent implementations*
- Replace with: `find_related` + `discover` — *Graph traversal and latent relationship discovery*

**Line 545 — Cross-repo automation scenario:**
- Remove: `map_memory_graph` + `analyze_memories` — *Connects implementations across agents*
- Replace with: `map_graph` + `explain` — *Traverses relationship graph and traces the causal path*

**Line 596 — Learning progression scenario:**
- Remove: `detect_knowledge_gaps` + `track_learning_progression` — *Analyzes months of development memories*
- Replace with: `question` + `temporal` — *Records epistemic gaps and analyzes knowledge progression over time*

---

### Response Format Example (`src/pages/FeaturesNew.tsx`)

**Line 323** — The inline comment shows an outdated response format:
```
// Returns: { id: "mem_7f3a9b", level: "L1", weight: 1.0 }
```

Replace with v1.5.0 shape (`level` is integer, `level_label` is canonical string):
```
// Returns: { memory_id: "mem_7f3a9b", level: 1, level_label: "learning (L1)", importance: 1.0 }
```

---

### Response Format Example (`src/components/v2/DemoNew.tsx`)

**Line 71** — The demo example shows `weight: 7.2 → 1.0 (deprecated)`. This is fine as narrative copy but the label `(deprecated)` should be `(decayed)` to use the correct v1.5.0 terminology for the `evolve/decay` operation.

---

## Acceptance Criteria

- [ ] No `v1.3.0` version string appears anywhere in the site (search: `grep -r "1\.3\.0" src/ README.md`)
- [ ] `Features.tsx` contains no references to: `store_memory`, `search_memories`, `search_by_tags`, `get_related_memories`, `analyze_memories`, `search_by_date_range`, `discover_relationships`, `map_memory_graph`, `detect_knowledge_gaps`, `track_learning_progression`
- [ ] Tool count claims are consistent: 23 MCP tools, 51 REST endpoints
- [ ] `DynamicPageTitle.tsx` structured data reflects 23 tools
- [ ] `FeaturesNew.tsx` response format comment uses `memory_id` and integer `level`
