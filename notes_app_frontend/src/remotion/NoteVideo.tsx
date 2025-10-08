import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const noteVideoSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type NoteVideoProps = z.infer<typeof noteVideoSchema>;

// Colors per Ocean Professional
const COLORS = {
  primary: "#2563EB",
  secondary: "#F59E0B",
  bg: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
};

const containerStyle: React.CSSProperties = {
  background: COLORS.bg,
};

const cardStyle: React.CSSProperties = {
  background: COLORS.surface,
  width: "86%",
  height: "72%",
  margin: "auto",
  borderRadius: 24,
  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const headerStyle: React.CSSProperties = {
  padding: "28px 36px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(249,250,251,0.6))",
};

const titleStyle: React.CSSProperties = {
  fontSize: 60,
  fontWeight: 800,
  color: COLORS.text,
  lineHeight: 1.1,
  letterSpacing: -0.5,
};

const contentWrapStyle: React.CSSProperties = {
  padding: "24px 36px 36px",
  display: "flex",
  flex: 1,
};

const contentStyle: React.CSSProperties = {
  fontSize: 36,
  lineHeight: 1.45,
  color: COLORS.text,
  whiteSpace: "pre-wrap",
};

export const NoteVideo: React.FC<NoteVideoProps> = ({ title, content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card pop
  const scale = spring({
    frame,
    fps,
    config: { damping: 90, mass: 0.7 },
  });

  // Content fade
  const contentOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={containerStyle}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(37,99,235,0.10), transparent), radial-gradient(1000px 500px at 80% 90%, rgba(245,158,11,0.08), transparent)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${0.98 + scale * 0.02})`,
        }}
      >
        <div style={cardStyle}>
          <Sequence from={0}>
            <div style={headerStyle}>
              <div
                style={{
                  ...titleStyle,
                  opacity: titleOpacity,
                  transform: `translateY(${titleY}px)`,
                }}
              >
                {title || "Untitled Note"}
              </div>
            </div>
          </Sequence>
          <Sequence from={12}>
            <div style={contentWrapStyle}>
              <div
                style={{
                  ...contentStyle,
                  opacity: contentOpacity,
                }}
              >
                {content || "Start typing your content to see it here..."}
              </div>
            </div>
          </Sequence>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
