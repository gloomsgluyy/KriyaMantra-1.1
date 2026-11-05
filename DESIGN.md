---
version: alpha
name: "App landing page template by 8B"
description: "Design system Kriya Mantra: Warm Amber palette, Host Grotesk typography, rounded organic UI, and responsive SaaS patterns."
colors:
  primary: "#292524"
  surface: "#ffffff"
  cream: "#fffbeb"
  amber: "#f59e0b"
  muted: "#57534e"
  dark-surface: "#292524"
  amber-light: "#fde68a"
  amber-mid: "#fbbf24"
  border: "#e7e5e4"
typography:
  headline-display:
    fontFamily: Host Grotesk
    fontSize: 100px
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: -0.045em
  headline-lg:
    fontFamily: Host Grotesk
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Host Grotesk
    fontSize: 23px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Host Grotesk
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.01em
  body-md:
    fontFamily: Host Grotesk
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Host Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Host Grotesk
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  caption:
    fontFamily: Host Grotesk
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: Host Grotesk
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.005em
rounded:
  sheet: 56px
  card: 28px
  bubble: 20px
  field: 14px
  tail: 5px
  full: 1000px
spacing:
  gutter: 56px
  gutter-min: 18px
  section-y: 144px
  section-y-min: 80px
  content-max: 1408px
  nav-max: 1344px
  column-gap: 64px
  head-row-gap: 24px
  step-gap: 20px
  card-gap: 16px
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 14px 26px
    height: 52px
  button-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 14px 26px
    height: 52px
  button-compact:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 10px 20px
    height: 44px
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: 7px 7px 7px 20px
  caption-bubble:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.bubble}"
    padding: 10px 16px 10px 13px
  caption-bubble-you:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.primary}"
    rounded: "{rounded.bubble}"
    padding: 10px 16px 10px 13px
  card-review:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.primary}"
    rounded: "{rounded.card}"
    padding: 24px 24px 22px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.field}"
    padding: 14px 16px
    height: 52px
---

## Overview

Kriya Mantra is a marketing AI companion for traditional Balinese artisans. A product photo becomes a ready-to-post poster, Indonesian-English caption, and posting plan. The visual system is warm, human, calm, and practical: cream sheets, dark brown surfaces, amber actions, rounded shapes, and motion that explains the product flow.

## Colors

The palette is Warm Amber: dark brown, white, cream, amber, and stone neutrals. Use flat surfaces and restrained contrast rather than a multi-accent palette.

- **Primary (#292524):** dark brown. Main text, dark sections, footer, dark buttons, phone frame.
- **Surface (#ffffff):** white. Main page background, light cards, text on dark surfaces.
- **Cream (#fffbeb):** warm cream. Alternate section surfaces, cards, soft panels.
- **Amber (#f59e0b):** primary action. CTA buttons, active states, highlights, user chat bubbles, ticks.
- **Muted (#57534e):** secondary text, labels, supporting copy.
- **Dark surface (#292524):** same dark brown as primary; do not introduce a separate navy band.
- **Light amber (#fde68a):** soft highlight and supporting amber surface.
- **Medium amber (#fbbf24):** secondary amber surface.
- **Border (#e7e5e4):** light dividers and quiet borders.

Amber is a fill with dark-brown text. Avoid small amber text on white. Use `#d97706` for amber hover states.

## Typography

Host Grotesk is the only family: `"Host Grotesk", "Host Grotesk Fallback", Arial, sans-serif`. Hierarchy comes from size and weight (400, 500, 600; display samples may use a wider range). Headlines are semibold with strong negative tracking (`-0.04em` to `-0.045em`) and line-height at or below 1. The hero title uses the responsive `.m-text-2` scale, with a deliberate larger mobile override. Section headings use `.m-text-3`; lead text uses `.m-text-4`; labels use `.m-text-6`; legal notes use `.m-text-7`. Everything is sentence case, with no unnecessary uppercase and no italics.

## Layout

Content sits in a wrapper up to `88rem` / 1408px wide with responsive side gutters from `1.125rem` to `3.5rem`. Sections use `var(--space-2)` for vertical rhythm. Section heads are commonly two-column grids; below `64rem` they collapse. Below `48rem`, grids become one column, the photo-to-poster panels stack, the phone preview shrinks, the footer brand stacks vertically, and the hero asset must remain centered without clipping. Each section uses a warm sheet or dark surface with controlled overlap.

## Elevation & Depth

Depth comes from stacking, cream/dark surface changes, the sticky phone preview, and two restrained shadows. `--shadow-1` is the dark-brown lift for cards, phone, images, and bubbles. `--shadow-2` is the amber glow for primary CTAs. The navbar is white with a subtle border, shadow, and frosted backdrop.

## Shapes

Large soft shapes: sheets have 56px top corners and square bottoms, hidden under the next sheet. Panels, cards and photos use 28px. Caption bubbles are 20px with one 5px corner as the speech tail (bottom left for the other voice, bottom right for you). Buttons, nav bar, pills and tags are fully round (1000px). Inputs are 14px. The phone is drawn in HTML with a 44px body and 34px screen radius. FAQ icons, the endorsement badge and status dots are circles. Icons are line drawings with round caps, 1.6px to 2px strokes. Waveforms are 3px bars with 2px radius.

## Components

- **Buttons:** the primary pill is amber with dark-brown text, 52px high, with an amber glow. On hover the label slides left and three small bars animate. The dark pill is used for secondary/form actions. The compact pill lives in the nav.
- **Nav bar:** a floating white pill, 14px from the top, with the Kriya Mantra logo, links, and amber compact CTA.
- **Caption bubbles:** white for system/other voice, amber for user input, each with a tiny four-bar waveform.
- **Poster/photo surfaces:** cream, white, or dark brown with 28px corners; use real product assets where available.
- **Input field:** white fill, dark-brown border at 55 percent, 14px corners; invalid fields use amber emphasis.

## Motion

The page loads GSAP 3.13.0 with ScrollTrigger and SplitText, and Lenis 1.3.27 for smooth scrolling (lerp 0.085), all from jsDelivr. The motion idea is transcription: speech is shown as bars, then resolves into words. Most scenes are scrubbed to scroll.

- **Hero:** copy rises on entry. The hero asset is centered on mobile and constrained on tablet to avoid clipping. Leaving the hero, background, copy, and decorative layers move at different speeds when motion is allowed.
- **Headings and leads:** headings reveal line by line from a mask (expo.out, 1s). Lead text brightens word by word from 22 percent opacity. Sheets widen from slightly inset sides.
- **Photo to poster:** the raw fabric photo and prompt resolve into the Poster AI panel. Product imagery enters without covering labels or dialogue.
- **Calls:** each feature brightens as it reaches mid-screen, the sticky phone adds that step's messages, and on exit the phone shrinks to 80 percent and tilts 7 degrees.
- **Brand style:** the sample poster and style controls demonstrate a consistent visual identity across outputs.
- **Steps and footer:** setup cards stack when motion is enabled; the footer wordmark rises and logo strokes draw.

With reduced motion enabled there is no smooth scrolling, no entrance animation and no pinned scene: panels, places and steps fall back to plain layouts and the page reads in full.

## Do's and Don'ts

- Do keep Host Grotesk as the only family and build hierarchy with size, weight and tight tracking.
- Do use amber for what is actionable, selected, or highlighted.
- Don't put small amber text on white; use amber as a fill with dark-brown text.
- Do use cream and dark-brown sheets with large rounded top corners.
- Don't add navy/green accents, decorative gradients, or more shadows than the two soft ones.
- Don't turn the phone, waveform or settings controls into flat screenshots; keep them as HTML.
- Do keep body text at 4.5:1 contrast on every band.
- Don't use stock icon sets or sharp rectangles; icons are round-cap line drawings.
- Do keep the Design: 8B footer link unless the site owner asks to remove it.
- Do make sure the page reads in full with reduced motion.
