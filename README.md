<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
BookIt — Travel & Experience Booking Platform

A modern, responsive web application that allows users to discover, explore, and book curated travel experiences.
Built with React + TypeScript + Tailwind CSS, powered by an Express + MongoDB backend.

Features

 Browse & search curated travel experiences
 Detailed experience pages with date/time slot selection
 Smart checkout flow with promo code validation
 Secure booking confirmation & summary page
 Fully responsive — optimized for all devices
 Modern UI with Tailwind CSS and clean card layouts

Tech Stack
  Frontend:
   React (with TypeScript)
   Tailwind CSS
   Axios for API calls
   React Router DOM for navigation

Backend:
 Express.js
 MongoDB with Mongoose
 RESTful APIs for experiences, promos & bookings

Folder Structure
bookit/
├─ src/
│   ├─ components/          # Reusable UI components (Navbar, ExperienceCard, etc.)
│   ├─ lib/                 # API configuration (Axios instance)
│   ├─ pages/               # Main app pages (MainPage, DetailsPage, CheckoutPage)
│   ├─ assets/              # Images & static files
│   ├─ index.css            # Tailwind global styles
│   └─ main.tsx             # Entry point
└─ package.json

 Setup Instructions
 Frontend Setup
# Clone the repository
git clone https://github.com/Hariharan1645/bookit.git
cd bookit

# Install dependencies
npm install

# Start the development server
npm run dev


Frontend runs by default on:
 http://localhost:5173

 Backend Setup (separate)
cd backend
npm install
npm start

Backend runs on:
 http://localhost:5000

Make sure to set your .env file with:
MONGO_URI=your_mongodb_connection_string
PORT=5000

 Environment Variables
Frontend .env example:
VITE_API_BASE_URL=http://localhost:5000/api

 Screenshots
 Home / Main Page
  Grid-based layout with responsive experience cards
  
 Search Page
  Dynamic search results based on query

 Details Page
  Select date, time, and quantity before checkout

 Checkout Page
  Promo code validation, form validation, and total calculation

 Future Improvements
  Add user authentication (Login/Signup)
  Integrate payment gateway (Stripe/Razorpay)
  Admin panel for experience & booking management
  Reviews and rating system

Contributing
  Pull requests are welcome!
  If you'd like to contribute:

Fork the repo
Create your feature branch
Commit your changes
Push and open a pull request
License
This project is licensed under the MIT License — free to use and modify.
>>>>>>> b7e1b95235990980ad83d5b315def9e978cfe0f7
