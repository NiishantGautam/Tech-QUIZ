# Tech-QUIZ Mobile App

A modern quiz application built with React Native and Expo, featuring authentication, interactive learning, and progress tracking.

## Demo

![Tech-QUIZ App Demo](assets/area.gif)

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
│   │   ├── chapter.tsx             # Chapter content display
│   │   └── _layout.tsx             # Root layout
│   ├── components/
│   │   ├── ExploreCard.tsx         # Explore chapters component
│   │   ├── Menu.tsx                # Navigation menu
│   │   └── StickyHeader.tsx        # Chapter header with Notion content
│   ├── constants/
│   │   └── theme.ts                # Theme configuration
│   ├── services/
│   │   ├── notion-api.ts           # Notion integration service
│   │   └── posthog.ts              # Analytics service
│   └── utils/
│       └── cache.ts                # Token caching utilities
├── assets/                         # Images and static assets
├── .env                           # Environment variables
├── app.json                       # Expo configuration
├── package.json
└── README.md
```

## Changelog

### Version 0.2.0 (2025-01-11)

#### Added
- Notion API integration for dynamic content
- Dark mode support with toggle
- Chapter content rendering with multiple block types
  - Text blocks with formatting
  - Image blocks with captions
  - Code blocks with syntax highlighting
- New ExploreCard component for chapter navigation
- Custom StickyHeader component with progress tracking

#### Enhanced
- Improved error handling and loading states
- Better TypeScript type definitions
- Modern UI with consistent theming
- Responsive layout improvements
- Code organization and structure

#### Technical
- Enabled React Native New Architecture
- Removed @notionhq/client dependency for lighter bundle
- Implemented direct Notion REST API integration
- Added proper error boundaries
- Enhanced component props interfaces

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
   - Add your keys:
     ```
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
     EXPO_PUBLIC_NOTION_API_KEY=your_notion_key
     EXPO_PUBLIC_NOTION_PAGE_ID=your_notion_page_id
     ```
4. Start the development server:
   ```bash
   npx expo start
   ```

## Contributing

Feel free to submit issues and enhancement requests.
