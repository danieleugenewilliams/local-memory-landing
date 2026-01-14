---
title: "The MCP Backlash Is Missing the Point: Why Structured Operations Beat Code Execution"
date: "2025-11-20"
description: "We've been here before: SOAP, REST, and why abandoning structured APIs is always the wrong lesson"
slug: "the-mcp-backlash-is-missing-the-point"
image: "/blog/images/mcp-backlash-tools-vs-code.png"
---

A good portion of the AI community has seemingly turned against MCP tools. "Too much token overhead," they say. "LLMs are better at writing code than calling tools directly."

They're half right. Many MCP servers are poorly designed—bloated with excessive tool definitions that waste context. But the proposed solution—have AI generate execution code on-the-fly instead of using structured operations—solves the wrong problem.

Here's what building production memory systems with MCP, REST, CLI, and JSON-RPC taught me:

**1. Syntactic fluency doesn't equal semantic correctness.**

Yes, LLMs can write TypeScript. They can also write off-by-one errors, race conditions, and performance anti-patterns. Writing valid code doesn't mean choosing the right search algorithm, managing state correctly, or making performance-aware decisions.

**2. Code execution trades token overhead for reliability risk.**

Skipping intermediate results saves tokens in the moment. But generating fresh execution logic each time means the AI must re-derive domain expertise from scratch, leading to inconsistent behavior across identical queries.

**3. The right abstraction depends on your domain.**

Stateless data fetching? Code execution works fine. Complex operations with state, performance requirements, and semantic guarantees? You need structured operations with validated parameters.

**In short: The debate isn't "tools vs code execution." It's "what abstraction level does your domain require?"**

---

## Understanding the Current Debate

The conversation around MCP (Model Context Protocol) has shifted dramatically in recent months. What started as excitement about a standardized way to connect AI agents to external tools has evolved into active criticism.

### Anthropic's Position

Anthropic recently published guidance suggesting that MCP servers should be minimal, with AI agents writing execution code rather than relying on extensive tool definitions. Their reasoning is sound for certain use cases:

- **Progressive disclosure**: Load tool details only when needed, not upfront
- **Token efficiency**: Avoid bloating context with unused tool definitions
- **Leverage training data**: LLMs have seen more real-world code than tool-call examples
- **Composability**: Code allows chaining operations without round-trips through context

Their filesystem example is compelling. Reading a directory, filtering files, and processing content—these are straightforward operations where AI-generated code works well.

### The Cloudflare Amplification

Cloudflare took this further with their "Code Mode" announcement, arguing that "we've all been using MCP wrong." They convert MCP tools into TypeScript APIs and have the LLM write code that calls those APIs directly.

Their case is persuasive:

- LLMs have "enormous amounts of real-world TypeScript" in training data
- Tool calls use "special tokens" that LLMs "aren't always that good at"
- Code execution eliminates intermediate results passing through context
- Their isolate-based sandbox makes code execution fast and cheap

### The Broader Backlash

This has sparked wider criticism:

- "MCP is trash"
- "MCP is what you get when Python coders build your API"
- "Skills > Tool Calling"
- Token overhead cited as fundamental flaw

The consensus forming: structured tools are the problem, code execution is the solution.

They're solving real problems. But they're also wrong about the generalization.

---

## Where Anthropic Is Right

Before explaining where the code execution advocates go wrong, it's important to acknowledge where they're absolutely correct.

### MCP Servers Are Often Poorly Designed

The token overhead problem is real. GitHub's official MCP server famously consumes tens of thousands of tokens just loading tool definitions. Add a few more servers and there's barely room left for actual work.

This isn't MCP's fault. It's bad abstraction design. Dumping raw API endpoints directly into tool definitions, with no thought to how agents will actually use them, creates exactly the bloat everyone complains about.

### Not Every Domain Needs Complex Tools

Anthropic's filesystem example is legitimate. Operations like:

- Reading directory contents
- Filtering by file extension
- Reading file contents
- Basic string manipulation

These are simple, stateless, and well-understood. An LLM writing Python or TypeScript to handle these is perfectly reasonable. The operations are obvious, failures are local, and the code is easy to validate.

### Focused Capability Per Server

The guidance to keep MCP servers focused on a single domain is correct. A server shouldn't try to be a Swiss Army knife. Each server should provide a coherent set of related capabilities.

This principle isn't in dispute.

### Token Efficiency Matters

Context windows are expensive. Every token loaded upfront is a token unavailable for actual reasoning and output. The progressive disclosure approach—loading details only when needed—makes sense.

### LLMs Are Getting Better at Code

It's true: modern LLMs write increasingly competent code. They understand common patterns, leverage libraries effectively, and handle many programming tasks well.

For simple, well-defined operations, letting the LLM write execution code can work.

### Where This Breaks Down

The problem isn't the observations. It's the conclusion.

Just because code execution works for filesystems and data fetching doesn't mean it works for all domains. Just because some MCP servers are poorly designed doesn't mean structured operations are wrong.

The advocates are generalizing from success in simple, stateless domains to claim code execution is universally superior.

That's where they lose the plot.

---

## What Building Production Systems Teaches

Here's what changes when you move from prototypes to production, from filesystems to complex domains, from demos to systems that hundreds of users depend on daily.

### Operations Aren't Just Data Access

The code execution advocates frame this as: "MCP provides data, AI writes code to process it."

But many domains require operations, not just data. Operations that embody:

- Domain expertise about trade-offs
- Performance characteristics that matter
- State management semantics
- Validated parameter combinations
- Token budget awareness

Consider memory operations. It's not "return raw data, let AI process it." It's:

- Which search algorithm for this query type?
- How should semantic and keyword search be weighted?
- What token budget should constrain the response format?
- How does session isolation affect result filtering?
- How do relationships propagate across memory graphs?

These aren't "data access" decisions. They're domain operations where choices compound.

### Syntactic Fluency ≠ Semantic Correctness

Yes, LLMs can write TypeScript. They've seen lots of it.

They've also seen lots of:

- Off-by-one errors
- Race conditions
- Performance anti-patterns
- Incorrect algorithm choices
- State management bugs

Appearing frequently in training data doesn't mean the LLM learned to implement it correctly in production contexts.

An LLM writing syntactically valid code doesn't mean it:

- Understands domain trade-offs
- Chooses optimal algorithms for the use case
- Manages state correctly across operations
- Handles edge cases reliably
- Makes performance-aware decisions

This requires domain expertise encoded in operations, not recreated from scratch each query.

### The Transport Protocol Is Secondary

Building memory systems exposed through multiple interfaces—MCP, REST, CLI, JSON-RPC—reveals something fundamental: the operations matter far more than the transport.

Whether an AI agent calls via MCP stdio, a developer hits a REST endpoint, or a bash script invokes a CLI command, the underlying requirements are identical:

- Predictable performance characteristics
- Token-aware response formatting
- Consistent state management semantics
- Validated parameter combinations
- Quantifiable reliability guarantees

The debate frames this as "MCP vs code execution." But that's a transport question masquerading as an architecture question.

**The real question: What operational semantics does your domain require?**

### Performance Requirements Are Real

Code execution advocates optimize for cold start time and token overhead. Those matter.

But production systems also need:

- Consistent query performance under load
- Predictable memory consumption
- Bounded execution time
- Reliable state management
- Scalable operations

AI-generated code can't guarantee these. Each execution is a fresh synthesis, with variable performance characteristics.

Structured operations can be tested, benchmarked, and guaranteed. You know exactly what performance you're getting.

### Token Optimization Isn't Just About Skipping Results

Cloudflare argues that code execution saves tokens by avoiding intermediate results passing through context.

But the real token waste in code execution is the code itself:

- Implementing similar logic slightly differently each time
- Verbose error handling
- Defensive checks
- Explanatory comments
- Validation logic

Structured operations use tokens once to define the interface. Code execution uses tokens every single time to regenerate similar logic.

For complex domains, well-designed parameterized operations often use fewer total tokens than repeatedly generating execution code.

### State Compounds Across Operations

The filesystem examples are stateless. Read a file, process it, done.

But many domains require:

- State that persists across operations
- Context from previous queries informing current ones
- Relationships discovered incrementally
- Learning from patterns over time

When state matters, code execution becomes problematic:

- Each execution starts fresh
- State must be serialized, passed, deserialized
- No opportunity to optimize based on history
- Errors compound across operations

Structured operations can maintain state efficiently, build on previous work, and optimize based on usage patterns.

### Reliability Isn't Optional

In demos and prototypes, you can tolerate inconsistency. "Sometimes the AI writes suboptimal code" is acceptable when you're experimenting.

In production systems where users depend on consistent behavior, "sometimes the AI makes different choices" becomes "the system is unreliable."

When a user runs the same query twice, they expect the same operational behavior. Not "the AI wrote slightly different code this time."

### This Is a Domain Question, Not a Protocol Question

The code execution advocates assume all domains are like filesystems: simple, stateless, with obvious operations.

But domains vary:

- Simple vs complex trade-offs
- Stateless vs stateful operations
- Obvious vs subtle failure modes
- Low vs high performance requirements
- Fresh context vs accumulated knowledge

The right abstraction depends on these characteristics, not on training data volume or token overhead.

---

## We've Seen This Before: The Web Services Backlash

The current MCP backlash is remarkably familiar to anyone who lived through the early web services era.

### The SOAP Era

In the early 2000s, SOAP and WSDL were criticized as bloated, over-engineered, and impractical. Developers complained about:

- Excessive XML verbosity
- Complex schema definitions
- Heavy tooling requirements
- Bandwidth overhead
- Steep learning curves

The complaints were valid. SOAP was bloated.

### The Backlash Response

Many developers insisted on bypassing structured APIs entirely: "Just write custom HTTP clients. Parse HTML. Screen-scrape if you need to. It's more flexible. Why do we need all this structure?"

They were right that SOAP was bloated.

They were wrong that the answer was abandoning structured interfaces.

### What Actually Happened

The industry didn't abandon structured APIs. It refined them.

**SOAP → REST and JSON-RPC**

Each iteration learned from the previous:

- Simpler formats (XML → JSON)
- Lighter protocols (SOAP envelope → HTTP verbs → REST)
- Better abstractions (WSDL complexity → OpenAPI simplicity → cleaner specs)
- Reduced overhead while maintaining structure

The principle remained constant: structured interfaces with clear contracts beat ad-hoc code generation.

The implementations improved dramatically.

### We're Watching This Play Out Again

The complaints about MCP today mirror the SOAP backlash exactly:

- "Too much overhead in tool definitions"
- "Just let the AI write code directly"
- "Why do we need all this structure?"
- "It's too complex for what it does"

And the proposed solution is identical: bypass the protocol, write custom code each time.

History suggests this is the wrong lesson.

The problem isn't structured interfaces. The problem is that we're still learning how to design good ones for AI systems.

### What We're Learning

Just as REST learned from SOAP's mistakes:

- Lighter weight (REST instead of SOAP)
- Better abstractions (parameterized operations vs raw API dumps)
- Domain-specific patterns (memory, data, and compute have different needs)
- Progressive disclosure of tool details (load summaries upfront, full definitions on-demand)

MCP and similar protocols will evolve. New patterns will emerge. Better abstractions will be discovered.

But the fundamental principle will remain: well-designed structured operations beat dynamically generated code for complex, stateful domains.

### The Pattern Recognition

- "SOAP is too heavy, just screen-scrape" → Industry built REST
- "MCP is too heavy, just write code" → Industry will build better abstractions

### Why This Time Feels Different (But Isn't)

The code execution advocates have a compelling argument: "LLMs are good at writing code now!"

But twenty years ago, code generation advocates had a similar argument: "We can generate clients from WSDL now!"

The capability isn't the question. The question is: what's the right abstraction layer?

Code generation from WSDL worked for simple cases. It failed for complex ones. The answer wasn't "stop using structured interfaces." It was "design better interfaces."

### What We Will Learn In the Near-Term

We'll learn:

- Which domains need structured operations
- Which can use code execution effectively
- How to design efficient tool definitions
- What abstractions scale
- Where the boundaries are

Those who dismissed structured interfaces entirely will be rewriting systems.

Those who learned to design better abstractions will be building the next generation of AI infrastructure.

### The Real Question Isn't "Tools vs Code"

It's "what are the right abstractions for AI-driven systems in different domains?"

Code execution doesn't answer this question. It avoids asking it.

It says: "Abstractions are hard, let the AI figure it out each time."

But we learned from SOAP → REST that the answer is: "Build better abstractions."

---

## The Cloudflare Fallacy: When JavaScript Culture Meets Systems Thinking

Cloudflare's "Code Mode" article represents a particular worldview about how software should work. Understanding where this worldview comes from, and where it's valid, reveals why the code execution approach works for some domains but fails for others.

### The Cultural Divide

This isn't really about MCP vs code execution. It's about two different philosophies of software design.

**JavaScript/TypeScript Culture:**

- Runtime flexibility is good
- Figure it out dynamically
- Ship fast, iterate based on what happens
- "If it compiles and runs, try it in production"
- Network/API calls are cheap operations
- Fail fast, retry is easy
- Developer ergonomics trump guarantees

**Systems/Operations Culture:**

- Explicit contracts defined upfront
- Behavior specified before execution
- Test thoroughly, guarantee correctness before shipping
- "Make illegal states unrepresentable"
- Operations have real costs
- Failures compound
- Reliability trumps convenience

Neither is wrong. They optimize for different problems.

### Cloudflare's Architecture Reveals Their Philosophy

They built an entire platform around:

- Fast isolate spin-up (milliseconds)
- Disposable execution environments
- Network bindings as primary abstraction
- "Just run it and see what happens"

This is brilliant for their domain: edge computing, web scraping, API mashups, serverless functions.

These are exactly the use cases where:

- Stateless operations dominate
- Quick startup matters more than steady-state performance
- Each request is independent
- Failures are local and cheap
- Retrying is trivial

But this doesn't generalize to all domains.

### The Training Data Argument Is Superficial

Cloudflare's core argument: "LLMs have seen enormous amounts of real-world TypeScript but only contrived examples of tool calls."

This is technically true and completely misses the point.

LLMs have also seen enormous amounts of:

- Buffer overflows
- SQL injection vulnerabilities
- Race conditions
- Memory leaks
- Off-by-one errors
- Incorrect algorithm implementations
- Performance anti-patterns

Frequency in training data doesn't imply correctness in production.

An LLM writing syntactically valid TypeScript that calls an API correctly doesn't mean it:

- Chose the right API for the use case
- Handled error cases appropriately
- Made performance-aware decisions
- Managed state correctly
- Understood the domain trade-offs

It just means it knows TypeScript syntax.

### Knowing Grammar Doesn't Make You a Lawyer

You can write grammatically perfect English sentences that are legally nonsense. Grammar is syntax. Legal reasoning is semantics.

Similarly, writing valid TypeScript is syntax. Understanding which operations to perform, in what order, with what parameters, given domain constraints—that's semantics.

Code execution gives you syntactic fluency. It doesn't give you semantic correctness.

### Where Cloudflare Is Right

Their approach works brilliantly when:

- Operations are stateless
- Complexity is low
- Failure modes are obvious
- Retrying is cheap
- Performance doesn't matter much
- Each execution is independent
- The "right answer" is obvious

Their filesystem and API composition examples fit this perfectly.

### Where They're Wrong

They assume these characteristics apply to all domains.

They don't.

When operations have:

- Complex state that compounds
- Subtle trade-offs requiring domain expertise
- Performance requirements that matter
- Expensive failure modes
- Context that builds over time
- Multiple correct approaches with different characteristics

Code execution becomes unreliable.

Not because LLMs are bad at writing code. Because complex domains require domain-optimized operations that AI can't reliably synthesize on-the-fly from training data.

### The Token Argument Is Backwards

Cloudflare argues: "Skip intermediate results through context to save tokens."

But this only considers one source of token consumption.

**Token costs in code execution:**

- Generate execution logic each time
- Include error handling code
- Add validation logic
- Write defensive checks
- Generate explanatory comments
- Re-implement similar logic with variations

**Token costs in structured operations:**

- Define interface once
- Use compact parameter passing
- Pre-optimized response formats
- No redundant code generation

For complex domains, structured operations often use fewer total tokens than repeatedly generating execution code.

### The Real Trade-off

- **Code execution**: High flexibility, variable reliability, regeneration cost
- **Structured operations**: Constrained flexibility, guaranteed reliability, one-time cost

Which is better? Depends on your domain.

### What Cloudflare Is Actually Solving

They're solving the GitHub MCP problem: poorly designed servers that dump massive tool definitions into context.

Their solution: "Don't fix MCP server design, bypass it with code execution."

The better solution: "Fix the damn server design. Build proper abstractions."

The token problem isn't inherent to structured operations. It's a consequence of bad abstraction design.

---

## The Correct Abstraction: Domain-Centric Operations

So if code execution is wrong for complex domains, and massive tool definitions are wrong for token efficiency, what's right?

The answer: **Domain-centric operations with semantic guarantees.**

### Three Approaches to Abstraction

There are three ways to design external capabilities for AI systems:

**1. Data-Centric (Code Execution Approach)**

- Expose raw data or minimal data access
- Let AI write code to process it
- Maximum flexibility
- No operational guarantees

**2. Operation-Centric (Bad MCP Servers)**

- Hardcode everything as separate tools
- One tool per possible action
- Minimal flexibility
- Tool explosion

**3. Domain-Centric (The Right Approach)**

- Parameterized operations that embody domain expertise
- Flexible through parameters, not code generation
- Semantic guarantees through validated operations
- Reasonable tool count

The code execution advocates reject #2 (correctly) and conclude #1 is the answer.

They're missing #3.

### What Domain-Centric Looks Like

Instead of:

- 50 tools for every possible search variation (operation-centric)
- Or one "get data" tool and let AI write search code (data-centric)

Provide:

- One search operation with parameters for: algorithm type, filters, response format, session scope

### Example: Memory Search

**Bad (Operation-Centric):**

```
semantic_search
tag_search
date_range_search
semantic_search_current_session
semantic_search_all_sessions
semantic_search_detailed_format
semantic_search_concise_format
... (tool explosion)
```

**Bad (Data-Centric):**

```
get_all_memories → AI writes filtering code
```

Flexible but unreliable, token-heavy, inconsistent

**Good (Domain-Centric):**

```typescript
search(
  search_type: "semantic" | "tags" | "date_range" | "hybrid",
  query: string,
  response_format: "detailed" | "concise" | "ids_only" | "summary",
  session_filter_mode: "all" | "session_only" | "session_and_shared",
  use_ai: boolean,
  limit: integer
)
```

One tool. Flexible through parameters. Validated combinations. Semantic guarantees.

### Why This Works

**For AI Agents:**

- Clear parameter choices (not infinite code possibilities)
- Validated combinations prevent errors
- Consistent behavior across calls
- Token-efficient responses
- Predictable performance

**For Developers:**

- Same operation available via REST/CLI
- Testable and documentable
- Performance characteristics known
- Can be optimized once, used everywhere

**For Production Systems:**

- Reliable behavior
- Performance guarantees
- State management works correctly
- Errors are predictable
- Monitoring and debugging possible

### The Parameterization Principle

Flexibility through parameters, not code generation.

Instead of letting AI write:

```typescript
// Search memories semantically
const results = await searchMemories(query);

// Filter to current session
const filtered = results.filter(m => m.session === currentSession);

// Format concisely to save tokens
const formatted = filtered.map(m => ({
  id: m.id,
  content: m.content.substring(0, 200)
}));
```

Provide:

```typescript
const results = await search({
  query,
  search_type: "semantic",
  session_filter_mode: "session_only",
  response_format: "concise"
});
```

Same outcome. Explicit semantics. Validated behavior. Fewer tokens. Guaranteed correct.

### How to Know Which Approach

**Use data-centric (code execution) when:**

- Operations are stateless
- Complexity is minimal
- Failure modes are obvious
- Performance doesn't matter
- Each operation is independent
- "Right answer" is unambiguous

**Use domain-centric (parameterized operations) when:**

- State compounds across operations
- Complex trade-offs exist
- Performance requirements matter
- Failures can cascade
- Context builds over time
- Domain expertise improves outcomes

**Use operation-centric (many specific tools) when:**

- You want your MCP server to be criticized in blog posts

### The Decision Framework

Ask yourself:

**1. Do operational choices have significant consequences?**

- If no → code execution fine
- If yes → structured operations

**2. Can domain expertise significantly improve outcomes?**

- If no → code execution fine
- If yes → structured operations

**3. Does state persist and compound?**

- If no → code execution fine
- If yes → structured operations

**4. Do performance characteristics matter?**

- If no → code execution fine
- If yes → structured operations

**5. Must behavior be consistent across identical inputs?**

- If no → code execution might work
- If yes → structured operations

It's not about "tools vs code." It's about operational requirements.

The real innovation isn't "let AI write code."

The real innovation is: learning to design operations that AI agents can use effectively.

That means:

- Clear parameter spaces
- Validated combinations
- Semantic guarantees
- Performance characteristics
- Token-aware responses

This is hard. It requires domain expertise and systems thinking.

But it's the actual problem we need to solve.

Code execution is the easy way out: "Abstractions are hard, let the AI figure it out."

That works for simple domains. It fails for complex ones.

---

## Production Evidence: What Actually Works

Theory is useful. Production data is definitive.

I'll use Local Memory, the platform I built to provide memory capabilities to any AI platform.

### AI Agents Use Parameters Correctly

Zero reports of parameter misuse. When given well-designed options like `search_type: semantic | tags | hybrid` or `response_format: detailed | concise | ids_only`, agents consistently choose appropriate combinations.

This validates the abstraction level. Parameters are constrained enough to prevent errors, flexible enough for intelligent choices.

### Multi-Protocol Usage Proves Operations Matter

Users access identical operations through MCP, REST, CLI, and JSON-RPC. Same semantics, different wire formats.

This proves operations are the valuable abstraction, not the transport. If MCP required special design, multi-protocol support wouldn't work.

### Token Optimization Through Design

Response format parameters enable 50-95% token reduction based on context needs. Users actively leverage these because token budgets matter in production.

Code execution can't reliably achieve this—AI-generated filtering code varies, producing inconsistent token usage across identical queries.

### Consistent Performance Matters

Structured operations deliver predictable performance because they're optimized once and reused.

Code execution generates fresh implementations each time with variable performance: different algorithms, varying memory usage, inconsistent execution time.

Production systems need predictability.

### Complex Queries Need Domain Expertise

"Analyze my learning progression on Kubernetes over the past quarter" requires temporal analysis, concept clustering, relationship discovery, and pattern recognition.

Code execution would re-implement this logic every query. Structured operations implement it once, correctly, with tested algorithms.

### What Users Request

Users ask for:

- More parameter options for new use cases
- Additional structured operations for new domains
- Better performance from existing operations

Not:

- "Give me raw data so I can write code"
- "Remove these constraints for flexibility"

Market validation: users want more structure, not less.

### Where Skills Fit

Anthropic's Skills approach actually complements well-designed structured operations.

**Skills are for procedural knowledge:**

- "When analyzing customer feedback, always check sentiment first"
- "Format financial reports with these specific formulas"
- "Follow this code review checklist"

**Structured operations are for domain capabilities:**

- Search algorithms with validated parameters
- Memory relationship discovery
- Temporal pattern analysis
- State management across sessions

Skills don't replace operations. They teach Claude how to use operations effectively for specific workflows.

### Example: Well-Designed System

```
MCP Server: Provides search operation with semantic guarantees
Skill: Teaches "when researching competitors, first search our notes,
       then cross-reference with public data, then synthesize gaps in
       this specific format"
```

The Skill contains workflow expertise. The operation provides reliable capability.

This is the right separation of concerns. Skills handle "what to do when," operations handle "how to do it reliably."

**The Mistake:** Conflating Skills (workflow knowledge) with code execution (operation implementation).

**The Lesson:** Skills should orchestrate operations, not replace them with generated code.

---

## Implications for Builders

If you're building MCP servers or AI integrations, here's how to think about this.

### Five Questions to Ask About Your Domain

**1. Does state compound across operations?**

If someone searches for "React hooks," then asks "show me examples I saved," does the second query depend on the first? If state builds up and matters, you need structured operations.

**2. Do operational choices have real consequences?**

Reading a file? Low stakes. Calculating financial risk? High stakes. When choices matter, don't let AI regenerate the logic each time.

**3. Are performance characteristics critical?**

If users expect consistent response times, or you're handling high-frequency queries, structured operations give you predictable performance. Code execution gives you variable performance.

**4. Must behavior be consistent?**

If running the same query twice should produce the same operational behavior (not just the same data), you need structured operations. Code execution will vary.

**5. Do you need auth, security, or audit trails?**

Code execution makes this hard:

- Generated code might leak credentials
- Authorization boundaries get fuzzy
- Audit trails become inconsistent
- Secrets management is complex

Structured operations centralize security: auth at the operation level, clear permissions, consistent logging, secrets never exposed to AI.

**If you answered "yes" to two or more: use structured operations.**

### Design Principles That Work

**Parameterize for flexibility, don't explode your tool count**

Don't do this:

```
search_semantic
search_tags
search_semantic_current_session
search_semantic_all_sessions
search_tags_current_session
```

Do this:

```
search(type, filters, session_mode, format)
```

One tool, clear parameters, combinatorial flexibility.

**Encode domain expertise in the operations**

Your operations should contain knowledge that AI shouldn't have to recreate from scratch:

- Token-aware response formatting
- Optimized algorithms for common patterns
- Validated parameter combinations that work well together
- State management that handles edge cases correctly

**Design for multiple transports**

This is the litmus test: if your operation only makes sense through MCP, your abstraction is probably wrong.

Could this work as a REST endpoint? A CLI command? JSON-RPC? If not, you're likely coupled too tightly to one transport model.

**Make security explicit and centralized**

With structured operations:

- Authentication happens at the operation boundary
- Authorization checks are in one place
- Audit logs are consistent
- Secrets stay server-side

With code execution:

- Each generated script handles auth differently
- Permission boundaries are unclear
- Audit trails vary by implementation
- AI might accidentally expose credentials

### When Code Execution Actually Works

It's not that code execution is always wrong. It works well for:

- File system operations (list, read, filter)
- Simple data transformations
- Stateless workflows
- Rapid prototyping
- Low-security contexts

### When You Need Structured Operations

Use them for:

- Complex state management
- Performance-critical paths
- Security-sensitive operations
- Production workflows users depend on
- Anything requiring authentication or authorization
- Systems that need audit trails

### How Skills Fit Into This

As I mentioned before, don't conflate Skills with operation implementation.

**Skills teach workflow knowledge:** "For competitive analysis: first search our internal notes, then cross-reference with public data, then identify gaps"

**Operations provide capabilities:** search(), fetch(), analyze() - each with validated parameters and semantic guarantees

Skills orchestrate operations. They don't replace them with generated code.

Think of Skills as the "how to use these operations effectively" layer, not the "let's generate operations on the fly" layer.

### The Path Forward

Over the next few years, we'll develop better patterns for AI-facing operations:

- Token-efficient tool definitions
- Parameter design conventions
- Security patterns that work
- Performance documentation standards

The innovation isn't "let AI write code instead of using tools."

The innovation is learning to design operations that AI agents can use reliably while maintaining security and performance guarantees.

This is harder than code execution. It also scales to production.

Those dismissing structured operations entirely will miss this learning opportunity.

Those refining their abstractions will build the infrastructure everyone else depends on.

---

## Conclusion

The MCP backlash gets the diagnosis right and the prescription wrong.

Yes, many MCP servers are poorly designed. Yes, excessive tool definitions waste tokens. Yes, the GitHub MCP consuming tens of thousands of tokens is a problem.

But the solution isn't to abandon structured operations for code execution. It's to learn how to design better abstractions.

### We've Been Here Before

Twenty years ago, developers criticized SOAP as bloated and impractical. The response was "just screen-scrape HTML and write custom parsers."

The industry didn't abandon structured APIs. It built better ones: REST, then JSON-RPC, progressively learning what works.

We're watching the same pattern with AI systems. The first generation of MCP servers made mistakes. The response is "abandon structure, let AI write code."

History suggests we'll instead learn to design better abstractions.

### The Real Question

Not "tools vs code execution."

**The real question: What abstraction level does your domain require?**

For filesystems and simple data access? Code execution works fine.

For complex domains with state, performance requirements, security needs, and operational semantics that matter? Structured operations with validated parameters.

### What Different Camps Are Optimizing For

- **Anthropic** is optimizing for research flexibility and rapid iteration.
- **Cloudflare** is optimizing for developer ergonomics and their edge computing platform.
- **Production systems** need reliability guarantees, consistent behavior, security boundaries, and performance predictability.

These are different problems requiring different solutions.

### The Path Forward

The code execution advocates are solving real problems: token overhead, tool explosion, poor abstractions.

But they're throwing out the baby with the bathwater.

The answer isn't "let AI figure out operations from scratch each time."

The answer is "learn to design operations that AI can use effectively while providing the guarantees production systems need."

This means:

- Parameterized operations with clear semantics
- Token-efficient designs
- Progressive disclosure where appropriate
- Domain expertise encoded in operations
- Security and performance guarantees
- Transport-agnostic abstractions

It's harder than code execution. It's also what scales.

In the next few years, we'll have learned which domains need structured operations and which can use code execution. We'll have design patterns, conventions, and best practices.

Those who dismissed structured operations entirely will be rewriting systems.

Those who learned to design better abstractions will have built the infrastructure everyone depends on.

**The MCP backlash is loud. But it's missing the point.**

The innovation we need isn't "let AI write code."

The innovation we need is learning to design the right abstractions for AI-driven systems.

That's the hard work. That's also the valuable work.
