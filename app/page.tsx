'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email) {
      try {
        const response = await fetch('/api/submit-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('Error submitting email:', data);
          alert(`Error: ${data.message || 'Failed to submit email'}`);
        } else {
          // Track email submission event
          if (window.gtag) {
            window.gtag('event', 'email_submitted', {
              event_category: 'engagement',
              event_label: 'landing_page'
            });
          }
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        alert('Network error: Could not submit email');
      }
    }

    router.push('/instructions');
  };

  const handleSkip = () => {
    // Track skip event
    if (window.gtag) {
      window.gtag('event', 'skip_clicked', {
        event_category: 'engagement',
        event_label: 'landing_page'
      });
    }
    router.push('/instructions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Get the Claude Code Demo Files
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your email below to subscribe to{' '}
            <a 
              href="https://fullstack-pm.com/p/carl-s-newsletter-is-dead-welcome-to-the-full-stack-pm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 font-medium underline"
            >
              The Full Stack PM
            </a>
            , Carl&apos;s community and newsletter for PM builders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Subscribe and get the guide'}
          </button>
        </form>

        <button
          onClick={handleSkip}
          className="w-full mt-4 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

