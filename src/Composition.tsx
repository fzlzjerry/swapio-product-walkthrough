import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FPS = 30;
const DURATION = 60 * FPS;
const COLORS = {
  background: "#030307",
  surface: "#0d1220",
  text: "#f8f8fb",
  muted: "#99a7bc",
  purple: "#ca16ff",
  blue: "#1677ff",
  green: "#35e0a1",
};

type ScreenshotSceneProps = {
  image: string;
  title: string;
  body: string;
  caption: string;
  titleSide?: "left" | "right";
  note?: string;
};

const Brand = ({ light = false }: { light?: boolean }) => (
  <div
    style={{
      position: "absolute",
      left: 70,
      top: 52,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      gap: 18,
      color: light ? COLORS.text : "#ffffff",
      fontFamily: "InterFallback, Arial, sans-serif",
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: -1,
    }}
  >
    <span
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: `7px solid ${COLORS.purple}`,
        borderRightColor: COLORS.blue,
        rotate: "18deg",
      }}
    />
    swap.io
  </div>
);

const Caption = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 30,
        left: 70,
        right: 70,
        bottom: 54,
        padding: "20px 30px",
        color: COLORS.text,
        background: "rgba(3, 3, 7, 0.84)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: 18,
        backdropFilter: "blur(18px)",
        fontFamily: "InterFallback, Arial, sans-serif",
        fontSize: 38,
        fontWeight: 650,
        letterSpacing: -0.7,
        textAlign: "center",
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: `0 ${interpolate(frame, [0, 0.45 * fps], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}px`,
      }}
    >
      {children}
    </div>
  );
};

const ScreenshotScene = ({ image, title, body, caption, titleSide = "left", note }: ScreenshotSceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const onLeft = titleSide === "left";
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: "hidden" }}>
      <Img
        src={staticFile(image)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 0.45 * fps], [0.35, 0.82], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 12 * fps], [1.04, 1.095], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: onLeft ? "170px 0" : "-170px 0",
        }}
      />
      <AbsoluteFill
        style={{
          background: onLeft
            ? "linear-gradient(90deg, #030307 0%, rgba(3,3,7,.97) 28%, rgba(3,3,7,.38) 64%, rgba(3,3,7,.2) 100%)"
            : "linear-gradient(270deg, #030307 0%, rgba(3,3,7,.97) 28%, rgba(3,3,7,.38) 64%, rgba(3,3,7,.2) 100%)",
        }}
      />
      <Brand />
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          top: 245,
          [onLeft ? "left" : "right"]: 76,
          width: 600,
          textAlign: onLeft ? "left" : "right",
          fontFamily: "InterFallback, Arial, sans-serif",
          opacity: interpolate(frame, [0.15 * fps, 0.75 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: `${interpolate(frame, [0.15 * fps, 0.75 * fps], [onLeft ? -36 : 36, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px 0`,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: COLORS.text,
            fontSize: 76,
            lineHeight: 0.98,
            letterSpacing: -4,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: "30px 0 0",
            color: COLORS.muted,
            fontSize: 31,
            lineHeight: 1.42,
          }}
        >
          {body}
        </p>
        {note ? (
          <p style={{ marginTop: 24, color: "#75839a", fontSize: 20, lineHeight: 1.45 }}>{note}</p>
        ) : null}
      </div>
      <Caption>{caption}</Caption>
    </AbsoluteFill>
  );
};

const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.min(5, Math.floor(interpolate(frame, [0.7 * fps, 2.1 * fps], [1, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 70% 30%, #22124b 0%, #070611 42%, #030307 72%)",
        color: COLORS.text,
        fontFamily: "InterFallback, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Brand />
      <div style={{ position: "absolute", left: 110, top: 255, width: 1120 }}>
        <div
          style={{
            color: COLORS.green,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Live product test · no funds moved
        </div>
        <h1
          style={{
            margin: "24px 0 0",
            fontSize: 118,
            lineHeight: 0.96,
            letterSpacing: -7,
            opacity: interpolate(frame, [0.25 * fps, 0.95 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: `0 ${interpolate(frame, [0.25 * fps, 0.95 * fps], [48, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
          }}
        >
          One swap.
          <br />
          <span style={{ color: COLORS.purple }}>{count} routes.</span>
        </h1>
        <p style={{ margin: "34px 0 0", color: COLORS.muted, fontSize: 42 }}>
          Let the aggregators compete before you sign.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 112,
          width: 330,
          height: 330,
          borderRadius: "50%",
          border: `2px solid rgba(202,22,255,${interpolate(frame, [0, 3 * fps], [0.15, 0.65])})`,
          boxShadow: "0 0 80px rgba(80,35,255,.16), inset 0 0 60px rgba(202,22,255,.08)",
          scale: interpolate(frame, [0.3 * fps, 1.4 * fps], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 18 }),
            output: "perceptual-scale",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const QuoteComparison = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const quotes = [
    { name: "OKX DEX", rate: "102.909880", delta: "Best at capture", color: COLORS.green, width: 100 },
    { name: "DFlow", rate: "102.907270", delta: "−0.002610", color: "#f4c542", width: 99.2 },
    { name: "Jupiter", rate: "102.904260", delta: "−0.005620", color: "#43c7b6", width: 98.2 },
    { name: "Autobahn", rate: "102.904260", delta: "−0.005620", color: "#d7ff22", width: 98.2 },
  ];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #030307, #0c0920)", color: COLORS.text, fontFamily: "InterFallback, Arial, sans-serif" }}>
      <Brand />
      <div style={{ position: "absolute", left: 100, right: 100, top: 170 }}>
        <h2 style={{ margin: 0, fontSize: 68, letterSpacing: -3.5 }}>A tiny gap. Still worth seeing.</h2>
        <p style={{ margin: "18px 0 42px", color: COLORS.muted, fontSize: 28 }}>
          0.1 SOL → USDC · 4 quotes compared across 5 routes
        </p>
        <div style={{ display: "grid", gap: 20 }}>
          {quotes.map((quote, index) => (
            <div
              key={quote.name}
              style={{
                display: "grid",
                gridTemplateColumns: "190px 1fr 210px 170px",
                gap: 24,
                alignItems: "center",
                padding: "17px 22px",
                backgroundColor: COLORS.surface,
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 16,
                opacity: interpolate(frame, [(0.15 + index * 0.12) * fps, (0.65 + index * 0.12) * fps], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: `${interpolate(frame, [(0.15 + index * 0.12) * fps, (0.65 + index * 0.12) * fps], [-40, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                })}px 0`,
              }}
            >
              <strong style={{ fontSize: 26 }}>{quote.name}</strong>
              <div style={{ height: 16, overflow: "hidden", backgroundColor: "#20283a", borderRadius: 20 }}>
                <div
                  style={{
                    width: `${interpolate(frame, [0.4 * fps, 1.3 * fps], [0, quote.width], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.bezier(0.16, 1, 0.3, 1),
                    })}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${COLORS.blue}, ${quote.color})`,
                    borderRadius: 20,
                  }}
                />
              </div>
              <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 25 }}>{quote.rate}</span>
              <span style={{ color: quote.color, fontSize: 20, textAlign: "right" }}>{quote.delta}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 30, color: "#718097", fontSize: 20 }}>
          Capture: 8 Sep 2026 · USDC per SOL · Quotes change continuously · No transaction executed
        </p>
      </div>
      <Caption>Four quotes compared. The gap was tiny — and visible.</Caption>
    </AbsoluteFill>
  );
};

const ClosingScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 35%, #2a1058 0%, #090713 48%, #030307 78%)",
        color: COLORS.text,
        fontFamily: "InterFallback, Arial, sans-serif",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 0.9 * fps], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 18 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <div style={{ margin: "0 auto 38px", width: 94, height: 94, borderRadius: "50%", border: `13px solid ${COLORS.purple}`, borderRightColor: COLORS.blue, rotate: "20deg" }} />
        <h2 style={{ margin: 0, fontSize: 102, letterSpacing: -6 }}>See the quote before the prompt.</h2>
        <p style={{ margin: "34px 0 0", color: COLORS.muted, fontSize: 40 }}>Route. Fee. Notices. Then Connect Wallet.</p>
        <p style={{ margin: "55px 0 0", color: COLORS.text, fontSize: 46, fontWeight: 750 }}>swap.io</p>
        <p style={{ margin: "15px 0 0", color: "#9c74ff", fontSize: 28 }}>@swapdotio · @Superteam</p>
      </div>
    </AbsoluteFill>
  );
};

export const SwapIoVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
    <Audio src={staticFile("narration.mp3")} volume={0.94} />
    <Sequence durationInFrames={150}><HookScene /></Sequence>
    <Sequence from={150} durationInFrames={390}>
      <ScreenshotScene
        image="quote-routes.png"
        title="A live quote, before the wallet."
        body="0.1 SOL returned 10.290988 USDC at capture time. Four aggregators surfaced their rates across five routes."
        caption="Live 0.1 SOL → USDC quote · no wallet connected · no funds moved"
        note="Quotes change continuously. This is a product walkthrough, not a price or return claim."
      />
    </Sequence>
    <Sequence from={540} durationInFrames={270}><QuoteComparison /></Sequence>
    <Sequence from={810} durationInFrames={300}>
      <ScreenshotScene
        image="recurring.png"
        title="Recurring, but inspectable."
        body="The same total becomes scheduled suborders. Frequency, start time, price range, and platform fee stay visible before signing."
        caption="2 scheduled suborders · 0.11% platform fee shown first"
        titleSide="right"
      />
    </Sequence>
    <Sequence from={1110} durationInFrames={240}>
      <ScreenshotScene
        image="private-transfer.png"
        title="More than a swap box."
        body="Batch up to 100 recipients, schedule recurring transfers, or open the Privacy Vault flow."
        caption="Batch · recurring · private transfer"
        note="Private transfer uses third-party privacy protocols and separate terms."
      />
    </Sequence>
    <Sequence from={1350} durationInFrames={240}>
      <ScreenshotScene
        image="season-zero.png"
        title="A reason to come back."
        body="Season Zero layers achievements, weekly and flash challenges, referrals, boosts, and an XP leaderboard over product activity."
        caption="Achievements · challenges · XP leaderboard"
        titleSide="right"
      />
    </Sequence>
    <Sequence from={1590} durationInFrames={210}><ClosingScene /></Sequence>
  </AbsoluteFill>
);

export const MyComposition = () => (
  <Composition
    id="SwapIoBounty"
    component={SwapIoVideo}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
