'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AdvancedClaudeCode() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#1f1f1f',
        borderRadius: '16px',
        border: '1px solid #333',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Header accent line */}
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, #d97706, #f59e0b, #d97706)',
        }} />

        <div style={{ padding: '32px' }}>
          {/* Badge */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(217, 119, 6, 0.15)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#f59e0b',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#22c55e',
                borderRadius: '50%',
              }} />
              Advanced Tutorial
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '12px',
            lineHeight: '1.2',
          }}>
            Claude Code<br />
            <span style={{ color: '#f59e0b', fontStyle: 'italic' }}>Masterclass</span>
          </h1>

          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '15px',
            marginBottom: '24px',
            lineHeight: '1.5',
          }}>
            The complete advanced guide for PMs.<br />
            MCPs, workflows, automation — everything.
          </p>

          {/* Form - moved up right after subhead */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <span style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#f59e0b',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}>&gt;</span>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 32px',
                  background: '#141414',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#000000',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Processing...' : 'Get Demo Files →'}
            </button>

            <p style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#6b7280',
              marginTop: '12px',
            }}>
              Join{' '}
              <a
                href="https://fullstack-pm.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f59e0b', textDecoration: 'underline' }}
              >
                The Full Stack PM
              </a>
              {' '}newsletter
            </p>

            <button
              type="button"
              onClick={handleSkip}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                fontSize: '13px',
                cursor: 'pointer',
                marginTop: '4px',
              }}
            >
              skip — just show me the files
            </button>
          </form>

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            padding: '20px 0',
            borderTop: '1px solid #333',
            borderBottom: '1px solid #333',
            marginBottom: '24px',
          }}>
            {[
              { value: '81', label: 'Minutes' },
              { value: '30K+', label: 'Ep 1 Views' },
              { value: '12', label: 'Topics' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#22d3ee',
                  fontFamily: 'monospace',
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
          }}>
            {['MCP Setup', 'Linear Integration', 'Custom Skills', 'Image Gen API', 'Hooks', 'GitHub Actions'].map((topic, i) => (
              <div key={i} style={{
                padding: '10px 12px',
                background: '#141414',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#a1a1aa',
                textAlign: 'center',
              }}>{topic}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
