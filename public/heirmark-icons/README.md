# HeirMark Imprint — SVG icon assets

14 original icons, all 64×64 viewBox, stroke-based and color-agnostic.

## Brand colors
All icons use `stroke="currentColor"`. Apply verified HeirMark brand tokens in the app, **not** the illustrative colors from concept art. No colors are hardcoded.

## Files
Signature: identity, connection, legacy.
Supporting: events, speaking, books, partnerships, journal, contact, community, healing, growth, impact, explore.

## Implementation
Prefer importing as inline SVG React components with an SVG loader that preserves `currentColor`; alternatively inline SVG markup. An SVG loaded through `<img>` does not inherit parent CSS `color` in all contexts.
Use aria-hidden=true for decorative instances, or a meaningful accessible label when the icon conveys information.
The 64px signatures are best displayed at 48–96px. Test optical clarity at smaller sizes before use; do not shrink the detailed identity mark to 16px.
Do not change shapes or strokes without design approval.

## Status
Production candidate SVG geometry, pending visual approval and testing against official brand palette/logo.
