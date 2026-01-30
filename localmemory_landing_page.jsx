import React, { useState, useEffect } from 'react';
import { Check, X, ChevronRight, Terminal, Zap, Shield, Globe, Clock, ArrowRight, Star, Github, MessageCircle } from 'lucide-react';

export default function LocalMemoryLanding() {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({ hero: true });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="font-semibold text-lg">Local Memory</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Community</a>
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">100% Local. Your data never leaves.</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI agents that{' '}
            <span className="relative">
              <span className="text-white bg-white/10 px-3 py-1 rounded-lg">remember</span>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop re-explaining your codebase. Local Memory gives Claude, GPT, and every AI agent persistent memory that survives sessions, switches, and /clear.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/25">
              Get Started — $49
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-colors">
              See it in action
            </button>
          </div>
          
          {/* Trust line */}
          <p className="text-sm text-gray-500 mb-8">
            One-time purchase. Works with Claude, GPT, Gemini, Codex, and any MCP client.
          </p>
          
          {/* Logo bar */}
          <div className="flex items-center justify-center gap-8 opacity-50">
            <span className="text-sm text-gray-500">Works with:</span>
            <div className="flex gap-6 items-center">
              {['Claude', 'GPT', 'Cursor', 'VS Code', 'Windsurf'].map((name) => (
                <span key={name} className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SUCCESS (NEW) */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need. Nothing you don't.</h2>
            <p className="text-gray-400">One purchase. No subscriptions. No cloud dependencies. No limits.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Full MCP integration', desc: 'Native support for Claude Desktop, Claude Code, and any MCP client' },
              { title: 'Universal REST API', desc: 'Works with GPT, Gemini, Codex, and custom agents' },
              { title: 'Semantic search', desc: 'Vector-powered search with 10ms response times' },
              { title: 'Cross-agent memory', desc: 'Context flows between every tool you use' },
              { title: 'Lifetime updates', desc: 'Every future feature, included forever' },
              { title: 'macOS, Windows, Linux', desc: 'Runs anywhere you code' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROBLEM-AGITATE */}
      <section className="py-20 px-6 bg-gradient-to-b from-red-950/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">You're bleeding time. Every single session.</h2>
            <p className="text-xl text-gray-400">Every time you start a new conversation, you pay the context tax.</p>
          </div>
          
          {/* Problem 1 */}
          <div className="mb-12 bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 font-mono text-sm bg-red-500/10 px-3 py-1 rounded">PROBLEM 1</span>
              <h3 className="text-xl font-semibold">The 15-Minute Ritual</h3>
            </div>
            <p className="text-gray-300 mb-4 italic">"Let me explain our architecture again..."</p>
            <p className="text-gray-400 mb-4">
              Every session starts the same way. You explain your auth patterns. Your API conventions. Why you made that database decision six months ago. Your AI nods along, pretending it doesn't have amnesia.
            </p>
            <p className="text-amber-400 font-semibold">
              15 minutes per session. 5 sessions a day. That's over 6 hours a week re-teaching your tools what they should already know.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="mb-12 bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 font-mono text-sm bg-red-500/10 px-3 py-1 rounded">PROBLEM 2</span>
              <h3 className="text-xl font-semibold">Knowledge That Walks Out the Door</h3>
            </div>
            <p className="text-gray-400 mb-4">
              You spent three hours debugging that WebSocket race condition. You finally fixed it. You explained why the obvious solution made things worse. Then you typed <code className="bg-white/10 px-2 py-0.5 rounded text-red-400">/clear</code>.
            </p>
            <p className="text-amber-400 font-semibold">
              Your debugging insights, your architectural decisions, your hard-won patterns — they're training data for corporations, not assets for you.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="mb-12 bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 font-mono text-sm bg-red-500/10 px-3 py-1 rounded">PROBLEM 3</span>
              <h3 className="text-xl font-semibold">The AI You Can't Trust</h3>
            </div>
            <p className="text-gray-300 mb-4 italic">"Didn't we already establish this?"</p>
            <p className="text-gray-400 mb-4">
              You've told Claude your testing philosophy. You've told GPT your deployment preferences. They remember nothing. So you stop trusting them with anything important.
            </p>
            <p className="text-amber-400 font-semibold">
              You never get the AI partnership you were promised.
            </p>
          </div>

          {/* The Math */}
          <div className="bg-gradient-to-r from-red-900/30 to-amber-900/30 border border-red-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">The Math</h3>
            <p className="text-gray-300 mb-4">The average developer loses <span className="text-amber-400 font-bold">$50-100 per day</span> to context re-explanation.</p>
            <div className="font-mono text-sm text-gray-400 mb-4 bg-black/30 rounded-lg p-4 inline-block">
              10-15 min/session × 5-8 sessions × $50-75/hr = <span className="text-red-400">$42-100 daily waste</span>
            </div>
            <p className="text-xl text-white">
              That's <span className="text-red-400 font-bold">$10,000-25,000 per year</span>. Gone.
            </p>
            <p className="text-2xl font-bold text-green-400 mt-4">
              Local Memory costs $49. Once.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: VALUE STACK */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What You're Getting</h2>
            <p className="text-xl text-gray-400">Built for developers who refuse to repeat themselves</p>
          </div>

          {/* Value Tiers */}
          <div className="space-y-6 mb-12">
            {[
              {
                tier: 'Tier 1',
                title: 'Core Memory Engine',
                value: '$200+',
                features: ['Persistent local storage', 'Semantic vector search', 'Knowledge hierarchy (L0→L3)', 'Contradiction detection', 'Relationship mapping']
              },
              {
                tier: 'Tier 2',
                title: 'Universal Agent Integration',
                value: '$150+',
                features: ['MCP native support', 'Full REST API', 'Cross-agent sync', 'CLI tools & automation']
              },
              {
                tier: 'Tier 3',
                title: 'Enterprise-Grade Architecture',
                value: '$100+',
                features: ['34,466 memories/second', '97.5% token optimization', 'Domain separation', 'Session management']
              },
              {
                tier: 'Tier 4',
                title: 'Ownership Guarantee',
                value: '$99/yr',
                features: ['Lifetime updates', 'No subscription', 'No cloud lock-in', 'No AI training on your data']
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">{item.tier}</span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((f, j) => (
                      <span key={j} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 line-through text-sm">value:</span>
                  <span className="text-xl font-bold text-gray-300 ml-2">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Value Box */}
          <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 border border-blue-500/20 rounded-2xl p-8 text-center">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Value</p>
                <p className="text-3xl font-bold text-gray-300 line-through">$549+</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Your Price</p>
                <p className="text-4xl font-bold text-green-400">$49</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">One-time. Forever. No subscriptions.</p>
            <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105">
              Get Started — $49
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON TABLE */}
      <section className="py-20 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Local Memory vs. The Alternatives</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4">Capability</th>
                  <th className="text-center py-4 px-4 bg-blue-500/10 rounded-t-lg">Local Memory</th>
                  <th className="text-center py-4 px-4">Cloud Memory</th>
                  <th className="text-center py-4 px-4">Markdown Files</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Your data stays local', true, false, true],
                  ['Semantic search', true, true, false],
                  ['Cross-agent memory', true, 'lock', 'manual'],
                  ['Never trains AI models', true, 'maybe', true],
                  ['Auto-categorization', true, 'some', false],
                  ['Relationship discovery', true, 'limited', false],
                  ['Contradiction detection', true, false, false],
                  ['Knowledge evolution', true, false, false],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">{row[0]}</td>
                    <td className="py-4 px-4 text-center bg-blue-500/5">
                      {row[1] === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row[2] === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : 
                       row[2] === false ? <X className="w-5 h-5 text-red-500 mx-auto" /> :
                       <span className="text-xs text-yellow-500">{row[2]}</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row[3] === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : 
                       row[3] === false ? <X className="w-5 h-5 text-red-500 mx-auto" /> :
                       <span className="text-xs text-yellow-500">{row[3]}</span>}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-white/20 font-bold">
                  <td className="py-4 px-4">Price</td>
                  <td className="py-4 px-4 text-center bg-blue-500/5 text-green-400">$49 once</td>
                  <td className="py-4 px-4 text-center text-red-400">$20-50/mo</td>
                  <td className="py-4 px-4 text-center text-gray-400">Free*</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">*Free but costs 6+ hours/week in manual management</p>
        </div>
      </section>

      {/* SECTION 6: SOCIAL PROOF */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Don't take our word for it</h2>
          <p className="text-gray-400 text-center mb-12">Developers shipping with Local Memory</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I added a single line to my agentic workflow that forces AI to save every decision and fix. Now during refactors, it searches memories automatically. My code reviews went from 'why did we do this?' to 'here's the context.'",
                name: 'Jamie S.',
                title: 'Senior Developer'
              },
              {
                quote: "Latency after warm-up: ~0.5s store, ~0.2s search, ~1.0s relate. Local Memory boosted my productivity more than any other tool I've added this year. The response times are production-ready.",
                name: 'Devontae W.',
                title: 'Senior Developer'
              },
              {
                quote: "I was skeptical. Another AI memory tool? But this one actually works. When the tools are prompted well, the results are amazing — minus the hallucinations.",
                name: 'Neil P.',
                title: 'Senior Engineer'
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm flex-1 mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TRANSFORMATION (NEW) */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">From day one to unfair advantage</h2>
            <p className="text-xl text-gray-400">Your journey with Local Memory</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-green-500 to-amber-500 hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  time: 'Day 1',
                  title: 'Installation',
                  desc: 'Two-minute setup. Your first memory saved. You tell Claude about your auth patterns. This time, it actually remembers.',
                  color: 'blue'
                },
                {
                  time: 'Week 1',
                  title: 'Recognition',
                  desc: 'Your AI starts finishing your sentences. "Based on your preference for JWT with 24h expiry..." it begins, without you explaining anything.',
                  color: 'cyan'
                },
                {
                  time: 'Month 1',
                  title: 'Intelligence',
                  desc: 'Patterns emerge across projects. That debugging insight from Project A helps you in Project B. You\'re accumulating advantage.',
                  color: 'green'
                },
                {
                  time: 'Quarter 1',
                  title: 'Institution',
                  desc: 'Your knowledge becomes infrastructure. New team member joins. Instead of 3 weeks of onboarding, your AI walks them through everything.',
                  color: 'amber'
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className={`w-16 h-16 rounded-full bg-${item.color}-500/20 border border-${item.color}-500/50 flex items-center justify-center flex-shrink-0 z-10`}>
                    <span className="text-xs font-bold text-gray-300">{item.time}</span>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <p className="text-xl text-gray-300 mb-2">Every explanation you save becomes searchable.</p>
            <p className="text-xl text-gray-300 mb-2">Every pattern you teach becomes reusable.</p>
            <p className="text-xl text-gray-300 mb-4">Every decision you document becomes institutional knowledge.</p>
            <p className="text-2xl font-bold text-amber-400">This isn't a tool. It's a competitive moat.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: SECONDARY CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to stop repeating yourself?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Two-minute setup. Your data stays on your machine. Works with every AI agent you use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/25">
              Get Started — $49
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-colors">
              Read the docs
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              One-time purchase
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              MCP + REST API
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              macOS, Windows, Linux
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="py-12 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-semibold">Local Memory</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Community</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            <p>Built by D.E. Williams & Co.</p>
            <p className="mt-2">© 2026 Local Memory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
