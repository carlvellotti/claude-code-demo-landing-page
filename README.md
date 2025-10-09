# Claude Code Demo Landing Page

A simple, beautiful landing page for the [Claude Code for Product Managers tutorial](https://github.com/carlvellotti/claude-code-pm-demo). Built with Next.js, it collects email addresses (optional) and provides step-by-step instructions for following the tutorial.

## Features

- ✨ Clean, modern UI with Tailwind CSS
- 📧 Optional email collection for tutorial updates
- 🗄️ Email storage with Vercel KV (Redis)
- 📚 Detailed tutorial instructions page
- 🚀 One-click deployment to Vercel
- 📱 Fully responsive design

## Deploy to Vercel

The easiest way to deploy this project:

1. **Click the Deploy Button:**

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/claude-code-demo-landing-page)

2. **Set up Vercel KV (Redis):**
   - After deployment, go to your project in Vercel
   - Navigate to the "Storage" tab
   - Click "Create Database"
   - Select "KV" (Redis)
   - Click "Create"
   - The environment variables will be automatically added to your project

3. **That's it!** Your landing page is live.

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/claude-code-demo-landing-page.git
   cd claude-code-demo-landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Vercel KV credentials (optional for local development)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
├── app/
│   ├── api/
│   │   └── submit-email/
│   │       └── route.ts          # API endpoint for email submission
│   ├── instructions/
│   │   └── page.tsx               # Instructions page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Customization

### Update the Content

- **Landing page:** Edit `app/page.tsx`
- **Instructions page:** Edit `app/instructions/page.tsx`
- **Metadata:** Edit `app/layout.tsx`

### Styling

This project uses Tailwind CSS. Customize the design by:
- Modifying classes in the components
- Updating `tailwind.config.ts` for theme changes

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Vercel KV (Redis)
- **Deployment:** Vercel

## License

MIT

