# Recover

## Overview

- An AI-assisted mood tracker to help you move past addiction

### Problem

- It is difficult to change a habit, let alone one that has crossed over into addiction.
- Building self-awareness and being equipped to deal with cravings are crucial.
- Tracking, nudging, and gamification are helpful in sustainably changing behaviour.
- Addiction is a large, global problem that negatively impacts lives in many ways.

### User Profile

- As addiction can impact anyone, the app should be as inclusive as possible. The UI/UX should reflect this.
- I expect different features (see feature list below) to be used differently. Journalling might be more suited to tablet/desktop, while completing a mood questionnaire is suited to mobile.
- Building a React Native counterpart app after the bootcamp would be a natural extension.

### Features

As a user, I want to:

- Write journal entries
- Receive feedback/analysis based on my journal entries with behavioural recommendations
- Regularly complete questionnaires to track and visualise my mental state over time
- Record videos and voice notes as promises to my future self. These should be quickly accessible for when cravings hit!
- Receive gamified/positive reinforcement when I reach abstinence milestones.

### Tech Stack

- TypeScript
- React
- Next.js
- TailwindCSS
- NextAuth.js
- Prisma ORM
- PlanetScale
- Vercel

### APIs

- OpenAI's API will generate the behavioural recommendations based on the user's journal entries.

## Implementation

### Sitemap

- Auth
  - Sign up
  - Sign in
- On boarding
  - Collect basic data: name, substance of abuse, date of sobriety
  - set up reminders to journal/complete questionnaire
- Navigation between dashboard, journal, visualisations, and achievements pages
- Dashboard
  - Display current length of sobriety
  - CTA to start a new journal entry
  - CTA to fill out a questionnaire
  - Summary + link to data visualisations based on your questionnaires over time
  - Link to your 'SOS' package – media you've recorded to consume when cravings hit.
- Journal page
  - list of journal entries
    - individual journal entry page with section for AI analysis + advice
- Visualisations page
- Achievements / badges page with badges awarded for various milestones (e.g. 1 month, 3 months, 1 year etc.)

### Mockups

![home-page](./mockups/home-page.png)
![questionnaire](./mockups/questionnaire.png)

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

**GET /todos**

Lists all todo items.

```
[
    {
        id: "6d85ca35"
        text: "Go shopping",
        done: false
    },
]
```

### Database

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

## Refactors

- think about using middleware to protect routes

## TODO

- Tailwind typography to style OpenAI response
- Recharts for data visualisation
