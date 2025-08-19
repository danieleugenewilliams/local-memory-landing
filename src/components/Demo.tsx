import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface MemoryParams {
  content: string;
  importance?: number;
  tags?: string[];
  source?: string;
}

interface SearchParams {
  query: string;
  limit?: number;
}

interface QuestionParams {
  question: string;
  context_limit?: number;
}

interface UserPromptParams {
  prompt: string;
}

type CommandParams = MemoryParams | SearchParams | QuestionParams | UserPromptParams;

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const cliScrollRef = useRef<HTMLDivElement>(null);

  const demoSteps = [
    {
      title: "Development Task",
      description: "Developer describes new API endpoint requirement",
      action: "user_input",
      command: `user prompt`,
      params: {
        prompt: "I need to implement a user preferences API endpoint that allows users to update their notification settings, privacy preferences, and display options. It should follow our existing API patterns and team conventions."
      },
      response: "I'll help you implement this API endpoint. Let me search for relevant context from your previous work..."
    },
    {
      title: "Search API Patterns", 
      description: "Agent searches for team's API architecture and conventions",
      action: "mcp__local-memory-go__search_memories",
      command: `search`,
      params: {
        query: "API architecture patterns team conventions authentication",
        limit: 10
      },
      response: `Found 4 memories:

1. API Authentication: All endpoints use JWT middleware with role-based access. Standard pattern: authenticate -> authorize -> validate -> process. Use existing authMiddleware from /middleware/auth.js (Score: 0.92)
   Tags: api-architecture, authentication, middleware, team-conventions

2. RESTful API Conventions: Team uses /api/v1/{resource}/{id}/{sub-resource} pattern. All responses follow {success: boolean, data: any, error?: string} format. Use HTTP status codes consistently. (Score: 0.89)
   Tags: api-architecture, rest, conventions, response-format

3. Database Schema Patterns: User-related settings stored in separate tables. user_preferences table with JSON columns for flexibility. Always use transactions for multi-table updates. (Score: 0.85)
   Tags: database, user-management, schema-design

4. Error Handling Standards: Use custom ApiError class. Validation errors return 400 with field-specific messages. Authentication errors return 401. Use express-validator for input validation. (Score: 0.83)
   Tags: error-handling, validation, api-architecture`
    },
    {
      title: "Search Requirements",
      description: "Agent finds business requirements and feature specifications",
      action: "mcp__local-memory-go__search_memories",
      command: `search`,
      params: {
        query: "user preferences notification settings requirements privacy",
        limit: 8
      },
      response: `Found 3 memories:

1. User Preferences Feature Requirements: Support email/SMS/push notification toggles, privacy settings (profile visibility, data sharing), and UI preferences (theme, language, timezone). Must be GDPR compliant with audit logging. (Score: 0.94)
   Tags: requirements, user-preferences, privacy, gdpr, business-analysis

2. Notification Service Integration: Use NotificationService.updateUserPreferences() method. Requires user_id and preferences object. Service handles queue updates automatically. Located in /services/NotificationService.js (Score: 0.88)
   Tags: integration, notification-service, api-integration

3. Privacy Compliance Notes: User preference changes must be logged in audit_logs table. Include user_id, changed_fields, old_values, new_values, timestamp. Required for GDPR data subject requests. (Score: 0.82)
   Tags: privacy, gdpr, audit-logging, compliance`
    },
    {
      title: "Generate Implementation",
      description: "Agent creates implementation plan using stored context",
      action: "mcp__local-memory-go__ask_question",
      command: `ask`,
      params: {
        question: "Based on our API patterns and user preferences requirements, how should I implement this endpoint?",
        context_limit: 7
      },
      response: `**Answer:** Based on your team's patterns and requirements, here's the implementation approach:

**Endpoint Structure:**
\`PUT /api/v1/users/:userId/preferences\` following your RESTful conventions

**Implementation Steps:**
1. Use existing authMiddleware for JWT authentication
2. Add role-based authorization (users can only update their own preferences)
3. Validate input using express-validator for notification/privacy/display settings
4. Update user_preferences table with transaction for data consistency
5. Call NotificationService.updateUserPreferences() for real-time updates
6. Log changes to audit_logs table for GDPR compliance
7. Return standardized response format: {success: true, data: updatedPreferences}

**Key Components Needed:**
- Route: /routes/api/v1/users.js
- Controller: UserPreferencesController.updatePreferences()
- Validation: schemas/userPreferencesSchema.js
- Database: user_preferences table updates with JSON column handling

**Based on 7 memories:**
1. API Authentication: JWT middleware with role-based access...
2. RESTful API Conventions: /api/v1/{resource}/{id}/{sub-resource} pattern...
3. User Preferences Feature Requirements: notification toggles, privacy settings...
4. Privacy Compliance Notes: audit logging for GDPR compliance...`
    }
  ];

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Smart scroll behavior: smooth scroll during typing, position at step start when complete
  useEffect(() => {
    if (cliScrollRef.current) {
      if (isTyping) {
        // During typing, smoothly scroll to bottom to show current activity
        setTimeout(() => {
          if (cliScrollRef.current) {
            cliScrollRef.current.scrollTo({
              top: cliScrollRef.current.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else if (commandHistory.length > 0) {
        // When step completes, scroll to show the start of the latest completed step within CLI
        setTimeout(() => {
          if (cliScrollRef.current) {
            const latestStepElement = document.getElementById(`step-${commandHistory.length - 1}`);
            if (latestStepElement) {
              const cliContainer = cliScrollRef.current;
              const stepOffsetTop = latestStepElement.offsetTop - cliContainer.offsetTop;
              cliContainer.scrollTo({
                top: stepOffsetTop,
                behavior: 'smooth'
              });
            }
          }
        }, 200);
      }
    }
  }, [commandHistory, currentCommand, isTyping]);

  const typeCommand = async (command: string, params: CommandParams) => {
    setCurrentCommand("");
    
    // Special handling for user prompts - show as plain text
    const fullCommand = command === "user prompt" 
      ? `${(params as UserPromptParams).prompt}`
      : `${command}(${JSON.stringify(params, null, 2)})`;
    
    // Type out the command character by character (much faster)
    for (let i = 0; i <= fullCommand.length; i++) {
      setCurrentCommand(fullCommand.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 8)); // Reduced from 30ms to 8ms
    }
    
    // Very brief pause before showing response (local-memory is fast!)
    await new Promise(resolve => setTimeout(resolve, 150)); // Reduced from 800ms to 150ms
  };

  const executeStep = async (stepIndex: number) => {
    setIsTyping(true);
    
    const step = demoSteps[stepIndex];
    
    // Type the command
    await typeCommand(step.command, step.params);
    
    // Add command and response to history
    setCommandHistory(prev => [...prev, {
      command: step.command,
      params: step.params,
      response: step.response,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Note: In real usage, memories would be stored in the local-memory database
    
    setCurrentCommand("");
    setIsTyping(false);
    setCurrentStep(stepIndex + 1);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setCommandHistory([]);
    setCurrentCommand("");
    setIsTyping(false);
  };

  return (
    <section id="demo" className="relative overflow-hidden bg-background py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-memory-blue/10 via-background to-memory-purple/10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container relative max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            See <em>Local Memory</em> in Action
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how this coding agent uses persistent memory to implement a complex API endpoint using team patterns and business requirements.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr] gap-6 lg:items-stretch">
            {/* Demo Controls */}
            <div className="flex flex-col">
              <div className="bg-card rounded-2xl p-6 border border-border flex-1">
                <h3 className="text-lg font-bold text-foreground mb-4">Interactive Demo</h3>
                
                {demoSteps.map((step, index) => (
                  <div key={index} className={`mb-4 p-4 rounded-lg border ${
                    index < currentStep ? 'bg-memory-green/10 border-memory-green/20' :
                    index === currentStep ? 'bg-memory-blue/10 border-memory-blue/20' :
                    'bg-muted/50 border-border'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index < currentStep ? 'bg-memory-green text-white' :
                        index === currentStep ? 'bg-memory-blue text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? '✓' : index + 1}
                      </div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    
                    {index === currentStep && (
                      <Button 
                        onClick={() => executeStep(index)}
                        disabled={isTyping}
                        size="sm"
                        className="w-full"
                      >
                        {isTyping ? 'Processing...' : `Run ${step.command}`}
                      </Button>
                    )}
                  </div>
                ))}

                <Button onClick={resetDemo} variant="outline" className="w-full">
                  Restart Session
                </Button>
              </div>
            </div>

            {/* Demo Output */}
            <div className="flex flex-col">
              {/* Code CLI Terminal */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-lg flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-400 font-mono">Code CLI - Local Memory Demo</span>
                </div>
                
                <div 
                  ref={cliScrollRef}
                  className="font-mono text-sm text-green-400 overflow-y-auto"
                  style={{ height: '556px' }}
                >
                  {/* Welcome message - always visible */}
                  <div className="text-slate-400 mb-4">
                    <span className="text-blue-400">❯</span> # Working on a large e-commerce web app. Local Memory has context from previous sessions.
                    <br />
                    <span className="text-slate-500"># Click "Run user prompt" to start implementing a new API endpoint...</span>
                  </div>
                  
                  {/* Command History */}
                  {commandHistory.map((entry, index) => (
                    <div key={index} id={`step-${index}`} className="mb-4">
                      <div className="text-blue-400">
                        <span className="text-blue-400">❯</span> {entry.command === "user prompt" 
                          ? <span className="text-white"> {`${(entry.params as UserPromptParams).prompt}`}</span>
                          : <span>
                              {entry.command}(
                              {JSON.stringify(entry.params, null, 2).split('\n').map((line, i) => (
                                <div key={i} className={i === 0 ? "inline" : "ml-4 text-cyan-300"}>{line}</div>
                              ))}
                            </span>
                        }
                      </div>
                      <div className="text-gray-200 mt-2 ml-2 whitespace-pre-line">
                        {entry.response}
                      </div>
                    </div>
                  ))}
                  
                  {/* Current Command Being Typed */}
                  {isTyping && currentCommand && (
                    <div className="text-blue-400">
                      <span className="text-blue-400">❯</span> {currentCommand.startsWith('>') 
                        ? <span className="text-white">{currentCommand}</span>
                        : currentCommand.split('\n').map((line, i) => (
                          <div key={i} className={i === 0 ? "inline" : "ml-4 text-cyan-300"}>{line}</div>
                        ))}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▊</span>
                    </div>
                  )}
                  
                  {/* Waiting for input prompt */}
                  {!isTyping && currentStep < demoSteps.length && commandHistory.length > 0 && (
                    <div className="text-slate-400">
                      <span className="text-blue-400">❯</span> <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▊</span>
                    </div>
                  )}
                  
                  {/* Demo Complete */}
                  {currentStep >= demoSteps.length && commandHistory.length > 0 && (
                    <div className="text-green-400 mt-4">
                      <span className="text-blue-400">❯</span> # Based on the context retrieved from my memories, I will develop a detailed implementation plan.
                      <br />
                      <span className="text-slate-400"># Local Memory bridges the gap between scattered context and actionable code.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-col md:col-span-2 lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border flex-1">
                <h3 className="text-lg font-bold text-foreground mb-6">Why <em>Local Memory</em>?</h3>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-memory-green/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🕑</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Save 2+ Hours Daily</h4>
                    <p className="text-sm text-muted-foreground">Skip searching docs and codebases. Get relevant team patterns instantly. Worth $100-300 daily.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-memory-blue/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🏦</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Pays for Itself in 2 Days</h4>
                    <p className="text-sm text-muted-foreground">Smart context selection maximizes expensive AI usage. 2,500%+ monthly ROI on time savings.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-memory-purple/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">📈</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">$2K-6K Monthly Value</h4>
                    <p className="text-sm text-muted-foreground">Build on past learnings. Cumulative knowledge eliminates repeated context gathering.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;