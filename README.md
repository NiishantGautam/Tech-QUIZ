# Tech Quiz App

A React Native quiz application built with Expo, focusing on technical questions and clean architecture.

## Project Structure

```
src/
├── app/                    # Main application routes
│   ├── _layout.tsx        # Root layout with Stack navigation
│   ├── index.tsx          # Home screen
│   └── quiz.tsx           # Quiz screen
│
├── components/            # Reusable components
│   ├── ExploreCard.tsx
│   ├── PracticeCard.tsx
│   ├── ReviewCard.tsx
│   └── StreakCard.tsx
│
└── constants/            # Global constants and configurations
    └── theme.ts         # Theme configuration and colors
```

## Features

- File-based routing with Expo Router
- Modern UI with custom components
- Interactive cards with haptic feedback
- Consistent theming across the app
- Type-safe navigation
- Gesture-based navigation

## Tech Stack

- React Native with Expo
- TypeScript for type safety
- Expo Router for navigation
- Expo Haptics for tactile feedback
- ESLint & Prettier for code formatting
- Husky for pre-commit hooks

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
