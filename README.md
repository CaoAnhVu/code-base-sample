# React TypeScript Login Sample Project

This project demonstrates a structured React application with TypeScript, implementing a login functionality using the DummyJSON API with internationalization (i18n) support.

## Project Structure

The project follows a feature-based structure with clean separation of concerns:

```
code-base-sample/
├── public/                       # Static files
├── src/
│   ├── assets/                   # Static resources: images, icons, fonts
│   │   └── images/
│   │       ├── flags/            # Flag icons for language switching
│   │       └── avatars/          # User avatars
│   ├── components/               # Reusable UI components
│   │   ├── Button/               # Button component
│   │   ├── LoginForm.tsx         # Form handling login functionality
│   │   ├── LanguageSwitcher.tsx  # Language selection component
│   │   └── FlagIcon.tsx          # Flag icon component for languages
│   ├── features/                 # Feature-based folders
│   │   └── auth/                 # Authentication feature
│   │       ├── components/       # Auth-specific components
│   │       ├── pages/            # Auth-specific pages
│   │       ├── api.ts            # Auth API calls
│   │       ├── slice.ts          # Redux auth slice
│   │       ├── types.ts          # Auth type definitions
│   │       └── index.ts          # Feature exports
│   ├── pages/                    # Page-level components
│   │   ├── LoginPage.tsx         # Login page
│   │   └── Dashboard.tsx         # Dashboard after login
│   ├── routes/                   # Route configuration
│   ├── hooks/                    # Custom React hooks
│   │   ├── useLocalStorage.ts    # Hook for handling localStorage
│   │   ├── useToast.ts           # Toast notification hook
│   │   └── useDebounce.ts        # Debounce input hook
│   ├── i18n/                     # Internationalization
│   │   ├── en.ts                 # English translations
│   │   ├── vi.ts                 # Vietnamese translations
│   │   ├── I18nProvider.tsx      # Translation provider
│   │   ├── I18nContext.tsx       # Translation context
│   │   ├── useI18n.tsx           # Hook for using translations
│   │   └── i18nUtils.ts          # Utility functions for i18n
│   ├── services/                 # Global API services
│   ├── store/                    # Redux store configuration
│   ├── types/                    # Global TypeScript types
│   ├── utils/                    # Helper functions
│   ├── animations/               # Animation definitions
│   ├── styles/                   # Global styles
│   ├── App.tsx                   # Main App component
│   └── main.tsx                  # Entry point
```

## Technologies Used

- **React**: UI library
- **TypeScript**: Static type checking
- **Redux Toolkit**: State management
- **React Router DOM**: Routing
- **Axios**: API requests
- **React Hook Form**: Form handling and validation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **i18n**: Internationalization with English and Vietnamese support

## Features

- **User Authentication**: Login with JWT using DummyJSON API
- **Internationalization**: Support for English and Vietnamese languages
- **Form Validation**: Comprehensive form validation with error messages
- **Password Strength Indicator**: Visual feedback on password security
- **Protected Routes**: Secure routes for authenticated users only
- **Responsive UI**: Mobile-friendly design with Tailwind CSS
- **Toast Notifications**: User feedback for actions and errors
- **LocalStorage Integration**: Remember login credentials
- **Quick Login**: Test account login option

## Authentication

The project uses the DummyJSON API for authentication. For testing purposes, you can use:

- Username: `emilys`
- Password: `emilyspass`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Visit `http://localhost:5173` in your browser

## Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build production-ready code
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview production build locally
