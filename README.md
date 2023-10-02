# Dideals
<img width="1791" alt="Dideals screenshot" src="https://github.com/v-sudo29/steam_games/assets/117846985/190ca433-52cc-4159-bbd7-3ea60fa09623">

## Introduction
**Dideals** is a **full-stack web application** that provides a user-friendly interface for browsing discounted Steam games. Built entirely from scratch, it scrapes the Steam store twice daily to retrieve the latest deals and presents them in a clean, streamlined way for easy discovery.

## Live Demo
[Deployed Link](https://steam-discounts.onrender.com/)

## Key Features
- Intuitive UI with sorting, filtering, and search to easily find discounted games
- Regularly updated database of Steam discounts extracted via web scraping
- Modern interface optimized for showcasing games and prices
- Backend API and database for persisting scraped data

## Technology
- [React](https://react.dev/) front-end with [ChakraUI](https://chakra-ui.com/) for styling
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/) backend
- [MongoDB](https://www.mongodb.com/) database
- [Puppeteer](https://pptr.dev/) headless browser for web scraping
- [Cron](https://www.npmjs.com/package/cron) job to run Puppeteer scraping script twice daily, keeping game data up-to-date
- [Google Analytics](https://marketingplatform.google.com/about/analytics/) for web traffic analytics

## What I Learned
- How to **automate web scraping** using cron jobs to run scripts on a schedule
- Using ChakraUI for styling and **leveraging its out-of-the-box accessibility**
- **Persisting state** in the frontend using local storage
- **Implementing standard path params** in the URL for routing
- Utilizing Figma to **view prototypes for animated UI transitions**
- Using Google Analytics with Google Tag Manager integration to **track site usage metrics**

## Contributors
Made with ❤️ by [Victoria Nguyen](https://github.com/v-sudo29)
