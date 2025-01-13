import { FlashcardDeck } from "../types";

export const TOPICS: Record<string, string[]> = {
  Development: ["flutter", "git"],
  "Project Management": ["scrum"],
  Science: ["cell-bio"],
};

export const FLASHCARD_DECKS: FlashcardDeck[] = [
  {
    id: "flutter",
    title: "Flutter Ecosystem",
    tags: ["Flutter", "Framework", "Cross-Platform"],
    count: 15,
    color: "#0468D7",
  },
  {
    id: "git",
    title: "Get started with Git",
    tags: ["Git", "Versioning"],
    count: 12,
    color: "#2EA043",
  },
  {
    id: "scrum",
    title: "Scrum Foundations",
    tags: ["Agile", "Scrum"],
    count: 10,
    color: "#6B4EFF",
  },
  {
    id: "cell-bio",
    title: "Cell Biology",
    tags: ["Biology", "Science"],
    count: 8,
    color: "#FF6B4E",
  },
];
