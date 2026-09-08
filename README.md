# Swap.io product walkthrough

An original, evidence-led 60-second product video for the Superteam
**Create a Video About Swap.io** bounty. The walkthrough uses a live, read-only
product session captured on 8 September 2026. No wallet was connected and no
funds were moved.

## What the video demonstrates

- A live `0.1 SOL -> USDC` quote that returned `10.290988 USDC` at capture time.
- Four visible aggregator quotes spanning five routes.
- The best observed rate and the small differences between alternatives.
- Recurring orders with two suborders, a one-minute frequency, and the displayed
  `0.11%` platform fee.
- Batch, recurring, and private-transfer entry points.
- Season Zero achievements, challenges, and XP leaderboard surfaces.

The narration and on-screen copy state that quotes change continuously, the
capture is a walkthrough rather than a price or return claim, and no transaction
was executed.

## Render

```console
npm ci
npm run lint
npm run render -- --concurrency=4
```

The final artifact is written to `output/swapio-bounty.mp4`.

Public release: [v1.0.0](https://github.com/fzlzjerry/swapio-product-walkthrough/releases/tag/v1.0.0), including the MP4 and a separate SHA-256 manifest.

## Verified artifact

- Container: MP4
- Video: H.264 High, 1920x1080, 30 fps, 1,800 frames, 60.000 seconds
- Audio: AAC-LC, 48 kHz stereo
- Size: 10,099,603 bytes
- SHA-256: `5eba509b81911d93d3a70e0f337529aa6f0ec982805e042c83254895a6bccdf2`
- Audio levels: mean `-20.9 dB`, peak `-3.4 dB`
- Validation: ESLint and TypeScript pass; seven representative full-resolution
  frames were visually inspected after the final encode.

## Source structure

- `src/Composition.tsx` — scenes, motion, captions, evidence annotations
- `public/*.png` — product captures from the read-only session
- `public/narration.mp3` — original narration track
- `assets/narration.txt` — narration transcript
- `SUBMISSION.md` — ready-to-post X and Superteam fields

## Reproducibility notes

Product quotes are a time-stamped observation, not a promise of future pricing.
The output directory and local QA captures are intentionally ignored by Git.
The exact final MP4 is retained in this workspace for upload.
