GitHub Profile Explorer

Async State Management with Redux Thunk & RTK Query

A modern React application that demonstrates advanced async state management by fetching GitHub user profiles and repositories using Redux Thunk and RTK Query, with live typing, caching, animations, and data visualization.

Why This Project Exists (Straight Talk)

Most Redux demos stop at fetch → dispatch → store.

This project goes further:

Compares manual async control (Thunk) vs automatic caching (RTK Query)

Shows real-world async UX problems (debouncing, race conditions, UI replacement)

Implements live typing fetch, not button-based fetching

Demonstrates cache behavior visually

This is not a toy app. It’s an async architecture showcase.

Features
Async State Management

Redux Thunk (manual async actions)

RTK Query (automatic fetching, caching, deduplication)

Live Typing Fetch

Profile updates as you type

Debounced input to avoid API abuse

Smooth animated replacement (no flicker, no layout break)

GitHub Data

User profile (avatar, followers, repos)

Repository list with:

Stars

Language badges

Data Visualization

Repository language distribution chart (Recharts)

UI / UX

Tailwind CSS (fully responsive)

Framer Motion animations

Mode switcher (RTK Query ↔ Redux Thunk)

Clean dark UI

Tech Stack

React

Redux Toolkit

Redux Thunk

RTK Query

Tailwind CSS

Framer Motion

Recharts

GitHub REST API

Project Structure
src/
├── app/
│   └── store.js
├── components/
│   ├── GithubProfileRTK.js
│   ├── GithubProfileThunk.js
│   ├── RepoStatsChart.js
├── services/
│   └── githubApi.js
├── features/
│   └── github/
│       └── githubSlice.js
├── App.js
├── index.js
└── index.css

RTK Query:

Checks cache

Fetches if needed

Updates UI automatically

Redux Thunk Flow

User types username

Dispatch async thunk

Manually handle:

loading

success

error

state reset

📸 Screenshots

screenshots/
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/faf46a93-29f2-4db5-a4fd-a7b645e1e8bd" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/bdd80b11-bc2a-4cd2-9cc0-2ea658d1ad9f" />




Installation & Run
git clone https://github.com/your-username/github-profile-explorer
cd github-profile-explorer
npm install
npm start

 Notes

GitHub API is rate-limited for unauthenticated requests

Excessive typing may hit limits (debounce is applied)

Best tested with public GitHub usernames

Learning Outcomes

By building this project, you learn:

When NOT to use Redux Thunk

Why RTK Query is preferred for server state

How caching changes app architecture

How to animate async UI safely

How real async bugs happen and how to fix them
Author

Badar
Full-Stack Developer
Focused on scalable frontend architecture and async systems
