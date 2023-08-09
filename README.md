# Recover

An AI-assisted mood tracker to help you move past addiction. Write journal entries and receive feedback on your emotions and (gentle) behavioural recommendations. Review and visualise your mental state over time. Discover patterns, gain insights.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Built With

- TypeScript/React
- Nextjs
- TailwindCSS
- Postgres with Prisma

## Notes

- Initialise color scheme in `tailwind.config.js`
- Install `@headlessui/react` and `@headlessui/tailwindcss` plugin for accessible components
- Install and use class-variance-authority to define reusable button variants

## Refactors

- Don't have Button inside Link
- CSS variants with clsx etc. to avoid conflicts - DONE
- UI component folder instead of utils - DONE
- think about using middleware to protect routes
- look into react-hook-form
- dashboard home, cleanup fetching user data from db only once
- look out for Hamed's article on useTransition or look into server actions
