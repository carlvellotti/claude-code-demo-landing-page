'use client';

import { useScrollDepth } from '../hooks/useScrollDepth';
import { useEffect } from 'react';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Instructions() {
  // Track scroll depth
  useScrollDepth();

  // Track video plays
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://www.youtube.com') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange') {
            if (data.info === 1 && window.gtag) { // 1 = playing
              window.gtag('event', 'video_play', {
                event_category: 'engagement',
                event_label: 'demo_video'
              });
            }
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const trackGitHubClick = (location: string) => {
    if (window.gtag) {
      window.gtag('event', 'github_click', {
        event_category: 'conversion',
        event_label: location
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          How to Recreate Carl&apos;s Claude Code Demo
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          A step-by-step playbook to reproduce everything from the Claude Code for Product Managers tutorial.
        </p>
        {/* Video Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Watch the Demo</h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/4nthc76rSl8?enablejsapi=1"
              title="Claude Code Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
            </div>

        <div className="mb-12 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
          <h3 className="text-lg font-semibold text-green-900 mb-2">📦 Get the Repository</h3>
          <p className="text-green-800 mb-4">
            Start by cloning the demo repository with all the materials (paste this into any AI and it will help you!):
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-3">
            git clone https://github.com/carlvellotti/claude-code-pm-demo.git<br />
            cd claude-code-pm-demo
          </div>
          <a
            href="https://github.com/carlvellotti/claude-code-pm-demo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGitHubClick('top_section')}
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
          >
            View on GitHub →
          </a>
        </div>
        
        <div className="prose prose-slate max-w-none space-y-12">
          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">0) Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>macOS or Windows with a Terminal</li>
              <li>Claude account (Pro is enough; Max optional)</li>
              <li>Optional tools used in the demo:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li><strong>Cursor</strong> (or your IDE of choice) for a built-in terminal + Markdown preview</li>
                  <li><strong>Node.js</strong> (for tiny prototype + scripts)</li>
                  <li><strong>API keys (optional):</strong> OpenAI, Google Gemini, xAI (Grok) if you run the multi-model prompt tests</li>
                  <li><strong>Whisper Flow</strong> (optional) for voice dictation to speed up prompts</li>
                </ul>
              </li>
            </ul>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Repo scaffold (adjust to your structure):</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`/context/business_info.md
/styles/writing/internal.md
/styles/writing/technical.md
/styles/writing/user_friendly.md
/examples/prds/example_prd.md
/data/interviews/*.md                   # e.g., jessica.md, marcus.md, ...
/docs/meetings/*.md                     # raw meeting notes
/commands/meeting-notes.command.md
/agents/designer.agent.md
/agents/engineer.agent.md
/agents/executive.agent.md
/agents/library/…                       # optional templates you include
/mcp/reddit.json                        # optional Reddit MCP config
/scripts/youtube_transcript/…           # optional helper, or just let Claude write it
/specs/workflow-builder.md
/prds/                                  # outputs
/reviews/                               # outputs
/research/                              # outputs`}
              </pre>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">1) Install & Launch Claude Code</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>Copy the <strong>native installer command</strong> from Anthropic&apos;s official Quick Start and run it in Terminal.</li>
              <li>Launch Claude Code by typing:
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm my-2">claude</div>
              </li>
            </ol>
            
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-semibold text-indigo-900 mb-2">Handy built-ins you&apos;ll use a lot:</p>
              <ul className="list-disc list-inside space-y-1 text-indigo-800 ml-4">
                <li><code className="bg-white px-2 py-1 rounded">clear</code> — resets the current conversation context</li>
                <li><code className="bg-white px-2 py-1 rounded">init</code> — scans the folder and creates/updates a project memory file named <code>CLAUDE</code></li>
                <li><strong>Plan mode toggle</strong> — press <kbd className="bg-white px-2 py-1 rounded border">Shift+Tab</kbd> to switch between &quot;plan only&quot; and &quot;auto-apply&quot;</li>
                <li>Project memory rule: type a line starting with <code>#</code>, e.g. <code># Never commit to GitHub without asking me first.</code></li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">2) Open Claude in the Project Folder</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>In Finder/Explorer, right-click your <strong>demo folder</strong> → &quot;Open in Terminal&quot;.</li>
              <li>Run:
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm my-2">claude</div>
              </li>
            </ol>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">3) Explore & Question Local Files (Interviews)</h2>
            <p className="text-gray-700 mb-3">In Claude:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>&quot;How many customer interviews are in <code className="bg-gray-100 px-2 py-1 rounded">/data/interviews</code>?&quot;</li>
              <li>&quot;Summarize the top takeaways from <strong>Jessica</strong>.&quot;</li>
              <li>&quot;Compare <strong>Jessica</strong> vs <strong>Marcus</strong> with a focus on healthcare vs retail needs.&quot;</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">💡 Tip: run <code className="bg-gray-100 px-2 py-1 rounded">clear</code> between unrelated tasks.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">4) Web Search (inside Claude Code)</h2>
            <p className="text-gray-700 mb-3">In a fresh session (<code className="bg-gray-100 px-2 py-1 rounded">clear</code>):</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>&quot;Search the web for the latest iPhone announced <strong>this month</strong>. Give me key specs and sources.&quot;</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">(You can substitute any topic here—this step demonstrates Claude Code&apos;s built-in search.)</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">5) Image Analysis</h2>
            <p className="text-gray-700 mb-3">Drag an image (e.g. <code className="bg-gray-100 px-2 py-1 rounded">assets/linkedin-graphic.png</code>) into the Claude terminal window and ask:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>&quot;Analyze this image and give PM-relevant feedback I can apply before posting.&quot;</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">6) Run Code: Pull a YouTube Transcript to Markdown</h2>
            <p className="text-gray-700 mb-3"><strong>Goal:</strong> Given a GitHub repo for a &quot;YouTube transcript API,&quot; have Claude install/use it and save a transcript as Markdown.</p>
            <p className="text-gray-700 mb-3">In Claude:</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Use the YouTube transcript API at <code>&lt;repo URL or local script&gt;</code> to fetch the transcript for <code>&lt;YouTube URL&gt;</code>, then write it to <code>./transcripts/video.md</code>. Create whatever script is needed and run it.&quot;
            </blockquote>
            <p className="text-gray-700 mb-3">What happens:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Claude creates a to-do plan (install deps → write script → fetch → save MD) and executes it.</li>
              <li>Approve any file writes when prompted.</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">Open the result later in your IDE to preview.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">7) Use Claude Inside an IDE (Cursor)</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>Open the project in <strong>Cursor</strong>.</li>
              <li>Open terminal inside Cursor (<kbd className="bg-gray-100 px-2 py-1 rounded border">Ctrl+`</kbd> on Windows/Linux; <kbd className="bg-gray-100 px-2 py-1 rounded border">Ctrl+`</kbd> on macOS) → run:
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm my-2">claude</div>
              </li>
              <li>Open <code className="bg-gray-100 px-2 py-1 rounded">transcripts/video.md</code> and <strong>Preview</strong> (Cursor: <kbd className="bg-gray-100 px-2 py-1 rounded border">Shift+Cmd+V</kbd> on macOS).</li>
            </ol>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">8) Create Project Memory with <code>init</code></h2>
            <p className="text-gray-700 mb-3">In Claude (inside your project folder):</p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm my-2">init</div>
            <p className="text-gray-700 mb-3">This scans your tree and writes/updates a <code className="bg-gray-100 px-2 py-1 rounded">CLAUDE</code> file with structure, setup notes, and rules.</p>
            
            <p className="text-gray-700 mb-3 font-semibold">Add guardrails (they persist across sessions):</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto my-3">
{`# Never commit to GitHub without asking me first.
# When doing web research, return results as bullets with source links.
# Use the "internal" writing style for internal docs unless I specify otherwise.`}
            </pre>
            <p className="text-gray-600 text-sm mt-3">You can also place <strong>subfolder-specific</strong> <code>CLAUDE</code> files (e.g., <code>/prds/CLAUDE</code>) to enforce different rules in different areas.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">9) Generate a PRD Using Context + Styles + Examples</h2>
            <p className="text-gray-700 mb-3">Make sure these exist:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><code className="bg-gray-100 px-2 py-1 rounded">/context/business_info.md</code></li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/styles/writing/technical.md</code></li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/examples/prds/example_prd.md</code></li>
            </ul>
            
            <p className="text-gray-700 mb-3 mt-4">In Claude (fresh session):</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Research OpenAI&apos;s <strong>Realtime</strong> API (speech-to-speech), read <code>/context/business_info.md</code>, model the structure after <code>/examples/prds/example_prd.md</code>, use tone from <code>/styles/writing/technical.md</code>, and write a PRD for adding a Realtime-powered feature to our product. Save to <code>/prds/realtime_prd.md</code>.&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3">Approve file writes. Open/preview the PRD in your IDE.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">10) Batch Meeting Summaries + Action Items (No Command)</h2>
            <p className="text-gray-700 mb-3">In Claude:</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Open <code>/docs/meetings</code>. For every Markdown file, append a <strong>Meeting Summary</strong> and <strong>Action Items</strong> section at the <strong>bottom</strong>. Try to infer owner + due date if obvious.&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3">Open any updated file to see appended sections.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">11) Re-run with a <strong>Saved Command</strong> (Your &quot;Stored Prompt&quot;)</h2>
            <p className="text-gray-700 mb-3">You&apos;re shipping a reusable command file (example): <code className="bg-gray-100 px-2 py-1 rounded">/commands/meeting-notes.command.md</code></p>
            
            <p className="text-gray-700 mb-3">What it contains (high level):</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Expected inputs (file or folder)</li>
              <li>Exact structure to write (Summary, Action Items, Metrics Mentioned, Risks, Next Steps)</li>
              <li>Where to place output (top or bottom)</li>
            </ul>
            
            <p className="text-gray-700 mb-3 mt-4"><strong>Invoke it</strong> by name in Claude:</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Run <strong>meeting-notes</strong> on <code>/docs/meetings</code> and put the sections at the <strong>top</strong> this time.&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3"><em>(Claude Code detects commands in <code>/commands</code> and will offer to execute them; if it asks where, give it the folder path.)</em></p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">12) Draft a Slack Follow-up in Your Voice</h2>
            <p className="text-gray-700 mb-3">In Claude:</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Using <code>/styles/writing/internal.md</code> for tone and the action items from <code>docs/meetings/2025-01-27-sync.md</code>, draft a Slack DM to <strong>Sarah</strong> asking for a status update (due yesterday). Keep it friendly but direct.&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3">Copy/paste the result into Slack.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">13) <strong>Plan Mode</strong> for a Multi-Model Prompt Test Harness</h2>
            <p className="text-gray-700 mb-3"><strong>Why:</strong> Plan first for complex tasks, then execute.</p>
            
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>Toggle <strong>Plan Mode</strong> (<kbd className="bg-gray-100 px-2 py-1 rounded border">Shift+Tab</kbd>) so Claude can&apos;t edit files yet.</li>
              <li>In Claude:
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
                  &quot;I&apos;m building a YouTube transcript summarizer. Create <strong>three</strong> distinct prompts (short insights / medium educational / long critical analysis). Then write code to run those prompts against the models I have keys for (OpenAI / Gemini / Grok). Use <code>./transcripts/video.md</code> as the test input. Save <strong>one Markdown per prompt</strong> to <code>/research/evals/</code>, and inside each file include sections for each model&apos;s output.&quot;
                </blockquote>
              </li>
              <li>Review the proposed plan. If needed, add:
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
                  &quot;Ensure outputs are Markdown (<code>.md</code>), one file <strong>per prompt</strong>, each with <strong>three model sections</strong>. Then execute.&quot;
                </blockquote>
              </li>
              <li>Toggle back to <strong>Auto-Apply</strong> (<kbd className="bg-gray-100 px-2 py-1 rounded border">Shift+Tab</kbd>) and let it run.</li>
            </ol>
            
            <p className="text-gray-700 mb-3 mt-4"><strong>Before running</strong>, set local env (example):</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto my-3">
{`# .env
OPENAI_API_KEY=...
GEMINI_API_KEY=...
XAI_API_KEY=...`}
            </pre>
            <p className="text-gray-600 text-sm mt-3">Open the generated files under <code>/research/evals/</code> and compare outputs.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">14) Parallelize Work with Temporary Sub-Agents</h2>
            <p className="text-gray-700 mb-3">In Claude:</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;For every file in <code>/data/interviews</code>, spin up a <strong>UXR</strong> agent in parallel and extract 3–5 <strong>Key Insights</strong>. Prepend them to the <strong>top</strong> of each file (&apos;## Key Insights&apos;).&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3">Open the interview files to see the prepended sections.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">15) Use Your <strong>Custom Review Agents</strong> (Designer / Engineer / Exec)</h2>
            <p className="text-gray-700 mb-3">You ship three agent definitions:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><code className="bg-gray-100 px-2 py-1 rounded">/agents/designer.agent.md</code> (e.g., color: pink, focuses on UX/readability)</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/agents/engineer.agent.md</code> (feasibility, risks, integration)</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/agents/executive.agent.md</code> (strategy, metrics, ROI)</li>
            </ul>
            
            <p className="text-gray-700 mb-3 mt-4">In Claude:</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Review <code>/prds/realtime_prd.md</code> from the <strong>designer</strong>, <strong>engineer</strong>, and <strong>executive</strong> perspectives using the agents in <code>/agents</code>. Combine all feedback into <code>/reviews/realtime_prd_multi_review.md</code>.&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3"><em>(Claude spins each as an isolated sub-agent, then aggregates.)</em></p>
            
            <p className="text-gray-700 mb-3 mt-4"><strong>Importing new agent templates:</strong></p>
            <p className="text-gray-600 text-sm">You can include a tiny note in your repo (e.g., <code>agents/README.md</code>) telling users they can copy files from <code>/agents/library/*</code> into <code>/agents</code> to add more roles (e.g., Legal Advisor).</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">16) Add MCP Tools (Example: Reddit)</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>Provide a working MCP config at <code className="bg-gray-100 px-2 py-1 rounded">/mcp/reddit.json</code> (with instructions in <code>mcp/README.md</code> to add credentials).</li>
              <li>In Claude (after setup):
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
                  &quot;Using the <strong>Reddit MCP</strong>, fetch top posts from <strong>r/productmanagement</strong> discussing &apos;automation&apos; in the last month. Extract recurring pain points. Save to <code>/research/reddit-automation-pain-points.md</code>.&quot;
                </blockquote>
              </li>
            </ol>
            <p className="text-gray-600 text-sm mt-3"><em>(You can include a similar Google Drive MCP if you want to demonstrate importing Drive docs directly.)</em></p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">17) Quick Front-End Prototype from a Spec</h2>
            <p className="text-gray-700 mb-3">Make sure <code className="bg-gray-100 px-2 py-1 rounded">specs/workflow-builder.md</code> explains the minimal feature:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Canvas with a dotted grid</li>
              <li>Button: <strong>Add Node</strong></li>
              <li>Ability to connect nodes visually</li>
            </ul>
            
            <p className="text-gray-700 mb-3 mt-4">In Claude (fresh session, auto-apply on):</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
              &quot;Implement the prototype described in <code>specs/workflow-builder.md</code> as a local web app (any simple stack). Add start scripts. Then run it.&quot;
            </blockquote>
            <p className="text-gray-600 text-sm mt-3">Open the local URL it prints (often <a href="http://localhost:3000" className="text-indigo-600 hover:underline">http://localhost:3000</a>), click <strong>Add Node</strong>, add a second node, try making a connection.</p>
            
            <p className="text-gray-600 text-sm mt-3">💡 Tip: If it starts &quot;manifesting&quot; for too long, switch to <strong>Plan Mode</strong>, have it outline the file structure & steps, approve, then execute.</p>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">18) Best Practices & Controls</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use <code className="bg-gray-100 px-2 py-1 rounded">clear</code> between unrelated tasks to keep context fresh</li>
              <li><strong>Plan Mode</strong> first for anything non-trivial; correct the plan before execution</li>
              <li>Keep <strong><code># project memory rules</code></strong> in <code>CLAUDE</code> (e.g., &quot;Ask before committing&quot;, &quot;Use internal tone by default&quot;)</li>
              <li>Avoid YOLO/auto-approve for unfamiliar repos or prod code</li>
              <li>Work in a <strong>safe test folder</strong>; use <code>git</code> to checkpoint changes</li>
              <li>When you need heavier coding horsepower, keep Claude Code for orchestration + writing, but do the &quot;big compile-and-run&quot; work in an IDE with your preferred top model</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-200">19) Prompt Snippets You Can Copy/Paste</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Count & compare interviews</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                  <li>&quot;How many interview files are under <code>/data/interviews</code>?&quot;</li>
                  <li>&quot;Summarize the top takeaways from <strong>Jessica</strong>.&quot;</li>
                  <li>&quot;Compare <strong>Jessica</strong> vs <strong>Marcus</strong> focusing on healthcare vs retail.&quot;</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">PRD super-prompt</p>
                <p className="text-gray-700 text-sm italic">&quot;Research OpenAI <strong>Realtime</strong> API, read <code>/context/business_info.md</code>, use <code>/examples/prds/example_prd.md</code> as a pattern, apply <code>/styles/writing/technical.md</code>, and write <code>/prds/realtime_prd.md</code>.&quot;</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Meetings → structured summaries</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                  <li>&quot;For each file in <code>/docs/meetings</code>, add <strong>Meeting Summary</strong> and <strong>Action Items</strong> at the bottom (owner + due date if obvious).&quot;</li>
                  <li>&quot;Run <strong>meeting-notes</strong> on <code>/docs/meetings</code> and place sections at the <strong>top</strong>.&quot;</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Slack nudge</p>
                <p className="text-gray-700 text-sm italic">&quot;Using <code>/styles/writing/internal.md</code> and <code>docs/meetings/2025-01-27-sync.md</code> action items, draft a Slack DM to <strong>Sarah</strong> (past due yesterday).&quot;</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Parallel agents</p>
                <p className="text-gray-700 text-sm italic">&quot;Spawn a <strong>UXR</strong> agent per file in <code>/data/interviews</code> (in parallel). Prepend &apos;## Key Insights&apos; (3–5 bullets) at the top of each file.&quot;</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Multi-model eval harness (Plan Mode first)</p>
                <p className="text-gray-700 text-sm italic">&quot;Create three distinct transcript-summary prompts (short/medium/long). Write code to run them against <strong>OpenAI/Gemini/Grok</strong> using my env keys. Use <code>./transcripts/video.md</code> as input. Save one <code>.md</code> per prompt under <code>/research/evals/</code>, each with sections for the three model outputs.&quot;</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Multi-perspective reviews</p>
                <p className="text-gray-700 text-sm italic">&quot;Using agents in <code>/agents</code>, review <code>/prds/realtime_prd.md</code> from designer/engineer/executive perspectives and merge into <code>/reviews/realtime_prd_multi_review.md</code>.&quot;</p>
          </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Reddit MCP</p>
                <p className="text-gray-700 text-sm italic">&quot;Using the <strong>Reddit MCP</strong>, fetch top r/productmanagement posts on &apos;automation&apos; from the last month and extract recurring pain points into <code>/research/reddit-automation-pain-points.md</code>.&quot;</p>
          </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Prototype</p>
                <p className="text-gray-700 text-sm italic">&quot;Implement the prototype in <code>specs/workflow-builder.md</code>, add start scripts, run locally, and tell me the URL.&quot;</p>
              </div>
            </div>
          </section>
          </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-3">Ready to Get Started?</h3>
          <p className="text-lg mb-6 text-indigo-100">Clone the repository and start building with Claude Code today!</p>
          <a
            href="https://github.com/carlvellotti/claude-code-pm-demo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGitHubClick('bottom_cta')}
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            View Repository on GitHub →
          </a>
        </div>

        <div className="mt-12 text-center pb-12">
          <a
            href="/"
            className="inline-block text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

