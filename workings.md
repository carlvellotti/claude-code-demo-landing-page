# How This Landing Page Works

A comprehensive guide to the Claude Code Demo Landing Page architecture and implementation.

---

## 🌐 Live URLs

- **Landing Page:** https://claude-code-demo-landing-page.vercel.app
- **Instructions Page:** https://claude-code-demo-landing-page.vercel.app/instructions
- **View Emails (Admin):** https://claude-code-demo-landing-page.vercel.app/api/admin
- **GitHub Repository:** https://github.com/carlvellotti/claude-code-demo-landing-page

---

## 📚 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **Next.js API Routes** - Serverless functions
- **Vercel Postgres (Neon)** - Database
- **Vercel** - Hosting & deployment

### Analytics
- **Google Analytics 4** - Custom event tracking
- **Vercel Analytics** - Page view tracking

### DevOps
- **GitHub** - Version control
- **Vercel CLI** - Deployment
- **GitHub → Vercel** - Auto-deployment pipeline

---

## 📁 Project Structure

```
claude-code-demo-landing-page/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── route.ts          # GET /api/admin - View all emails
│   │   └── submit-email/
│   │       └── route.ts           # POST /api/submit-email - Save emails
│   ├── components/
│   │   └── GoogleAnalytics.tsx   # GA4 tracking component
│   ├── hooks/
│   │   └── useScrollDepth.ts     # Scroll depth tracking hook
│   ├── instructions/
│   │   └── page.tsx               # Tutorial instructions page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout (includes analytics)
│   └── page.tsx                   # Landing page with email form
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── workings.md                    # This file
```

---

## 🔧 How Each Feature Works

### 1. **Landing Page (`app/page.tsx`)**

**What it does:**
- Collects user emails
- Tracks "email submitted" or "skip clicked" events
- Redirects to instructions page

**Key code:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // Sends email + source to API
  await fetch('/api/submit-email', {
    method: 'POST',
    body: JSON.stringify({ 
      email,
      source: 'claude_code_demo_file' // Tracks which landing page
    }),
  });
  
  // Track in Google Analytics
  window.gtag('event', 'email_submitted', {...});
  
  // Navigate to instructions
  router.push('/instructions');
};
```

---

### 2. **Submit Email API (`app/api/submit-email/route.ts`)**

**What it does:**
- Receives email and source from frontend
- Creates/updates database table with source column
- Stores email in Neon Postgres
- Prevents duplicates (unique email constraint)

**Database schema:**
```sql
CREATE TABLE IF NOT EXISTS emails (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100),              -- NEW: tracks landing page source
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key features:**
- ✅ Auto-creates table if it doesn't exist
- ✅ Auto-adds `source` column to existing tables
- ✅ Prevents duplicate emails (`ON CONFLICT DO NOTHING`)
- ✅ Returns success status

---

### 3. **Admin Endpoint (`app/api/admin/route.ts`)**

**What it does:**
- Returns all emails from database as JSON
- No authentication (add if needed for production)
- Prevents caching to show real-time data

**Usage:**
```bash
curl https://claude-code-demo-landing-page.vercel.app/api/admin
```

**Response:**
```json
{
  "success": true,
  "count": 25,
  "emails": [
    {
      "id": 28,
      "email": "user@example.com",
      "source": "claude_code_demo_file",
      "created_at": "2025-10-10T01:07:26.480Z"
    },
    ...
  ],
  "timestamp": "2025-10-10T01:07:35.216Z"
}
```

**Security note:** This endpoint is currently public. For production, add authentication:
```typescript
// Example: Add basic auth
const authHeader = request.headers.get('authorization');
if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

### 4. **Google Analytics Tracking**

**Setup:**
- Component: `app/components/GoogleAnalytics.tsx`
- Measurement ID: `G-4Y6M2WXPXV`
- Configured in: `app/layout.tsx`

**Events tracked:**

| Event | Trigger | Location | Data |
|-------|---------|----------|------|
| `email_submitted` | User submits email | Landing page | `event_category: engagement` |
| `skip_clicked` | User clicks "Skip for now" | Landing page | `event_category: engagement` |
| `scroll_depth` | User scrolls 25%, 50%, 75%, 100% | Instructions page | `value: percentage` |
| `video_play` | User plays YouTube video | Instructions page | `event_label: demo_video` |
| `github_click` | User clicks GitHub link | Instructions page | `event_label: top_section` or `bottom_cta` |

**How to view:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. **Reports → Engagement → Events**

---

### 5. **Vercel Analytics**

**Setup:**
- Package: `@vercel/analytics`
- Component: `<Analytics />` in `app/layout.tsx`
- Auto-enabled on Vercel

**What it tracks:**
- Page views (automatic)
- Top pages
- Visitor counts
- Real-time traffic

**How to view:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **Analytics** tab

---

### 6. **Scroll Depth Tracking (`app/hooks/useScrollDepth.ts`)**

**What it does:**
- Tracks when users scroll to 25%, 50%, 75%, 100% of page
- Fires once per milestone (uses Set to track)
- Sends event to Google Analytics

**Usage:**
```typescript
import { useScrollDepth } from '../hooks/useScrollDepth';

export default function Page() {
  useScrollDepth(); // That's it!
  return <div>Your content</div>;
}
```

---

## 🗄️ Database (Neon Postgres)

### Connection
- **Provider:** Vercel Postgres (powered by Neon)
- **Connection:** Automatic via `@vercel/postgres`
- **Environment Variable:** `POSTGRES_URL` (set in Vercel)

### Schema
```sql
CREATE TABLE emails (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Query Examples

**Get all emails:**
```sql
SELECT * FROM emails ORDER BY created_at DESC;
```

**Count by source:**
```sql
SELECT source, COUNT(*) as count 
FROM emails 
GROUP BY source;
```

**Recent signups:**
```sql
SELECT * FROM emails 
WHERE created_at > NOW() - INTERVAL '7 days';
```

---

## 🔑 Environment Variables

### Required for Production

Create in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_GA_ID` | `G-4Y6M2WXPXV` | Google Analytics measurement ID |
| `POSTGRES_URL` | (auto-set by Vercel) | Database connection string |

### Local Development

Create `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-4Y6M2WXPXV
# POSTGRES_URL is auto-provided by Vercel CLI
```

**Note:** `.env.local` is gitignored for security

---

## 🚀 Deployment

### Initial Setup (Already Done)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Current Workflow (Auto-Deploy)
```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel auto-deploys! 🎉
```

**Connected:**
- GitHub repo → Vercel project
- Every push to `main` → automatic production deployment

---

## 📈 How to Scale: Adding More Landing Pages

### Example: Add a "Product Demo" Landing Page

**1. Create new page:**
```typescript
// app/product-demo/page.tsx
export default function ProductDemo() {
  const handleSubmit = async (email) => {
    await fetch('/api/submit-email', {
      method: 'POST',
      body: JSON.stringify({ 
        email,
        source: 'product_demo_page' // Different source!
      }),
    });
  };
  // ... rest of page
}
```

**2. Analytics automatically track:**
- Page views at `/product-demo`
- All events you add

**3. Query by source:**
```sql
SELECT source, COUNT(*) FROM emails GROUP BY source;

-- Results:
-- claude_code_demo_file: 45
-- product_demo_page: 23
```

### What You Get For Free:
✅ Database (already set up)  
✅ API endpoints (already built)  
✅ Google Analytics (auto-tracks new pages)  
✅ Vercel Analytics (auto-tracks new pages)  
✅ Deployment (same pipeline)  

**Only need:** New page design + unique `source` value

---

## 🛠️ Local Development

### First Time Setup
```bash
# Clone
git clone https://github.com/carlvellotti/claude-code-demo-landing-page.git
cd claude-code-demo-landing-page

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_GA_ID=G-4Y6M2WXPXV" > .env.local

# Link to Vercel (for database access)
vercel link

# Run locally
npm run dev
```

### Development Workflow
```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Make changes (hot reload enabled)

# When ready to deploy
git add .
git commit -m "Your changes"
git push  # Auto-deploys to production
```

---

## 🔒 Security Considerations

### Current State
⚠️ **Admin endpoint is public** - anyone can view all emails

### Recommended Improvements for Production

**1. Add authentication to admin endpoint:**
```typescript
// app/api/admin/route.ts
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of code
}
```

**2. Rate limiting:**
Use Vercel's built-in rate limiting or add middleware

**3. Email validation:**
Already done on client, could add server-side regex validation

**4. GDPR compliance:**
- Add privacy policy link
- Add "unsubscribe" mechanism
- Store consent timestamp

---

## 📊 Analytics Insights

### What You Can Learn

**Conversion funnel:**
1. Landing page views
2. Email submissions vs. Skip clicks
3. Instructions page views
4. Scroll depth on instructions
5. GitHub link clicks

**Key metrics:**
- **Conversion rate:** `emails_submitted / landing_page_views`
- **Engagement:** Scroll depth percentages
- **CTA effectiveness:** Top GitHub link vs. bottom CTA
- **Video interest:** Video play rate

**Google Analytics custom reports:**
- Compare different landing page sources
- Track user journey through pages
- Analyze drop-off points

---

## 🐛 Troubleshooting

### Emails not appearing in database
1. Check Vercel deployment logs
2. Check browser console for API errors
3. Verify `POSTGRES_URL` is set in Vercel
4. Hit `/api/admin` to check database connection

### Google Analytics not tracking
1. Verify `NEXT_PUBLIC_GA_ID` is set
2. Check browser console for `gtag` calls
3. GA4 data can take 24-48 hours to appear
4. Use GA4 DebugView for real-time testing

### Deployment issues
1. Check Vercel dashboard for build errors
2. Verify all env variables are set
3. Check GitHub Actions (if enabled)

---

## 📝 Future Enhancements

### Easy Additions
- [ ] Add admin dashboard UI (instead of JSON endpoint)
- [ ] Export emails to CSV
- [ ] Email validation with external service
- [ ] UTM parameter tracking
- [ ] A/B testing different landing page copy

### Medium Complexity
- [ ] Email drip campaign integration (SendGrid, Mailchimp)
- [ ] Advanced analytics dashboard
- [ ] User authentication for admin
- [ ] Multiple language support

### Advanced
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Machine learning for conversion optimization
- [ ] Real-time admin notifications

---

## 📞 Support

**Built by:** Claude (Anthropic) + Carl Vellotti  
**Repository:** https://github.com/carlvellotti/claude-code-demo-landing-page  
**Tutorial Repo:** https://github.com/carlvellotti/claude-code-pm-demo  

---

**Last Updated:** October 2025

