# Tech-QUIZ Mobile App

A modern quiz application built with React Native and Expo, featuring authentication, interactive learning, and progress tracking.

## Project Structure

```
Tech-QUIZ/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx         # Auth layout configuration
│   │   │   ├── Onboarding.tsx      # Onboarding screens
│   │   │   ├── sign-in.tsx         # Sign in screen
│   │   │   └── sign-up.tsx         # Sign up screen
│   │   ├── (main)/
│   │   │   ├── _layout.tsx         # Main app layout
│   │   │   ├── index.tsx           # Home screen
│   │   │   └── quiz.tsx            # Quiz interface
│   │   └── _layout.tsx             # Root layout
│   └── utils/
│       └── cache.ts                 # Token caching utilities
├── assets/                          # Images and static assets
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

## Features

- **Authentication**
  - Email-based sign up and sign in
  - Email verification system
  - Secure token management
  - Password visibility toggle

- **Onboarding**
  - Interactive onboarding flow
  - Learning methodology introduction
  - Progress tracking preview

- **Main App**
  - Quiz interface
  - Progress tracking
  - User profile management

## Tech Stack

- React Native
- Expo Router
- Clerk Authentication
- Expo SecureStore
- TypeScript

## Changelog

### Version 0.1.0 (2025-01-08)

#### Added
- Initial project setup with Expo and React Native
- Authentication system using Clerk
- Onboarding screens with learning methodology
- Sign-in and sign-up screens with email verification
- Password visibility toggle with eye icon
- Token caching system
- Basic quiz interface structure
- Responsive layouts for all screens
- Modern UI components and styling

#### Enhanced
- Centered authentication forms
- Improved form validation and error handling
- Added loading states for better UX
- Implemented secure token storage
- Enhanced navigation flow
- Updated onboarding content with learning focus

#### Security
- Implemented secure password handling
- Added email verification system
- Secure token management
- Protected routes based on authentication state

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file
   - Add your Clerk publishable key:
     ```
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
     ```
4. Start the development server:
   ```bash
   npx expo start
   ```

## Contributing

Feel free to submit issues and enhancement requests.
