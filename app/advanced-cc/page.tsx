'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AdvancedClaudeCode() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email) {
      try {
        const response = await fetch('/api/submit-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: 'advanced_cc_demo_file'
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Error submitting email:', data);
          alert(`Error: ${data.message || 'Failed to submit email'}`);
        } else {
          if (window.gtag) {
            window.gtag('event', 'email_submitted', {
              event_category: 'engagement',
              event_label: 'advanced_cc_landing_page'
            });
          }
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        alert('Network error: Could not submit email');
      }
    }

    router.push('/advanced-cc/instructions');
  };

  const handleSkip = () => {
    if (window.gtag) {
      window.gtag('event', 'skip_clicked', {
        event_category: 'engagement',
        event_label: 'advanced_cc_landing_page'
      });
    }
    router.push('/advanced-cc/instructions');
  };

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
          --adv-copper-dim: #8b6914;
          --adv-copper-glow: rgba(212, 165, 116, 0.12);
          --adv-teal: #2dd4bf;
          --adv-teal-dim: #0d9488;
          --adv-text: #fafafa;
          --adv-text-secondary: #a1a1aa;
          --adv-text-dim: #52525b;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }

        .adv-page {
          font-family: 'DM Mono', monospace;
          background: var(--adv-bg);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .adv-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 165, 116, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 70% 110%, rgba(45, 212, 191, 0.04), transparent);
          pointer-events: none;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--adv-border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--adv-border-subtle) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%);
          opacity: 0.5;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 1px solid var(--adv-border);
          border-radius: 20px;
          animation: float 12s ease-in-out infinite;
          opacity: 0.3;
        }

        .floating-element::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid var(--adv-border-subtle);
          border-radius: 14px;
        }

        .floating-element.el-1 {
          top: 15%;
          left: 8%;
          animation-delay: 0s;
          transform: rotate(-12deg);
        }

        .floating-element.el-2 {
          bottom: 20%;
          right: 10%;
          width: 80px;
          height: 80px;
          animation-delay: -4s;
          transform: rotate(8deg);
        }

        .main-card {
          background: linear-gradient(135deg, var(--adv-surface) 0%, var(--adv-surface-2) 100%);
          border: 1px solid var(--adv-border);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        .main-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--adv-copper), transparent);
          opacity: 0.5;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--adv-copper-glow);
          border: 1px solid rgba(212, 165, 116, 0.2);
          border-radius: 100px;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--adv-copper);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: var(--adv-teal);
          border-radius: 50%;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2.75rem;
          line-height: 1.1;
          color: var(--adv-text);
          font-weight: 400;
        }

        .heading em {
          font-style: italic;
          color: var(--adv-copper-bright);
        }

        .stat-row {
          display: flex;
          gap: 24px;
          justify-content: center;
          padding: 16px 0;
          border-top: 1px solid var(--adv-border-subtle);
          border-bottom: 1px solid var(--adv-border-subtle);
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          font-family: 'Geist Mono', monospace;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--adv-teal);
        }

        .stat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--adv-text-dim);
          margin-top: 2px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper::before {
          content: '>';
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--adv-copper);
          font-family: 'Geist Mono', monospace;
          font-size: 14px;
        }

        .adv-input {
          width: 100%;
          padding: 14px 14px 14px 32px;
          background: var(--adv-bg);
          border: 1px solid var(--adv-border);
          border-radius: 8px;
          color: var(--adv-text);
          font-family: 'Geist Mono', monospace;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .adv-input:focus {
          outline: none;
          border-color: var(--adv-copper);
          box-shadow: 0 0 0 3px var(--adv-copper-glow);
        }

        .adv-input::placeholder {
          color: var(--adv-text-dim);
        }

        .adv-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--adv-copper) 0%, var(--adv-copper-dim) 100%);
          border: none;
          border-radius: 8px;
          color: var(--adv-bg);
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .adv-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .adv-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(212, 165, 116, 0.25);
        }

        .adv-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .skip-link {
          display: block;
          text-align: center;
          padding: 12px;
          color: var(--adv-text-dim);
          font-size: 12px;
          text-decoration: none;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .skip-link:hover {
          color: var(--adv-text-secondary);
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .topic-tag {
          padding: 8px 10px;
          background: var(--adv-bg);
          border: 1px solid var(--adv-border-subtle);
          border-radius: 6px;
          font-size: 11px;
          color: var(--adv-text-secondary);
          text-align: center;
        }

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}</style>

      <div className="adv-page flex items-center justify-center p-4 min-h-screen">
        <div className="grid-bg" />
        <div className="noise-overlay" />
        <div className="floating-element el-1" />
        <div className="floating-element el-2" />

        <div className="main-card w-full max-w-md relative z-10">
          <div className="p-8">
            <div className={`text-center mb-6 ${mounted ? 'fade-in delay-1' : 'opacity-0'}`}>
              <div className="badge mb-5">
                <span className="badge-dot" />
                Advanced Tutorial
              </div>

              <h1 className="heading mb-4">
                Claude Code<br />
                <em>Masterclass</em>
              </h1>

              <p style={{ color: 'var(--adv-text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                The complete advanced guide for Product Managers.<br />
                MCPs, workflows, automation &mdash; everything.
              </p>
            </div>

            <div className={`stat-row mb-6 ${mounted ? 'fade-in delay-2' : 'opacity-0'}`}>
              <div className="stat">
                <div className="stat-value">81</div>
                <div className="stat-label">Minutes</div>
              </div>
              <div className="stat">
                <div className="stat-value">30K+</div>
                <div className="stat-label">Ep. 1 Views</div>
              </div>
              <div className="stat">
                <div className="stat-value">19</div>
                <div className="stat-label">Topics</div>
              </div>
            </div>

            <div className={`topics-grid mb-6 ${mounted ? 'fade-in delay-3' : 'opacity-0'}`}>
              <div className="topic-tag">MCP Setup</div>
              <div className="topic-tag">Linear Integration</div>
              <div className="topic-tag">Custom Skills</div>
              <div className="topic-tag">Image Gen API</div>
              <div className="topic-tag">Hooks</div>
              <div className="topic-tag">GitHub Actions</div>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-3 ${mounted ? 'fade-in delay-4' : 'opacity-0'}`}>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="adv-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="adv-button"
              >
                {loading ? 'Processing...' : 'Get Demo Files'}
              </button>

              <p style={{
                fontSize: '11px',
                color: 'var(--adv-text-dim)',
                textAlign: 'center',
                marginTop: '8px'
              }}>
                Join{' '}
                <a
                  href="https://fullstack-pm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--adv-copper)', textDecoration: 'underline' }}
                >
                  The Full Stack PM
                </a>
                {' '}newsletter for PM builders
              </p>
            </form>

            <button
              onClick={handleSkip}
              className={`skip-link ${mounted ? 'fade-in delay-5' : 'opacity-0'}`}
            >
              skip &mdash; just show me the files
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
