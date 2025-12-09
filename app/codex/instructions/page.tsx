'use client';

import { useScrollDepth } from '../../hooks/useScrollDepth';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function CodexInstructions() {
  useScrollDepth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://www.youtube.com') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange') {
            if (data.info === 1 && window.gtag) {
              window.gtag('event', 'video_play', {
                event_category: 'engagement',
                event_label: 'codex_demo_video'
              });
            }
          }
        } catch (e) {}
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const trackGitHubClick = (location: string) => {
    if (window.gtag) {
      window.gtag('event', 'github_click', {
        event_category: 'conversion',
        event_label: `codex_${location}`
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        :root {
          --codex-bg: #0a0a0b;
          --codex-surface: #111113;
          --codex-surface-raised: #18181b;
          --codex-border: #27272a;
          --codex-border-bright: #3f3f46;
          --codex-amber: #f59e0b;
          --codex-amber-dim: #b45309;
          --codex-amber-glow: rgba(245, 158, 11, 0.12);
          --codex-text: #fafafa;
          --codex-text-secondary: #a1a1aa;
          --codex-text-dim: #71717a;
          --codex-green: #22c55e;
          --codex-red: #ef4444;
          --codex-blue: #3b82f6;
        }

        * {
          box-sizing: border-box;
        }

        .codex-instructions {
          font-family: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
          background: var(--codex-bg);
          color: var(--codex-text);
          min-height: 100vh;
          line-height: 1.7;
        }

        .codex-instructions::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(ellipse at 0% 0%, rgba(245, 158, 11, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(245, 158, 11, 0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .heading-serif {
          font-family: 'Crimson Pro', Georgia, serif;
          letter-spacing: -0.02em;
        }

        .section-card {
          background: var(--codex-surface);
          border: 1px solid var(--codex-border);
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }

        .section-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--codex-amber-dim), transparent);
          opacity: 0.5;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--codex-border);
          background: var(--codex-surface-raised);
        }

        .section-number {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          background: var(--codex-amber);
          color: var(--codex-bg);
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--codex-text);
        }

        .section-body {
          padding: 24px;
        }

        .code-block {
          background: #000;
          border: 1px solid var(--codex-border);
          border-radius: 6px;
          padding: 16px;
          font-size: 13px;
          overflow-x: auto;
          position: relative;
        }

        .code-block::before {
          content: 'terminal';
          position: absolute;
          top: 0;
          right: 0;
          font-size: 9px;
          padding: 4px 8px;
          background: var(--codex-border);
          color: var(--codex-text-dim);
          border-radius: 0 6px 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .code-block code {
          color: var(--codex-green);
        }

        .inline-code {
          background: rgba(245, 158, 11, 0.1);
          color: var(--codex-amber);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.9em;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .prompt-block {
          background: var(--codex-surface-raised);
          border-left: 3px solid var(--codex-amber);
          padding: 16px 20px;
          margin: 16px 0;
          border-radius: 0 6px 6px 0;
          font-style: italic;
          color: var(--codex-text-secondary);
        }

        .prompt-block::before {
          content: '>';
          color: var(--codex-amber);
          font-style: normal;
          margin-right: 8px;
          font-weight: bold;
        }

        .tip-box {
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 6px;
          padding: 16px;
          margin: 16px 0;
        }

        .tip-box::before {
          content: '$ tip';
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--codex-green);
          margin-bottom: 8px;
          font-weight: 600;
        }

        .warning-box {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 6px;
          padding: 16px;
          margin: 16px 0;
        }

        .warning-box::before {
          content: '! warning';
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--codex-red);
          margin-bottom: 8px;
          font-weight: 600;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (max-width: 640px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
        }

        .feature-card {
          background: var(--codex-surface-raised);
          border: 1px solid var(--codex-border);
          border-radius: 6px;
          padding: 16px;
        }

        .feature-card h4 {
          font-size: 13px;
          font-weight: 600;
          color: var(--codex-amber);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-card ul {
          font-size: 12px;
          color: var(--codex-text-secondary);
          margin: 0;
          padding-left: 16px;
        }

        .feature-card li {
          margin: 4px 0;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .comparison-table th {
          text-align: left;
          padding: 12px 16px;
          background: var(--codex-surface-raised);
          border-bottom: 2px solid var(--codex-amber-dim);
          font-weight: 600;
          color: var(--codex-amber);
        }

        .comparison-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--codex-border);
          color: var(--codex-text-secondary);
        }

        .comparison-table tr:hover td {
          background: var(--codex-surface-raised);
        }

        .amber-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--codex-amber), var(--codex-amber-dim));
          color: var(--codex-bg);
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .amber-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.25);
        }

        .ghost-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--codex-text-secondary);
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid var(--codex-border);
        }

        .ghost-btn:hover {
          color: var(--codex-amber);
          border-color: var(--codex-amber-dim);
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.15s; }
        .stagger-3 { animation-delay: 0.2s; }
        .stagger-4 { animation-delay: 0.25s; }
        .stagger-5 { animation-delay: 0.3s; }

        .text-dim { color: var(--codex-text-dim); }
        .text-secondary { color: var(--codex-text-secondary); }
        .text-amber { color: var(--codex-amber); }
        .text-green { color: var(--codex-green); }

        .kbd {
          display: inline-block;
          padding: 3px 8px;
          background: var(--codex-surface-raised);
          border: 1px solid var(--codex-border-bright);
          border-radius: 4px;
          font-size: 12px;
          font-family: inherit;
          box-shadow: 0 2px 0 var(--codex-border);
        }

        .repo-banner {
          background: linear-gradient(135deg, var(--codex-surface-raised), var(--codex-surface));
          border: 1px solid var(--codex-border);
          border-radius: 8px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .repo-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--codex-amber), var(--codex-amber-dim), transparent);
        }

        .cta-banner {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05));
          border: 1px solid var(--codex-amber-dim);
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          position: relative;
        }

        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--codex-amber-glow), transparent 70%);
          pointer-events: none;
        }

        .prompt-snippet {
          background: var(--codex-surface-raised);
          border: 1px solid var(--codex-border);
          border-radius: 6px;
          padding: 12px 16px;
          font-size: 12px;
        }

        .prompt-snippet .label {
          font-size: 11px;
          font-weight: 600;
          color: var(--codex-amber);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .prompt-snippet .content {
          color: var(--codex-text-secondary);
          font-style: italic;
        }

        ul.check-list {
          list-style: none;
          padding: 0;
        }

        ul.check-list li {
          position: relative;
          padding-left: 24px;
          margin: 8px 0;
          color: var(--codex-text-secondary);
        }

        ul.check-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--codex-green);
          font-weight: bold;
        }

        ol.numbered-list {
          counter-reset: item;
          list-style: none;
          padding: 0;
        }

        ol.numbered-list li {
          counter-increment: item;
          position: relative;
          padding-left: 32px;
          margin: 12px 0;
          color: var(--codex-text-secondary);
        }

        ol.numbered-list li::before {
          content: counter(item);
          position: absolute;
          left: 0;
          width: 20px;
          height: 20px;
          background: var(--codex-amber-dim);
          color: var(--codex-bg);
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="codex-instructions">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">

          {/* Header */}
          <header className={`mb-16 ${mounted ? 'fade-in' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber text-xs font-semibold px-3 py-1 rounded" style={{ background: 'var(--codex-amber-glow)', border: '1px solid var(--codex-amber-dim)' }}>
                <span className="text-green">●</span> DOCUMENTATION
              </span>
            </div>
            <h1 className="heading-serif text-5xl md:text-6xl font-bold mb-4">
              OpenAI Codex CLI<br />
              <span className="text-amber">for Product Managers</span>
            </h1>
            <p className="text-secondary text-lg max-w-2xl">
              A complete guide to prototyping and document workflows, based on Carl&apos;s Full Stack PM tutorial.
            </p>
          </header>

          {/* Video */}
          <div className={`mb-12 ${mounted ? 'fade-in stagger-1' : 'opacity-0'}`}>
            <div className="section-card">
              <div className="section-header">
                <span className="text-dim text-xs uppercase tracking-wider">// watch the demo</span>
              </div>
              <div className="p-6">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded"
                    src="https://www.youtube.com/embed/NYSZ4g7igDg?enablejsapi=1"
                    title="Codex CLI Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Repo Banner */}
          <div className={`repo-banner mb-12 ${mounted ? 'fade-in stagger-2' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Get the Repository</h3>
                <p className="text-secondary text-sm">Clone and start exploring immediately</p>
              </div>
              <a
                href="https://github.com/carlvellotti/codex-demo-pm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGitHubClick('top_section')}
                className="amber-btn"
              >
                <span>→</span> View on GitHub
              </a>
            </div>
            <div className="code-block mt-4" style={{ marginBottom: 0 }}>
              <code>git clone https://github.com/carlvellotti/codex-demo-pm.git && cd codex-demo-pm</code>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">

            {/* Prerequisites */}
            <section className={`section-card ${mounted ? 'fade-in stagger-3' : 'opacity-0'}`}>
              <div className="section-header">
                <span className="section-number">00</span>
                <span className="section-title">Prerequisites</span>
              </div>
              <div className="section-body">
                <ul className="check-list">
                  <li>macOS or Windows with a Terminal</li>
                  <li>OpenAI account with API access</li>
                  <li><strong>Node.js & npm</strong> installed</li>
                  <li><strong>Cursor</strong> or VS Code (optional but recommended)</li>
                  <li><strong>Whisper Flow</strong> for voice dictation (optional)</li>
                </ul>

                <div className="code-block mt-6">
                  <pre className="text-dim text-xs">{`/context/business_info.md          # Company context for AI
/data/interviews/*.md              # User interviews
/data/youtube/                     # Transcripts output
/docs/meetings/*.md                # Meeting notes
/templates/
  meeting_notes_summary.md         # Meeting summary template
  prd_template.md                  # PRD structure
  socratic_questioning.md          # Thought partner prompts
/examples/prds/                    # Example PRDs
/prds/                             # Your outputs
/scripts/youtube_transcript/       # YouTube API helper`}</pre>
                </div>
              </div>
            </section>

            {/* Install */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">01</span>
                <span className="section-title">Install & Launch</span>
              </div>
              <div className="section-body">
                <ol className="numbered-list">
                  <li>
                    Install Codex globally:
                    <div className="code-block mt-2"><code>npm install -g @openai/codex</code></div>
                  </li>
                  <li>
                    Launch Codex:
                    <div className="code-block mt-2"><code>codex</code></div>
                  </li>
                  <li>That&apos;s it. You&apos;re in.</li>
                </ol>

                <div className="tip-box">
                  <strong>Essential commands:</strong><br />
                  <span className="inline-code">/model</span> switch models &nbsp;
                  <span className="inline-code">/new</span> fresh chat &nbsp;
                  <span className="inline-code">/compact</span> save context &nbsp;
                  <span className="inline-code">/approvals</span> toggle permissions
                </div>
              </div>
            </section>

            {/* File exploration */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">02</span>
                <span className="section-title">Explore Local Files</span>
              </div>
              <div className="section-body">
                <p className="text-secondary mb-4">Codex can search, read, and synthesize files in your project folder:</p>
                <div className="space-y-3">
                  <div className="prompt-block">&quot;What user interviews do we have in /data/interviews?&quot;</div>
                  <div className="prompt-block">&quot;Summarize the top 3 pain points across all interviews.&quot;</div>
                  <div className="prompt-block">&quot;Create a pain point summary with direct customer quotes.&quot;</div>
                </div>
              </div>
            </section>

            {/* Web Search + Images */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">03</span>
                <span className="section-title">Web Search & Images</span>
              </div>
              <div className="section-body">
                <div className="feature-grid">
                  <div className="feature-card">
                    <h4><span className="text-green">●</span> Web Search</h4>
                    <p className="text-secondary text-sm">Ask Codex to search and summarize anything from the web.</p>
                    <div className="prompt-block mt-3" style={{ fontSize: '12px' }}>&quot;Search the web for Claude Code vs Codex differences&quot;</div>
                  </div>
                  <div className="feature-card">
                    <h4><span className="text-blue">●</span> Image Analysis</h4>
                    <p className="text-secondary text-sm">Paste images with <span className="kbd">Ctrl+V</span> (even on Mac!)</p>
                    <div className="prompt-block mt-3" style={{ fontSize: '12px' }}>&quot;Give me feedback on this UI screenshot&quot;</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Run Code */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">04</span>
                <span className="section-title">Run Code & APIs</span>
              </div>
              <div className="section-body">
                <p className="text-secondary mb-4">Codex can install dependencies, write scripts, and run code. This is what separates it from browser ChatGPT.</p>
                <div className="prompt-block">&quot;Use the YouTube transcript API in /scripts to get the transcript for [URL] and save to /data/youtube/transcript.md&quot;</div>
                <div className="tip-box">
                  Browser ChatGPT can&apos;t do this—it doesn&apos;t have the tools. CLI tools give you superpowers.
                </div>
              </div>
            </section>

            {/* YOLO Mode */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">05</span>
                <span className="section-title">YOLO Mode</span>
              </div>
              <div className="section-body">
                <p className="text-secondary mb-4">Skip permission prompts and let Codex run free:</p>
                <div className="code-block"><code>codex --yolo</code></div>
                <p className="text-dim text-sm mt-3">Or type <span className="inline-code">/approvals</span> and select &quot;full access&quot;</p>

                <div className="warning-box">
                  YOLO mode gives Codex full access to run commands. Use it in safe project folders, not on production code.
                </div>
              </div>
            </section>

            {/* Templates */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">06</span>
                <span className="section-title">Use Templates</span>
              </div>
              <div className="section-body">
                <p className="text-secondary mb-4">Point Codex to template files for consistent output. Use <span className="inline-code">@</span> to reference files:</p>
                <div className="prompt-block">&quot;Summarize @docs/meetings using @templates/meeting_notes_summary.md&quot;</div>
                <ul className="check-list mt-4">
                  <li>Consistent structure across outputs</li>
                  <li>Easy to iterate—just edit the template</li>
                  <li>Store those &quot;mega prompts&quot; from Twitter/X here</li>
                </ul>
              </div>
            </section>

            {/* Socratic Questioning */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">07</span>
                <span className="section-title">Socratic Questioning</span>
              </div>
              <div className="section-body">
                <p className="text-secondary mb-4">Before writing a PRD, have Codex challenge your thinking:</p>
                <ol className="numbered-list">
                  <li>
                    Give context:
                    <div className="prompt-block mt-2" style={{ fontSize: '13px' }}>&quot;Read @context/business_info.md&quot;</div>
                  </li>
                  <li>
                    Engage Socratic mode:
                    <div className="prompt-block mt-2" style={{ fontSize: '13px' }}>&quot;Use @templates/socratic_questioning.md to ask me questions about [feature idea]&quot;</div>
                  </li>
                </ol>
                <div className="tip-box">
                  This is the grilling you&apos;d get from your manager or execs—now you can prepare in advance.
                </div>
              </div>
            </section>

            {/* Full PRD Workflow */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">08</span>
                <span className="section-title">Full PRD Workflow</span>
              </div>
              <div className="section-body">
                <ol className="numbered-list">
                  <li><strong className="text-amber">Set context:</strong> <span className="text-dim">&quot;Read @context/business_info.md&quot;</span></li>
                  <li><strong className="text-amber">Socratic questioning:</strong> <span className="text-dim">&quot;Use @templates/socratic_questioning.md&quot;</span></li>
                  <li><strong className="text-amber">Review examples:</strong> <span className="text-dim">&quot;Review PRDs in @examples/prds/&quot;</span></li>
                  <li><strong className="text-amber">Generate:</strong> <span className="text-dim">&quot;Write PRD using @templates/prd_template.md, save to /prds/&quot;</span></li>
                </ol>
                <div className="tip-box">
                  This embeds your thinking into the document instead of letting AI make assumptions.
                </div>
              </div>
            </section>

            {/* Model Comparison */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">09</span>
                <span className="section-title">GPT-5 vs GPT-5 Codex</span>
              </div>
              <div className="section-body">
                <div className="feature-grid">
                  <div className="feature-card">
                    <h4>GPT-5 (Default)</h4>
                    <ul>
                      <li>Best for document tasks</li>
                      <li>Summaries, analysis, writing</li>
                      <li>Web searches</li>
                      <li>General PM workflows</li>
                    </ul>
                  </div>
                  <div className="feature-card">
                    <h4>GPT-5 Codex</h4>
                    <ul>
                      <li>Optimized for coding</li>
                      <li>Better at complex features</li>
                      <li>More thorough (but slower)</li>
                      <li>Use for prototyping</li>
                    </ul>
                  </div>
                </div>
                <p className="text-dim text-sm mt-4">Use <span className="inline-code">/model</span> to switch. Stick with GPT-5 for most PM work.</p>
              </div>
            </section>

            {/* Codex vs Claude Code */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">10</span>
                <span className="section-title">Codex vs Claude Code</span>
              </div>
              <div className="section-body">
                <div className="overflow-x-auto">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>Codex CLI</th>
                        <th>Claude Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Custom Commands</td><td>No (use templates)</td><td>Yes (slash commands)</td></tr>
                      <tr><td>Plan Mode</td><td>Readonly only</td><td>Full plan mode</td></tr>
                      <tr><td>Sub-agents</td><td>Manual (multiple terminals)</td><td>Built-in parallel agents</td></tr>
                      <tr><td>Speed</td><td>Slower, thorough</td><td>Faster</td></tr>
                      <tr><td>Output Style</td><td>Follows exactly</td><td>Makes decisions</td></tr>
                      <tr><td>Best For</td><td>Precise specs, coding</td><td>Document work, flexibility</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Prompt Snippets */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">11</span>
                <span className="section-title">Prompt Snippets</span>
              </div>
              <div className="section-body">
                <div className="grid gap-3">
                  <div className="prompt-snippet">
                    <div className="label">Explore interviews</div>
                    <div className="content">&quot;Summarize top 3 pain points across all interviews with direct quotes.&quot;</div>
                  </div>
                  <div className="prompt-snippet">
                    <div className="label">Meeting notes</div>
                    <div className="content">&quot;Summarize @docs/meetings using @templates/meeting_notes_summary.md&quot;</div>
                  </div>
                  <div className="prompt-snippet">
                    <div className="label">YouTube transcript</div>
                    <div className="content">&quot;Get transcript for [URL] using /scripts, save to /data/youtube/&quot;</div>
                  </div>
                  <div className="prompt-snippet">
                    <div className="label">Full PRD</div>
                    <div className="content">&quot;Using @templates/prd_template.md and @examples/prds/, write PRD based on our discussion.&quot;</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section className="section-card">
              <div className="section-header">
                <span className="section-number">12</span>
                <span className="section-title">Top PM Use Cases</span>
              </div>
              <div className="section-body">
                <div className="feature-grid">
                  <div className="feature-card" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}>
                    <h4 style={{ color: 'var(--codex-green)' }}>Document Work</h4>
                    <ul>
                      <li>Summarize meeting notes</li>
                      <li>Synthesize user interviews</li>
                      <li>Write PRDs with context</li>
                      <li>Draft Slack messages</li>
                    </ul>
                  </div>
                  <div className="feature-card" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                    <h4 style={{ color: 'var(--codex-blue)' }}>Research & Analysis</h4>
                    <ul>
                      <li>Web research with sources</li>
                      <li>Competitive analysis</li>
                      <li>YouTube transcript extraction</li>
                      <li>Image/screenshot analysis</li>
                    </ul>
                  </div>
                  <div className="feature-card" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                    <h4 style={{ color: '#a855f7' }}>Thought Partnership</h4>
                    <ul>
                      <li>Socratic questioning</li>
                      <li>Challenge assumptions</li>
                      <li>Think through edge cases</li>
                      <li>Prepare for exec reviews</li>
                    </ul>
                  </div>
                  <div className="feature-card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    <h4>Prototyping</h4>
                    <ul>
                      <li>Build quick prototypes</li>
                      <li>Connect to APIs</li>
                      <li>Automate repetitive tasks</li>
                      <li>Create internal tools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* CTA */}
          <div className="cta-banner mt-16">
            <h2 className="heading-serif text-3xl font-bold mb-3 relative z-10">Ready to start?</h2>
            <p className="text-secondary mb-6 relative z-10">Clone the repo and build something today.</p>
            <a
              href="https://github.com/carlvellotti/codex-demo-pm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGitHubClick('bottom_cta')}
              className="amber-btn relative z-10"
            >
              <span>→</span> View on GitHub
            </a>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <a href="/codex" className="ghost-btn">
              ← back to codex home
            </a>
          </footer>

        </div>
      </div>
    </>
  );
}
