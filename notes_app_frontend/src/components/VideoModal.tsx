import React, { useMemo } from "react";
import { Player } from "@remotion/player";
import { NoteVideo } from "../remotion/NoteVideo";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
};

// PUBLIC_INTERFACE
const VideoModal: React.FC<Props> = ({ isOpen, onClose, title, content }) => {
  /** Modal hosting Remotion Player for previewing the note composition. */
  const inputProps = useMemo(() => ({ title, content }), [title, content]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-header">
          <h3>Video Preview</h3>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Close preview"
            title="Close"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <Player
            component={NoteVideo}
            inputProps={inputProps}
            durationInFrames={180}
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            controls
            style={{ borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
