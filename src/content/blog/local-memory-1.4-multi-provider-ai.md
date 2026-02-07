---
title: "Local Memory 1.4: Multi-Provider AI and the End of Vendor Lock-In"
date: "2026-02-06"
description: "v1.4 introduces a split provider architecture — mix and match AI providers for embeddings and chat. Run Ollama locally for embeddings, Anthropic for reasoning, with automatic fallback. Your memory, your providers, your rules."
slug: "local-memory-1.4-multi-provider-ai"
---

*Published: February 6, 2026*

Since launching Local Memory, one piece of feedback has come up more than any other: "I love that it runs locally, but I want to use Claude for the reasoning parts."

Fair enough. Ollama is great for embeddings and solid for basic chat, but when you're asking an AI to trace causal chains through your knowledge graph or detect contradictions across hundreds of memories, model quality matters. People wanted the privacy of local embeddings with the reasoning power of frontier models.

v1.4.0 makes that possible. You can now mix and match AI providers — one for embeddings, another for chat — and add fallback chains for resilience. It's the most significant architectural change since the 1.3 knowledge hierarchy.

## The Split Provider Architecture

The core idea is simple: embeddings and chat are fundamentally different operations. Embeddings turn text into vectors. Chat reasons about text. There's no reason these have to use the same model, or even the same provider.

v1.4 introduces two new interfaces: `EmbeddingProvider` and `ChatProvider`. Each can be configured independently:

```yaml
ai_provider:
  embedding_provider: "ollama"      # Fast, free, private
  chat_provider: "anthropic"        # High quality reasoning
  chat_fallback: "ollama"           # Safety net
```

This configuration gives you:

- **Privacy**: Your embedding vectors are generated locally. Memory content never leaves your machine for embeddings.
- **Quality**: Claude handles the hard reasoning tasks — analysis, contradiction detection, causal tracing.
- **Cost**: You only pay for chat API calls, not embedding generation.
- **Resilience**: If Anthropic is down, chat automatically falls back to local Ollama.

Every provider includes a circuit breaker. If a provider starts failing, the circuit opens and routes to the fallback instead of hammering a broken endpoint.

## Many Providers, One System

v1.4 ships with five providers out of the box:

| Provider | Embeddings | Chat | Notes |
|----------|:----------:|:----:|-------|
| **Ollama** | Yes | Yes | Default. Local, free, private. |
| **OpenAI Compatible** | Yes | Yes | LM Studio, vLLM, LocalAI, text-generation-webui — anything with an OpenAI-shaped API. |
| **OpenAI** | Yes | Yes | GPT-4 Turbo, text-embedding-3-small. |
| **Anthropic** | — | Yes | Claude Sonnet 4, Claude Opus. Chat only. |
| **claude CLI** | — | Yes | Uses your installed `claude` CLI. No API key needed if it's already authenticated. |

The OpenAI Compatible provider deserves special mention. If your model server speaks the OpenAI API format, Local Memory can use it. This covers LM Studio, vLLM, LocalAI, Groq, Together AI, and dozens of others. One integration, broad compatibility.

Anthropic and the claude CLI are chat-only — they don't generate embeddings. When using either, pair them with Ollama or OpenAI Compatible for the embedding side.

## Configuration Examples

**Fully local with LM Studio:**

```yaml
ai_provider:
  embedding_provider: "openai-compatible"
  chat_provider: "openai-compatible"
  openai_compatible:
    enabled: true
    base_url: "http://localhost:1234/v1"
    embedding_model: "text-embedding-nomic-embed-text-v1.5"
    chat_model: "gemma-3-4b-it-qat"
```

**Local embeddings + claude CLI (no API key needed):**

```yaml
ai_provider:
  embedding_provider: "ollama"
  chat_provider: "claude-cli"
  claude_cli:
    enabled: true
```

**Full cloud with OpenAI:**

```yaml
ai_provider:
  embedding_provider: "openai"
  chat_provider: "openai"
  openai:
    enabled: true
    api_key: "sk-xxxxx"
    embedding_model: "text-embedding-3-small"
    chat_model: "gpt-4-turbo"
```

If you don't add an `ai_provider` section at all, everything defaults to Ollama — no breaking changes from v1.3.

## Agent Attribution

Here's something that's been bothering me: when you have memories from Claude Desktop, Claude Code, a REST API client, and maybe a custom agent, there's no way to know which agent stored what, or from which machine.

v1.4 fixes that. Every memory now tracks:

- **`agent_type`** — "claude-desktop", "claude-code", "api", or custom
- **`agent_hostname`** — which machine stored it
- **`agent_context`** — additional session context
- **`access_scope`** — "session", "global", or "private"

Agent type is auto-detected from session ID patterns and environment variables. Hostname is captured automatically. REST API clients can set these explicitly via headers (`X-Agent-Type`, `X-Agent-Hostname`).

This matters more than it sounds. When you're debugging why an agent stored something unexpected, or when you want to filter memories by source, attribution gives you the visibility you need.

## Domain Detection from Agent Config Files

One of the friction points with Local Memory has been remembering to set the domain for each project. You'd start a session, forget to specify the domain, and end up with memories dumped into "general-knowledge" that should have been filed under "my-project."

v1.4 introduces a domain cascade that reads from your agent config files automatically. Add a comment to your `CLAUDE.md`, `AGENTS.md`, or `GEMINI.md`:

```markdown
<!-- domain: my-project -->
```

Or use a markdown header:

```markdown
## Domain: my-project
```

Local Memory will pick it up and use it as the default domain for that session. The cascade is: explicit domain in the tool call > agent config file > config default. No more orphaned memories.

We also added MCP Prompts Protocol support (`prompts/list` and `prompts/get`), so agents can discover available domains and learn how domain selection works through the protocol itself.

## Security Fixes

This release includes several security improvements that are worth calling out explicitly:

**API Key Redaction (Critical)** — The config API now redacts all sensitive fields in responses. Previously, API keys could be exposed via `/api/v1/config` endpoints. Pattern-based detection catches API keys, secrets, tokens, and passwords.

**SSRF Protection** — URL validation for `base_url` fields blocks Server-Side Request Forgery attacks against cloud metadata services and link-local addresses.

**Command Injection Prevention** — The claude CLI provider passes prompts via stdin instead of command-line arguments, closing a potential injection vector.

**Secure File Permissions** — Config files are created with `0600` (owner read/write only). Directories get `0700`.

**Debug Log Sanitization** — Removed logging of full request/response bodies in debug mode. Replaced with safe metadata.

## Bug Fixes

Two bugs that affected real users:

- **ResponseFormat validation** — Searches using the default `intelligent` format would fail with "invalid response_format." Fixed.
- **Enhanced text search SQL error** — A CTE table alias bug broke the enhanced scoring algorithm. Fixed.

## Upgrading

v1.4 is backwards compatible with v1.3.x. No breaking changes, no required migration steps. The database automatically adds the new `agent_hostname` column on first run.

```bash
npm update -g local-memory-mcp
local-memory --version  # Should show v1.4.0
```

If you want to configure a new provider, add the `ai_provider` section to `~/.local-memory/config.yaml`. Or use the desktop app's new settings tab.

My recommended starting point:

```yaml
ai_provider:
  embedding_provider: "ollama"
  chat_provider: "anthropic"
  chat_fallback: "ollama"
  anthropic:
    enabled: true
    api_key: "sk-ant-xxxxx"
    model: "claude-sonnet-4-20250514"
```

## What's Next

A desktop app to visually search, view, edit, and manage your local memory. You will be able to edit your settings for things like the **AI Providers** with dropdown selectors for embedding and chat providers, API key inputs, and recommended configuration presets. Configuration changes are applied through the REST API, no config file editing required.

Provider health monitoring in the desktop app is coming — real-time status for each configured provider, latency tracking, and circuit breaker visibility.

Beyond that, the multi-provider architecture opens the door to things like routing different reasoning tasks to different models (lightweight model for categorization, frontier model for causal analysis), and provider-level cost tracking.

The goal remains the same: long-term memory infrastructure for AI agents. v1.4.0 makes that infrastructure work with whatever AI providers you choose.

## Thank You

Thanks to everyone who asked for multi-provider support, agent attribution, and other features. The feedback shaped the design. Questions or issues? Reach out on the Local Memory [Discord](https://discord.gg/rMmn8xP3fZ).

---

*Local Memory — Long-term memory infrastructure for AI agents.*
Private, persistent memory where knowledge evolves from observations to insights. Ships as a single binary. Works with Claude, GPT, Ollama, and any OpenAI-compatible platform.
