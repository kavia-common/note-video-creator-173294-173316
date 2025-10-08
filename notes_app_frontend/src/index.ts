/**
 * This is the entry file for Remotion rendering (CLI/Studio).
 * Register our new RemotionRoot which exposes the 'NoteVideo' composition.
 */
import { registerRoot } from "remotion";
import { RemotionRoot } from "./remotion/Root";

registerRoot(RemotionRoot);
