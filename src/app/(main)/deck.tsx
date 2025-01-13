import React from "react";
import { FlashcardReviewScreen } from "../../features/flashcards/screens/FlashcardReviewScreen";
import { useLocalSearchParams } from "expo-router";

export default function DeckScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  if (!deckId) {
    return null; // Or some error UI
  }

  return <FlashcardReviewScreen deckId={deckId} />;
}
