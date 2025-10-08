export type Note = {
  /** Unique identifier for the note. */
  id: string;
  /** Note title displayed in UI and video composition. */
  title: string;
  /** Freeform content used in the video composition body. */
  content: string;
  /** Last updated timestamp (ms since epoch). */
  updatedAt: number;
};
