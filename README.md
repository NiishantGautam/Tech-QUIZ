# Tech-QUIZ Mobile App

A modern quiz application built with React Native and Expo, featuring authentication, interactive learning, flashcards, and progress tracking.

## Demo

### V0.1 Demo
[Click here to view the Tech-QUIZ App Demo](https://file.notion.so/f/f/6c0da47d-0ecd-43be-af30-cfa44ecc34ee/9f81a200-78c9-4682-92bb-29bac07066e1/demo.gif?table=block&id=17a16628-2d07-807e-8440-d3642f70e290&spaceId=6c0da47d-0ecd-43be-af30-cfa44ecc34ee&expirationTimestamp=1736755200000&signature=3Cb4crWYH5Pg-FGS_i3wkp6C0AZUlMvw7xVR4lYeKqk)

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
- [ ] Add offline support, and integrate RAG. 
- [ ] Implement deck sharing functionality

## Contributing

Feel free to submit issues and enhancement requests.
