# React TypeScript Login Sample Project

This project demonstrates a structured React application with TypeScript, implementing a login functionality using the DummyJSON API.

## Project Structure

The project follows a feature-based structure with clean separation of concerns:

```
my-app/
├── public/                        # Static files
│   └── index.html
├── src/
│   ├── assets/                   # Static resources: images, icons, fonts
│   │   ├── images/
             ├── flags/
│   │        └──avatars
│   │   └── icons/
│
│   ├── components/               # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   └── ...
│
│   ├── features/                 # Feature-based folders
│   │   ├── auth/                 # Feature: Authentication
│   │   │   ├── components/       # Feature-specific components
│   │   │   ├── pages/            # Feature-specific pages
│   │   │   ├── api.ts            # API calls
│   │   │   ├── slice.ts          # Redux slice
│   │   │   ├── types.ts
│   │   │   └── index.ts
│
│   ├── pages/                    # Page-level components
│   │   ├── Dashboard.tsx
│   │   └── ...
│
│   ├── routes/                   # Route configuration
│   │   └── AppRoutes.tsx
│
│   ├── hooks/                    # Custom React hooks
│   │   └── useDebounce.ts
│
│   ├── services/                 # Global API services
│   │   ├── axios.ts
│   │   └── authService.ts
│
│   ├── store/                    # Global state management
│   │   ├── index.ts
│   │   └── rootReducer.ts
│
│   ├── types/                    # Global TypeScript types
│   ├── utils/                    # Helper functions
│   ├── animations/               # Animation definitions
│
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
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Authentication

This project uses the DummyJSON API for authentication. For testing purposes, you can use:

- Username: `emilys`
- Password: `emilyspass`

## Features

- User authentication with JWT
- Form validation
- Protected routes
- Responsive UI with Tailwind CSS
- Animations with Framer Motion
- TypeScript for type safety
