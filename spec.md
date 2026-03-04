# AyurGlow Secrets

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full Ayurvedic wellness blog/content website called "AyurGlow Secrets"
- Tagline: "Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong Hair"
- Blue and green color scheme
- Logo in header
- Navigation: Home, Health Remedies, Skin Care, Hair Care, Lifestyle & Weight, Chronic Health, Blog, Admin, About
- Homepage: hero section, what we offer, why choose us, featured posts, about preview
- Category pages with subcategories:
  - Health Remedies: Immunity, Digestion, Weight Management, Diabetes & BP, Stress & Sleep
  - Skin Care: Natural Glow, Acne & Pimples, Pigmentation, Anti-Aging, DIY Face Packs
  - Hair Care: Hair Fall, Hair Growth, Dandruff & Scalp, Grey Hair, Oils & Masks
  - Lifestyle & Weight Management: Weight Loss, Morning Routine, Stress Management, Detox, Yoga
  - Chronic Health: Diabetes, Blood Pressure, Thyroid, PCOS, Arthritis, etc.
- Pre-loaded remedy content for all categories with ingredients, application, benefits, frequency
- Blog system: create, edit, publish posts with cover image upload and in-content image upload
- Blog post features: cover image, in-content images with size control, comment section, publication date, publish immediately option
- Admin panel (no login required): create/edit/delete blog posts, manage categories
- Public blog listing page showing all published posts
- "Best Ayurvedic Herbs for Glowing Skin" visible in both Admin and Blog pages as a sample post
- Social media links section (Instagram, Facebook, YouTube) - "Connect With Us" in footer
- No "Built with Caffeine.ai" branding
- Image storage using blob-storage component (no storage restrictions)
- All content publicly visible to anyone with the link

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
1. Blog post data model: id, title, category, subcategory, content (rich text with image markers), coverImageId, contentImageIds, publishedAt, isPublished, tags, excerpt
2. Image storage via blob-storage component for cover images and in-content images
3. CRUD operations for blog posts: create, update, delete, get, list by category
4. Comment model: id, postId, authorName, content, createdAt
5. Add/get comments per post
6. Pre-loaded static remedy content as structured data (not stored in backend, rendered from frontend constants)
7. Category and subcategory listing

### Frontend
1. App shell: header with logo, nav, footer with social links
2. Homepage: hero, features grid, categories preview, featured posts
3. Category pages with subcategory filtering and remedy cards
4. Individual remedy detail pages (static content)
5. Blog listing page with category filter
6. Blog post detail page with comments
7. Admin page: post editor with rich text, cover image upload, in-content image upload with size options, publish date picker, publish immediately toggle
8. All pages publicly accessible, no auth required
