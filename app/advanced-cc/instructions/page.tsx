'use client';

import { useState } from 'react';

export default function AdvancedInstructions() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const resources = [
    { icon: '▶', label: 'Watch Video', sub: '81 min tutorial', href: 'https://www.youtube.com/watch?v=59gy_24KIVE' },
    { icon: '◈', label: 'GitHub Repo', sub: 'Demo files', href: 'https://github.com/carlvellotti/taskflow-calendar-demo' },
    { icon: '◉', label: 'Written Guide', sub: "Aakash's blog", href: 'https://www.news.aakashg.com/p/carl-vellotti-podcast-2' },
    { icon: '●', label: 'Follow Carl', sub: 'LinkedIn', href: 'https://linkedin.com/in/carlvellotti' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '48px 24px 32px',
        borderBottom: '1px solid #2a2a2a',
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          Setup <span style={{ color: '#f59e0b', fontStyle: 'italic' }}>Instructions</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Follow along with the Advanced Claude Code tutorial
        </p>
      </div>

      {/* Steps */}
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '32px 24px',
      }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              background: '#1f1f1f',
              border: '1px solid #333',
              borderRadius: '12px',
              marginBottom: '16px',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(217, 119, 6, 0.15)',
                border: '1px solid rgba(217, 119, 6, 0.3)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#f59e0b',
                flexShrink: 0,
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '4px',
                }}>
                  {step.title}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '13px',
                }}>
                  {step.description}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#141414',
              borderTop: '1px solid #2a2a2a',
              padding: '14px 20px',
            }}>
              <span style={{
                color: '#f59e0b',
                fontFamily: 'monospace',
                fontSize: '14px',
                flexShrink: 0,
              }}>$</span>
              <code style={{
                flex: 1,
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#9ca3af',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}>
                {step.code}
              </code>
              <button
                onClick={() => copyToClipboard(step.code, index)}
                style={{
                  padding: '6px 12px',
                  background: '#1f1f1f',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: copiedIndex === index ? '#22c55e' : '#6b7280',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {copiedIndex === index ? '✓ copied' : 'copy'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '0 24px 48px',
      }}>
        <div style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#6b7280',
          marginBottom: '16px',
        }}>
          Resources
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {resources.map((resource, i) => (
            <a
              key={i}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#1f1f1f',
                border: '1px solid #333',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '18px', color: '#f59e0b' }}>{resource.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                  {resource.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                }}>
                  {resource.sub}
                </div>
              </div>
              <span style={{ color: '#f59e0b', fontSize: '14px' }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
