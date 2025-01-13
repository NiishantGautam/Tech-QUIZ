# Tech-QUIZ Mobile App

A modern quiz application built with React Native and Expo, featuring authentication, interactive learning, flashcards, and progress tracking.

## Demo

### V0.1 Demo
![Tech-QUIZ App V0.1 Demo](https://file.notion.so/f/f/6c0da47d-0ecd-43be-af30-cfa44ecc34ee/9f81a200-78c9-4682-92bb-29bac07066e1/demo.gif?table=block&id=17a16628-2d07-807e-8440-d3642f70e290&spaceId=6c0da47d-0ecd-43be-af30-cfa44ecc34ee&expirationTimestamp=1736755200000&signature=z4Ons8jvIfuECvEg1yFvcpQ_X2vU8DZ1CaBoxVqWyZw&downloadName=demo.gif)

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
│   ├── features/
│   │   └── flashcards/             # Flashcard feature module
│   │       ├── components/         # Flashcard-specific components
│   │       ├── data/              # Mock data and constants
│   │       ├── routes/            # Route components
│   │       ├── screens/           # Flashcard screens
│   │       └── types/             # TypeScript interfaces
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

## Features

### Core Features
- Authentication with email verification
- Dynamic content loading via Notion API
- Interactive learning modules
- Progress tracking
- Dark mode support
- Modern UI with consistent theming

### Flashcards
- Browse and search through flashcard decks by topics
- Interactive flashcard review system with flip animation
- Topic organization (Development, Project Management, Science)
- Search functionality by title or tags
- Consistent menu integration

## Types

### FlashcardDeck

```typescript
interface FlashcardDeck {
  id: string;
  title: string;
  tags: string[];
  count: number;
  color: string;
}
```

### Flashcard

```typescript
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  deckId: string;
}
```

## Changelog

### Version 0.2.1 (2025-01-12)

#### Added
- Flashcards feature with deck management
- Interactive card review system
- Topic-based organization
- Search functionality for flashcard decks
- Responsive flashcard UI with animations

### Version 0.2.0 (2025-01-11)

#### Added
- Notion API integration for dynamic content
- Dark mode support with toggle
- Chapter content rendering with multiple block types
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
- Basic quiz interface structure
- Responsive layouts for all screens
- Modern UI components and styling

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

## Future Improvements

- [ ] Add user progress tracking for flashcards
- [ ] Implement spaced repetition algorithm
- [ ] Add deck creation and editing functionality
- [ ] Support for rich media in flashcards (images, code snippets)
- [ ] Add offline support
- [ ] Implement deck sharing functionality

## Contributing

Feel free to submit issues and enhancement requests.
