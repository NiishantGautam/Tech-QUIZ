export interface FlashcardDeck {
  id: string;
  title: string;
  tags: string[];
  count: number;
  color: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  deckId: string;
}
