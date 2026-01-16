---
title: "What If Your Systems of Record Are Just a Tangled Web of Contradictory Data?"
date: "2026-01-16"
description: "Why the next trillion-dollar platforms won’t eliminate contradictions, they’ll resolve them."
slug: "systems-of-record-tangled-web-of-contradictory-data"
image: "/blog/images/hidden-contradictions.png"
---

## The Contradiction Problem

Ask your sales org for ARR, and you get one number. Ask finance, and you get another, with a different set of exclusions and adjustments. Ask accounting, and now you’re talking revenue recognition, not bookings. Ask legal, and they’ll correctly remind you that half the “ARR” in a fast-growing business is backed by contracts that look nothing like the neat recurring subscription you want it to be.

This is Jamin Ball’s observation in his recent Clouded Judgement piece, and it lands because everyone who’s spent time inside a large company knows exactly what he’s describing. The definition itself is slippery. For a consumption business, is ARR the annualized run rate from last month’s usage? Contracted commit? Contracted commit net of discounts and credits? A lagging twelve-month billing number dressed up to sound like a recurring metric?

Here’s the dirty secret nobody wants to admit: Enterprises spent billions on “single source of truth” platforms. What they actually built was multiple single sources of truth that disagree with each other.

---

**“A system that hides contradictions can accumulate knowledge, but cannot truly learn.”**

---

![Hidden Contradictions](/blog/images/hidden-contradictions.png)


## The Contradictions Are Intentional

Before you diagnose this as a failure, consider: the contradictions exist by design.

Sales needs a number that reflects pipeline momentum. Finance needs a number that survives an audit. Legal needs a number that matches contractual obligations. Product needs a number that tracks feature-level revenue attribution. These aren’t the same number, and they shouldn’t be.

The integration layer has always been a person. The support lead who checks customer tier in the CRM, sees open escalations in Zendesk, reads a Slack thread flagging churn risk, and synthesizes all of it in their head before deciding to escalate. That cross-system synthesis happens constantly, and it happens between their ears. No system captures it.

Different stakeholders need different lenses on the same underlying reality. The problem isn’t that contradictions exist. The problem is that the resolution logic, the reasoning that determines which truth applies in which context, was never treated as data.


## Why AI Makes It Visible

Agents can’t hold nuance in their “heads.”

When you tell an agent, “calculate ARR by segment and send a deck to the board,” it needs explicit answers to questions humans resolve implicitly: Which ARR? Which table is canonical? If sales and finance disagree, who wins? If the billing system and the warehouse have drifted by a few percent, which one does the agent treat as the truth?

This is where the “systems of record are dead” argument falls apart. The more you automate, the more important it becomes that someone has done the unglamorous work of deciding what the correct answer is and where it lives.

Foundation Capital’s Jaya Gupta and Ashu Garg put it sharply: “The reasoning connecting data to action was never treated as data in the first place.” When a renewal agent proposes a 20% discount despite a 10% policy cap, it pulls context from multiple systems, incident history from PagerDuty, escalation threads from Zendesk, precedent from a prior approval. Finance approves. The CRM records one fact: “20% discount.”

Everything that made that decision legible, the inputs, the policy evaluation, the exception route, the approval chain, disappears.



## The Goal Isn’t Elimination, It’s Resolution

Kirk Marple, from Graphlit, stated it perfectly: “Entity ontologies are largely solved by existing standards. The real unsolved work is temporal validity, decision traces, and fact resolution.”

The dichotomy isn’t prescribed ontologies versus learned ontologies. It’s adopt foundations, then learn what’s novel.

Schema.org already defines Person and Organization. Microsoft’s Common Data Model already defines Account, Contact, Lead, and Opportunity. Don’t spend months defining what an entity is. The work is in what existing standards don’t cover: facts that change over time, the ability to query historical state, and the logic that determines what’s canonical when sources conflict.

Resolution isn’t about declaring one number “right” and the others “wrong.” It’s about making the conditions explicit:

* A supersedes B: The new information invalidates the old
* Conditional truth: Both are correct under different circumstances
* Merged understanding: Synthesis produces a more nuanced view
* Context-dependent: True in different contexts (project, time, role)

The shift is from “which number is right” to “when is each number right, and how do we know.”



## Contradictions as Learning Signal

I’ve been building a cognitive memory system called Local Memory that treats contradictions as first-class citizens. Here’s what I’ve learned: contradictions aren’t bugs. They’re the primary signal for refinement.

A system that hides contradictions can accumulate knowledge, but cannot truly learn. When new information conflicts with existing knowledge, that dissonance creates a learning signal. Resolution produces one of three outcomes:


* The new information is incorrect
* The old belief was incorrect
* Both are true under different conditions

The third outcome is the most valuable, and the most common in enterprise contexts. “We prefer async communication” and “We prefer real-time collaboration” aren’t contradictory once you add conditions: async for deep work and status updates, sync for complex problem-solving and decisions.

Local Memory implements automated detection, surfacing, and resolution as [core operations](/docs#cli-reference-knowledge-evolution-commands). When contradictions are detected, they generate questions. When questions are resolved, the resolution type and rationale become part of the knowledge graph. The system doesn’t just store what it knows, it tracks how its understanding evolved and why.

This is what Piaget called accommodation: restructuring your mental model when reality contradicts your expectations. It’s also what enterprises need from their knowledge systems.



## What Enterprises Are Missing

Three capabilities are conspicuously absent from most enterprise data stacks:

Decision traces. The reasoning that connected data to action. Not “20% discount” but “20% discount because three SEV-1 incidents in the past quarter, an open escalation flagging churn risk, and precedent from a similar exception approved by VP last quarter.” The inputs, the policy evaluation, the exception route, the approval chain, captured as queryable data.

Temporal validity. Schema.org defines Person and Organization, but it doesn’t have native primitives for “this relationship was true from date X to date Y.” CDM models Account and Contact, but doesn’t track how those entities’ attributes evolved. What did the contract say when the decision was made? What was the customer’s ARR at renewal time? Agents need to reason about how things evolve, not just their current state.

Fact resolution. The hard AI problem: using LLMs to determine what’s canonical, what’s superseded, and how to synthesize timeline facts from scattered observations. When sources conflict, what’s the logic that resolves them? When that logic changes, how do you propagate the update?



## Where the Opportunity Lives

The opportunity isn’t better storage. It’s context graphs.

Foundation Capital defines a context graph as “a living record of decision traces stitched across entities and time so precedent becomes searchable.” Not the model’s chain-of-thought, but the organizational reasoning that explains not just what happened, but why it was allowed to happen.

The feedback loop is what makes this compound. Captured decision traces become searchable precedent. Every automated decision adds another trace to the graph. The more workflows you mediate, the more traces you capture. The more traces you capture, the better you get at automating the next edge case.

As Gupta and Garg put it: “The context graph will be the single most valuable asset for companies in the era of AI.”

The core question isn’t whether systems of record survive. They will. The question is whether the next trillion-dollar platforms are built by adding AI to existing data, or by capturing the decision traces that make data actionable.

## Who's Building It

The pattern emerging across the companies tackling this problem: sit in the execution path, capture what incumbents can’t.

Graphlit provides the operational context layer: identity resolution, entity extraction, relationship mapping, and temporal modeling across multimodal content. They’re extending into decision logging as agents execute workflows through their infrastructure.

Foundation Capital’s portfolio includes companies like PlayerZero, which starts with automation for production engineering and builds a context graph of how code, config, infrastructure, and customer behavior interact in reality. That graph becomes the source of truth for questions no existing system can answer.

[Local Memory](/features) approaches it from the cognitive architecture side: a knowledge system where [contradictions surface automatically](/docs#mcp-tools-knowledge-intake-tools), [resolution is tracked explicitly](/docs#mcp-tools-knowledge-evolution-tools), and [understanding evolves through validation](/docs#mcp-tools-reasoning-tools). The hypothesis: if you build the resolution mechanics right, the context graph emerges from use.

The incumbents, Salesforce, Workday, SAP, became trillion-dollar companies by owning canonical data. The next generation will be built by the companies that own the reasoning layer above it.

Your systems of record aren’t broken. They’re incomplete. The missing piece is the logic that resolves them.

---

Sources: Jamin Ball, “Long Live Systems of Record” (Clouded Judgement, Dec 2025); Jaya Gupta & Ashu Garg, “Context Graphs: AI’s Trillion-Dollar Opportunity” (Foundation Capital, Dec 2025); Kirk Marple, “Context Graphs: What the Ontology Debate Gets Wrong” (Graphlit, Dec 2025)