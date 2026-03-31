'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function PMOSInstructions() {
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
                event_label: 'pm_os_demo_video'
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
        event_label: `pm_os_${location}`
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0b',
      color: '#fafafa',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: 'rgba(217, 119, 6, 0.15)',
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#f59e0b',
            marginBottom: '16px',
          }}>
            <span style={{ color: '#22c55e' }}>●</span> PM OPERATING SYSTEM
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '12px',
            lineHeight: '1.1',
          }}>
            The PM Operating System<br />
            <span style={{ color: '#f59e0b' }}>with Claude Code</span>
          </h1>
          <p style={{ color: '#71717a', fontSize: '18px', maxWidth: '600px' }}>
            Context management, sub-agents, self-checking skills, Jupyter notebooks — the full system that compounds daily.
          </p>
        </header>

        {/* Video */}
        <section style={{
          background: '#111113',
          border: '1px solid #27272a',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #27272a',
            background: '#18181b',
            fontSize: '12px',
            color: '#71717a',
          }}>
            // watch the tutorial
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px',
                }}
                src="https://www.youtube.com/embed/Eqh2iwSl570?enablejsapi=1"
                title="The PM Operating System with Claude Code"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section style={{
          background: 'linear-gradient(135deg, #18181b, #111113)',
          border: '1px solid #27272a',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #d97706, #b45309, transparent)',
          }} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Get Started</h3>
              <p style={{ color: '#71717a', fontSize: '14px' }}>
                Give this link to Claude Code and it will set everything up for you
              </p>
            </div>
            <div style={{
              background: '#000',
              border: '1px solid #27272a',
              borderRadius: '6px',
              padding: '14px 16px',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#22c55e',
              overflowX: 'auto',
            }}>
              https://github.com/carlvellotti/pg-carl-vellotti-master-cc
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/carlvellotti/pg-carl-vellotti-master-cc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGitHubClick('main_cta')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #d97706, #b45309)',
                  color: '#000',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                → View on GitHub
              </a>
              <a
                href="https://www.news.aakashg.com/p/carl-vellotti-3"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  color: '#a1a1aa',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  border: '1px solid #27272a',
                }}
              >
                Read the Written Guide
              </a>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section style={{
          background: '#111113',
          border: '1px solid #27272a',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid #27272a',
            background: '#18181b',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              padding: '4px 10px',
              background: '#f59e0b',
              color: '#000',
              borderRadius: '4px',
            }}>01</span>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>What You&apos;ll Learn</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}>
              {[
                { title: 'Context Management', items: ['Status line configuration', 'Sub-agents for context preservation', 'CLI vs MCP vs API hierarchy'] },
                { title: 'Skills & Automation', items: ['Custom slash commands', 'Tool-powered skills (Tavily, Puppeteer)', 'Auto-invoking hooks'] },
                { title: 'Data & The Operating System', items: ['Jupyter notebooks for data trust', 'Survey analysis with audit trails', 'Full PM operating system structure'] },
              ].map((section, i) => (
                <div key={i} style={{
                  background: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '6px',
                  padding: '16px',
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#f59e0b',
                    marginBottom: '12px',
                  }}>{section.title}</h4>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '16px',
                    fontSize: '13px',
                    color: '#a1a1aa',
                  }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ margin: '6px 0' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Chapters */}
        <section style={{
          background: '#111113',
          border: '1px solid #27272a',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid #27272a',
            background: '#18181b',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              padding: '4px 10px',
              background: '#f59e0b',
              color: '#000',
              borderRadius: '4px',
            }}>02</span>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Video Chapters</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '8px',
            }}>
              {[
                { time: '0:00', title: 'Intro' },
                { time: '1:40', title: 'Does Claude Code Still Matter?' },
                { time: '6:51', title: 'Context Status Line Setup' },
                { time: '12:03', title: 'Sub-Agents for Context' },
                { time: '17:49', title: 'Creating Skills Live' },
                { time: '23:58', title: 'The AskUserQuestions Tool' },
                { time: '33:33', title: 'Tool-Powered Skills' },
                { time: '36:57', title: 'CLI vs MCP vs API' },
                { time: '39:30', title: 'Make Slides with Puppeteer' },
                { time: '43:32', title: 'Auto-Invoking Skills with Hooks' },
                { time: '46:49', title: 'Jupyter Notebooks for Data Trust' },
                { time: '55:09', title: 'The Operating System' },
              ].map((chapter, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '6px',
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#22d3ee',
                    minWidth: '50px',
                  }}>{chapter.time}</span>
                  <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{chapter.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Repo Structure */}
        <section style={{
          background: '#111113',
          border: '1px solid #27272a',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid #27272a',
            background: '#18181b',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              padding: '4px 10px',
              background: '#f59e0b',
              color: '#000',
              borderRadius: '4px',
            }}>03</span>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Repo Structure</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{
              background: '#000',
              border: '1px solid #27272a',
              borderRadius: '6px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#71717a',
              lineHeight: '1.6',
              overflowX: 'auto',
            }}>
              <pre style={{ margin: 0 }}>{`├── CLAUDE.md             ← Entry point (Claude reads automatically)
├── GOALS.md              Identity, ownership, quarterly goals
├── .claude/skills/       /standup, /meeting-prep, /synthesize-research,
│                         /draft-prd-section, /weekly-update
│
├── Tasks/                Backlog → active → archive pipeline
├── Projects/             3 projects with briefs & outputs
├── Workflows/            Weekly update, quarterly planning, research
├── Meetings/             1:1s, standups, meeting notes
├── Knowledge/            People profiles, company ref, research
├── Templates/            PRD, brief, interview notes, weekly update
│
├── data/                 Survey dataset (212 responses)
└── DEMO-GUIDE.md         Exact prompts from each section`}</pre>
            </div>
            <p style={{
              marginTop: '16px',
              fontSize: '14px',
              color: '#71717a',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '6px',
              padding: '12px 16px',
            }}>
              <strong style={{ color: '#22c55e' }}>Tip:</strong> Clone it, run <code style={{ background: '#18181b', padding: '2px 6px', borderRadius: '4px' }}>claude</code> — it reads <code style={{ background: '#18181b', padding: '2px 6px', borderRadius: '4px' }}>CLAUDE.md</code> automatically and the whole workspace just works. Follow <code style={{ background: '#18181b', padding: '2px 6px', borderRadius: '4px' }}>DEMO-GUIDE.md</code> for the exact prompts from the episode. Want a blank template? Fork <a href="https://github.com/carlvellotti/carls-product-os" target="_blank" rel="noopener noreferrer" style={{ color: '#f59e0b', textDecoration: 'underline' }}>carls-product-os</a>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15), rgba(217, 119, 6, 0.05))',
          border: '1px solid #b45309',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Ready to build your OS?</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '24px' }}>Clone the repo and start using it today.</p>
          <a
            href="https://github.com/carlvellotti/pg-carl-vellotti-master-cc"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGitHubClick('bottom_cta')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #d97706, #b45309)',
              color: '#000',
              padding: '14px 28px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            → View on GitHub
          </a>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center' }}>
          <a
            href="/pm-os"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#71717a',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              textDecoration: 'none',
              border: '1px solid #27272a',
            }}
          >
            ← back to home
          </a>
        </footer>

      </div>
    </div>
  );
}
