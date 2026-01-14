'use client';

import { useState, useEffect } from 'react';

export default function AdvancedInstructions() {
  const [mounted, setMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const steps = [
    {
      title: 'Clone the Demo Repo',
      description: 'Get all the starter files for the tutorial',
      code: 'git clone https://github.com/carlvellotti/taskflow-calendar-demo.git',
    },
    {
      title: 'Copy Start Files',
      description: 'Move starter files to your working directory',
      code: 'cd taskflow-calendar-demo && cp -r start/* .',
    },
    {
      title: 'Set Up Environment',
      description: 'Configure your API keys for Gemini and Linear',
      code: 'cp .env.example .env && open .env',
    },
    {
      title: 'Install Dependencies',
      description: 'Install Python packages for image generation',
      code: 'pip install google-genai pillow python-dotenv',
    },
    {
      title: 'Connect Linear MCP',
      description: 'Set up the Linear integration for ticket creation',
      code: 'npx -y mcp-remote https://mcp.linear.app/mcp',
    },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500;600&display=swap');

        :root {
          --adv-bg: #08080a;
          --adv-surface: #111113;
          --adv-surface-2: #1a1a1d;
          --adv-border: #27272a;
          --adv-border-subtle: #1e1e21;
          --adv-copper: #d4a574;
          --adv-copper-bright: #e8c4a0;
          --adv-copper-glow: rgba(212, 165, 116, 0.12);
          --adv-teal: #2dd4bf;
          --adv-text: #fafafa;
          --adv-text-secondary: #a1a1aa;
          --adv-text-dim: #52525b;
          --adv-success: #22c55e;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes checkmark {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .inst-page {
          font-family: 'DM Mono', monospace;
          background: var(--adv-bg);
          min-height: 100vh;
          position: relative;
        }

        .inst-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 30% at 50% 0%, rgba(212, 165, 116, 0.06), transparent);
          pointer-events: none;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .header {
          text-align: center;
          padding: 48px 24px 32px;
          border-bottom: 1px solid var(--adv-border-subtle);
        }

        .heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2rem;
          color: var(--adv-text);
          font-weight: 400;
          margin-bottom: 8px;
        }

        .heading em {
          font-style: italic;
          color: var(--adv-copper-bright);
        }

        .subheading {
          color: var(--adv-text-dim);
          font-size: 13px;
        }

        .steps-container {
          max-width: 640px;
          margin: 0 auto;
          padding: 32px 24px 48px;
        }

        .step-card {
          background: var(--adv-surface);
          border: 1px solid var(--adv-border);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
          animation: fadeIn 0.4s ease forwards;
          opacity: 0;
        }

        .step-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
        }

        .step-number {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--adv-copper-glow);
          border: 1px solid rgba(212, 165, 116, 0.2);
          border-radius: 8px;
          font-family: 'Geist Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--adv-copper);
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          color: var(--adv-text);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .step-description {
          color: var(--adv-text-dim);
          font-size: 12px;
        }

        .code-block {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--adv-bg);
          border-top: 1px solid var(--adv-border-subtle);
          padding: 14px 20px;
        }

        .code-prompt {
          color: var(--adv-copper);
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          flex-shrink: 0;
        }

        .code-text {
          flex: 1;
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          color: var(--adv-text-secondary);
          overflow-x: auto;
          white-space: nowrap;
        }

        .copy-button {
          padding: 6px 12px;
          background: var(--adv-surface-2);
          border: 1px solid var(--adv-border);
          border-radius: 6px;
          color: var(--adv-text-dim);
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .copy-button:hover {
          border-color: var(--adv-copper);
          color: var(--adv-copper);
        }

        .copy-button.copied {
          border-color: var(--adv-success);
          color: var(--adv-success);
        }

        .resources-section {
          max-width: 640px;
          margin: 0 auto;
          padding: 0 24px 48px;
        }

        .resources-title {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--adv-text-dim);
          margin-bottom: 16px;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .resource-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: var(--adv-surface);
          border: 1px solid var(--adv-border);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .resource-link:hover {
          border-color: var(--adv-copper);
          transform: translateY(-2px);
        }

        .resource-icon {
          font-size: 18px;
        }

        .resource-text {
          flex: 1;
        }

        .resource-label {
          font-size: 13px;
          color: var(--adv-text);
          font-weight: 500;
        }

        .resource-sub {
          font-size: 11px;
          color: var(--adv-text-dim);
        }

        .resource-arrow {
          color: var(--adv-copper);
          font-size: 14px;
        }

        .fade-in {
          animation: fadeIn 0.4s ease forwards;
          opacity: 0;
        }
      `}</style>

      <div className="inst-page">
        <div className="noise-overlay" />

        <div className={`header ${mounted ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <h1 className="heading">
            Setup <em>Instructions</em>
          </h1>
          <p className="subheading">Follow along with the Advanced Claude Code tutorial</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card"
              style={{ animationDelay: `${0.15 + index * 0.08}s` }}
            >
              <div className="step-header">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-description">{step.description}</div>
                </div>
              </div>
              <div className="code-block">
                <span className="code-prompt">$</span>
                <code className="code-text">{step.code}</code>
                <button
                  className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(step.code, index)}
                >
                  {copiedIndex === index ? 'copied' : 'copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="resources-section">
          <div className="resources-title">Resources</div>
          <div className="resources-grid">
            <a
              href="https://www.youtube.com/watch?v=59gy_24KIVE"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
              style={{ animationDelay: '0.6s' }}
            >
              <span className="resource-icon">▶</span>
              <div className="resource-text">
                <div className="resource-label">Watch Video</div>
                <div className="resource-sub">81 min tutorial</div>
              </div>
              <span className="resource-arrow">→</span>
            </a>

            <a
              href="https://github.com/carlvellotti/taskflow-calendar-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
              style={{ animationDelay: '0.65s' }}
            >
              <span className="resource-icon">◈</span>
              <div className="resource-text">
                <div className="resource-label">GitHub Repo</div>
                <div className="resource-sub">Demo files</div>
              </div>
              <span className="resource-arrow">→</span>
            </a>

            <a
              href="https://www.news.aakashg.com/p/carl-vellotti-podcast-2"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
              style={{ animationDelay: '0.7s' }}
            >
              <span className="resource-icon">◉</span>
              <div className="resource-text">
                <div className="resource-label">Written Guide</div>
                <div className="resource-sub">Aakash&apos;s blog</div>
              </div>
              <span className="resource-arrow">→</span>
            </a>

            <a
              href="https://linkedin.com/in/carlvellotti"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
              style={{ animationDelay: '0.75s' }}
            >
              <span className="resource-icon">●</span>
              <div className="resource-text">
                <div className="resource-label">Follow Carl</div>
                <div className="resource-sub">LinkedIn</div>
              </div>
              <span className="resource-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
