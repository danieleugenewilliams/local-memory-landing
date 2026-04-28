---
title: "Local Memory v1.5.0: Knowledge Engineering, Verified"
date: "2026-04-28"
description: "Driven by a 227-probe audit, 20 feature contracts, and a decomposed verification pass: v1.5.0 makes Local Memory behave the way the architecture always claimed."
slug: "local-memory-v150-knowledge-engineering-verified"
---

Local Memory v1.5.0 closes a 227-probe audit of v1.4.4 by Merlin (5 critical findings, 8 notable) across 20 feature contracts. It changes enough about how the system responds to qualify as a major release with breaking changes. After this version, Local Memory behaves the way the architecture has always claimed: knowledge levels surface in every response, the intake pipeline is safe and idempotent, destructive paths require explicit confirmation, and MCP, REST, and CLI agree on what they return.

## Knowledge levels show up everywhere now

Every tool that returns memories now carries a `level_label` field using the canonical vocabulary: `"observation (L0)"`, `"learning (L1)"`, `"pattern (L2)"`, `"schema (L3)"`. Tools that return lists also include level distribution summaries. The most consistent audit complaint was that agents storing observations couldn't tell what the system had actually done with their input. Intake, retrieval, evolution, and orientation responses are now structured JSON with `summary` and `suggested_actions` fields tailored to the knowledge level.

For MCP users, the most visible change is that `observe` and `question` no longer return strings. They return JSON. Anything pattern-matching `"Observation recorded: ... - {uuid}"` needs to read `response.memory_id` instead.

## `reflect` is safe to call twice

Three bugs made `reflect` unreliable in practice. Calling it twice on the same observations created duplicate learnings, because there was no record of which observations had already been promoted. Calling it with `session_id` ignored the filter: the storage layer's `ListMemories` query discarded every option in `ListOpts`, so observations from every session were processed. And `dry_run=true` was accepted at the handler but never reached the service layer, which meant previewing silently created real learnings, ran Ollama, and synced to Qdrant.

All three are fixed. Observations now carry promotion links, so `reflect` is idempotent. `ListMemories` honors session, domain, level, weight, importance, and time bounds. Dry-run actually previews, and the result includes `dry_run: true` so callers can distinguish a preview from a real run. The flag works in `single`, `batch`, and `auto` modes across MCP, REST, and CLI.

## `validate` requires confirmation before it deletes anything

`validate(auto_fix=true, dry_run=false)` could remove relationships from the graph with no safeguard. A misconfigured agent or a default-argument call could quietly wipe data. The fix: `confirm_auto_fix=true` is now required, or the `X-Confirm-Auto-Fix: true` header for REST. Without it, the call returns an error.

## Session isolation actually isolates

`predict`, `explain`, `counterfactual`, and `bootstrap` accepted `session_id` but didn't propagate it to storage, returning results from every session in the database. The vector search path had the same bug in a different place: `session_and_shared` mode fell through to no filter. Both paths now correctly scope to the supplied session.

## Upgrade notes

This is a breaking release. The MCP `store_memory` tool is gone; use `observe`. The CLI `remember` command is gone; use `observe`. REST `POST /api/v1/observe` returns a flat object now, not the `{success, data, message}` envelope. The memory `level` field is an integer; `level_name` is the new string label. The full migration guide is in the v1.5.0 release notes, and the changelog covers each fix and feature contract in detail.

A note on the verification process that produced this release: a pre-release test cycle, run after the release notes were already drafted, surfaced 10 bugs that had walked past every prior pass. Six of them contradicted claims already in the notes. The architectural reason that final pass found what the others missed is the subject of [this week's CC4NC piece on attention and decomposition](https://claudecodefornoncoders.substack.com/p/attention-doesnt-scale-decomposition).
