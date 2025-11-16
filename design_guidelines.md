# Migration Project - No New Design Guidelines Required

## Context
This is a **technical migration project** from React + Vite to Next.js App Router, not a new application design project.

## Design Approach

**Preserve Existing Design**
- The application already has an established design from the original Lovable project
- All visual design, component styling, and UX patterns will be maintained during migration
- No new design decisions are needed

## Migration Design Principles

**Visual Consistency**
- Maintain exact visual appearance from the original React/Vite application
- Preserve all existing CSS/styling solutions (Tailwind classes, component styles, etc.)
- Keep identical spacing, typography, colors, and component layouts

**Component Fidelity**
- Convert components 1:1 without altering their visual presentation
- Maintain existing component hierarchy and structure
- Preserve all animations, transitions, and interactive states

**Asset Preservation**
- Keep all existing images, icons, fonts, and media assets
- Maintain current asset loading patterns and optimization strategies
- Use Next.js Image component for existing images where applicable

## Technical Considerations

**Styling Migration**
- Transfer existing Tailwind configuration without modification
- Preserve all custom CSS files and their import structure
- Maintain any CSS-in-JS or styled-components patterns

**Route Preservation**
- Map existing React Router routes to Next.js App Router equivalently
- Maintain URL structure and navigation patterns
- Preserve any dynamic routing parameters

---

**Note:** Once the GitHub repository is provided, the existing design will guide all visual implementation during the Next.js conversion. No new design decisions will be made - only technical adaptations to Next.js patterns while maintaining visual parity.