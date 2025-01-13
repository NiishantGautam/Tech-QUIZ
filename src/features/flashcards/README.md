# Flashcards Feature

This module contains all the code related to the flashcard functionality in the Tech-QUIZ app.

## Structure

```
flashcards/
├── components/       # Flashcard-specific components
├── data/            # Mock data and constants
│   └── index.ts     # Contains TOPICS and FLASHCARD_DECKS data
├── routes/          # Route components
│   └── deck.tsx     # Handles deck review routing
├── screens/         # Main screen components
│   ├── FlashcardListScreen.tsx   # Shows all available flashcard decks
│   └── FlashcardReviewScreen.tsx # Handles individual deck review
└── types/           # TypeScript interfaces
    └── index.ts     # Contains FlashcardDeck and Flashcard types
```

## Features

- **Deck List**: Browse and search through flashcard decks organized by topics
- **Deck Review**: Interactive flashcard review system with flip animation
- **Topic Organization**: Decks are organized by topics (Development, Project Management, Science)
- **Search Functionality**: Search decks by title or tags
- **Menu Integration**: Consistent menu system across screens

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

## Navigation

The feature uses expo-router for navigation. To navigate to a deck review:

```typescript
router.push({
  pathname: "/features/flashcards/routes/deck",
  params: { deckId },
});
```

## Styling

- Uses a dark theme with vibrant colors for each deck
- Consistent styling with the main app theme
- Responsive design that works across different screen sizes
- Interactive animations and haptic feedback for better UX

## Future Improvements

- [ ] Add user progress tracking
- [ ] Implement spaced repetition algorithm
- [ ] Add deck creation and editing functionality
- [ ] Support for rich media in flashcards (images, code snippets)
- [ ] Add offline support
- [ ] Implement deck sharing functionality
