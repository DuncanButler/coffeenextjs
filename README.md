# Coffee Tracker

## Introduction

This website has been built using Cursor, from prompts totally so far with little or no intervation from the developer other than adding prompts which are listed below, this repo is inspired by James Montemagno and his youtube video on copilot agent mode [Live Coding with Github Copilot](https://www.youtube.com/watch?v=XT_m3nua72E)

## Prompts given


1. lets create a website that can track my coffee intake, I should be able to see the count of coffees when I visit and be able to add a new coffee

2. thats great, ok I would like to change the coffee image to this one as it looks better C:\Users\dunca\source\learning\Cursor\coffeenextjs\public\coffee-clipart-39.jpg

3. when I add a coffee I would like to add the type of coffee it is (black, lattee, flat white) 

4. can we also store the date and time the coffee was had

5. can we store where the coffee came from, (home made, neros, costa, starbucks)

6. can we move the history to another page, and allow navigation to and from that page

7. when navigating between the pages the buttons and titles jump, and the "coffee tracker" title is no longer centered please center the titles and ensure the buttons and titles are on the same line on every page

8. I want the website to handle more than one uses coffee history, we need to have a login which will include social login if possible, any coffee added is added to the coffee cound for the user that is logged in

NOTE: from AI
First-time setup:
For social login to work fully, you'll need to register OAuth applications with GitHub and Google, and add your credentials to the .env.local file
For local testing, the app will work with the placeholder credentials but won't authenticate with real social accounts
Using the app:
Users first see the login page
After authentication, they see their personal coffee tracker
They can add coffees, specifying type and source
They can view their full history on a separate page
User data is isolated - each user only sees their own coffee entries
The app provides a complete multi-user coffee tracking experience while maintaining a clean, user-friendly interface.

9. On the coffee tracker page, can we hide the by type and  by source


## Below is the standard documentation for a Next JS app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
