# Contact page refinement

## Goal
Bring `/contact` in line with the strongest patterns across the portfolio while preserving every requested detail and interaction.

## Changes
- Recompose the header with the site’s highlighted headline treatment, doodles, status pills, and a clearer paper-backed introduction over the 3D scene.
- Turn the direct links into a stronger numbered contact directory with candy accents, hard shadows, animated arrows, and better mobile wrapping.
- Refine the form as a playful “message builder” with a stronger title, status strip, decorative controls, clearer fields, and the existing validation/mail-app flow intact.
- Add small data-flow connectors and stamped labels around the two-column area without obscuring the 3D focal point.
- Strengthen the closing availability section and giant clipped wordmark using the same full-width band language seen elsewhere.
- Add the missing social metadata required for the route.

## Technical details
- Reuse existing semantic colors, typography, doodles, motion timing, `ToyButton`, and hard-shadow utilities.
- Replace direct DOM underline manipulation with React focus state.
- Use existing site assets only; no backend or contact behavior changes.
- Verify desktop and mobile layouts, validation, copy feedback, and clean build output.
