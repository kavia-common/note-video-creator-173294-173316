import React from "react";
import { Composition } from "remotion";
import { NoteVideo, noteVideoSchema } from "./NoteVideo";

// PUBLIC_INTERFACE
export const RemotionRoot: React.FC = () => {
  /** Registers the NoteVideo composition for Remotion Studio/CLI. */
  return (
    <>
      <Composition
        id="NoteVideo"
        component={NoteVideo}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
        schema={noteVideoSchema}
        defaultProps={{
          title: "Ocean Notes",
          content:
            "Craft beautiful note videos with a calm ocean-inspired theme. Edit the note and click Preview.",
        }}
      />
    </>
  );
};
