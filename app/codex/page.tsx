'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Codex() {
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
            source: 'codex_demo_file'
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
              event_label: 'codex_landing_page'
            });
          }
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        alert('Network error: Could not submit email');
      }
    }

    router.push('/codex/instructions');
  };

  const handleSkip = () => {
    if (window.gtag) {
      window.gtag('event', 'skip_clicked', {
        event_category: 'engagement',
        event_label: 'codex_landing_page'
      });
    }
    router.push('/codex/instructions');
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Crimson+Pro:wght@400;600;700&display=swap');

        :root {
          --codex-bg: #0a0a0b;
          --codex-surface: #141416;
          --codex-border: #2a2a2e;
          --codex-amber: #f59e0b;
          --codex-amber-dim: #b45309;
          --codex-amber-glow: rgba(245, 158, 11, 0.15);
          --codex-text: #e4e4e7;
          --codex-text-dim: #71717a;
          --codex-green: #22c55e;
        }

        @keyframes terminalBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px var(--codex-amber-glow), inset 0 0 20px var(--codex-amber-glow); }
          50% { box-shadow: 0 0 40px var(--codex-amber-glow), inset 0 0 30px var(--codex-amber-glow); }
        }

        .codex-page {
          font-family: 'JetBrains Mono', monospace;
          background: var(--codex-bg);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .codex-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(245, 158, 11, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(245, 158, 11, 0.02) 0%, transparent 50%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.01) 2px,
              rgba(255, 255, 255, 0.01) 4px
            );
          pointer-events: none;
        }

        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to bottom, transparent, rgba(245, 158, 11, 0.1), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }

        .terminal-card {
          background: var(--codex-surface);
          border: 1px solid var(--codex-border);
          border-radius: 8px;
          animation: glowPulse 4s ease-in-out infinite;
        }

        .terminal-header {
          background: linear-gradient(to right, var(--codex-border), transparent);
          border-bottom: 1px solid var(--codex-border);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .heading-font {
          font-family: 'Crimson Pro', Georgia, serif;
        }

        .cursor-blink::after {
          content: '▊';
          animation: terminalBlink 1s step-end infinite;
          color: var(--codex-amber);
          margin-left: 2px;
        }

        .amber-input {
          background: rgba(245, 158, 11, 0.05);
          border: 1px solid var(--codex-border);
          color: var(--codex-text);
          transition: all 0.3s ease;
        }

        .amber-input:focus {
          border-color: var(--codex-amber);
          box-shadow: 0 0 0 3px var(--codex-amber-glow);
          outline: none;
        }

        .amber-input::placeholder {
          color: var(--codex-text-dim);
        }

        .amber-button {
          background: linear-gradient(135deg, var(--codex-amber) 0%, var(--codex-amber-dim) 100%);
          color: var(--codex-bg);
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .amber-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .amber-button:hover::before {
          left: 100%;
        }

        .amber-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
        }

        .amber-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}</style>

      <div className="codex-page flex items-center justify-center p-4">
        <div className="scanline" />

        <div className="terminal-card w-full max-w-lg">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#ff5f57' }} />
            <div className="terminal-dot" style={{ background: '#febc2e' }} />
            <div className="terminal-dot" style={{ background: '#28c840' }} />
            <span className="text-xs ml-3" style={{ color: 'var(--codex-text-dim)' }}>
              codex@fullstack-pm ~ $
            </span>
          </div>

          <div className="p-8">
            <div className={`text-center mb-8 ${mounted ? 'fade-in-up delay-1' : 'opacity-0'}`}>
              <div
                className="inline-block px-3 py-1 rounded text-xs mb-4"
                style={{
                  background: 'var(--codex-amber-glow)',
                  color: 'var(--codex-amber)',
                  border: '1px solid var(--codex-amber-dim)'
                }}
              >
                <span style={{ color: 'var(--codex-green)' }}>●</span> READY
              </div>

              <h1
                className="heading-font text-4xl font-bold mb-3"
                style={{ color: 'var(--codex-text)' }}
              >
                Get the Codex<br />
                <span style={{ color: 'var(--codex-amber)' }}>Demo Files</span>
              </h1>

              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--codex-text-dim)' }}
              >
                <span className="cursor-blink">Enter your email to get instant access</span>
                <br />
                to the demo files from{' '}
                <a
                  href="https://youtu.be/NYSZ4g7igDg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline transition-all"
                  style={{ color: 'var(--codex-amber)' }}
                >
                  the Codex video
                </a>
                <br />
                on Aakash Gupta&apos;s Product Growth.
              </p>
              <p
                className="text-sm leading-relaxed mt-3"
                style={{ color: 'var(--codex-text-dim)' }}
              >
                You&apos;ll also join{' '}
                <a
                  href="https://fullstack-pm.com/p/carl-s-newsletter-is-dead-welcome-to-the-full-stack-pm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline transition-all"
                  style={{ color: 'var(--codex-amber)' }}
                >
                  The Full Stack PM
                </a>
                {' '}&mdash;{' '}Carl&apos;s newsletter for PM builders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-4 ${mounted ? 'fade-in-up delay-2' : 'opacity-0'}`}>
              <div>
                <label
                  className="block text-xs mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--codex-text-dim)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="amber-input w-full px-4 py-3 rounded text-sm"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="amber-button w-full py-3 rounded text-sm uppercase tracking-wider"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <span>→ Subscribe & Access Files</span>
                )}
              </button>
            </form>

            <button
              onClick={handleSkip}
              className={`w-full mt-4 py-2 text-sm transition-colors ${mounted ? 'fade-in-up delay-3' : 'opacity-0'}`}
              style={{ color: 'var(--codex-text-dim)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--codex-text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--codex-text-dim)'}
            >
              skip --force
            </button>

            <div
              className={`mt-6 pt-6 text-center text-xs ${mounted ? 'fade-in-up delay-4' : 'opacity-0'}`}
              style={{
                borderTop: '1px solid var(--codex-border)',
                color: 'var(--codex-text-dim)'
              }}
            >
              <code>$ codex --yolo</code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
