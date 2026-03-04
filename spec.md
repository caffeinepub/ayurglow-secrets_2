# AyurGlow Secrets

## Current State

A fully public Ayurvedic wellness blog with:
- Blog post CRUD via `/admin` (no login required)
- Cover image and in-content image uploads
- Comment section open to all
- Category navigation (health, skin, hair, lifestyle, chronic)
- Rich text formatting toolbar (bold, italic, color)

**Current image upload problem**: The backend `createPost`/`updatePost` accept `coverImageId: ?Text` and `contentImageIds: [Text]` but always set `coverImage = null` and `contentImages = []`. The frontend uses a custom `StorageClient` that reads `window.__CAFFEINE_CONFIG__` which is sometimes not available, causing "Caffeine config not available" errors.

## Requested Changes (Diff)

### Add
- Nothing new; fix existing image upload flow

### Modify
- `createPost` and `updatePost` backend functions: change `coverImageId: ?Text` and `contentImageIds: [Text]` parameters to `coverImage: ?Storage.ExternalBlob` and `contentImages: [Storage.ExternalBlob]`, so images are stored natively using Caffeine's blob storage
- Frontend `AdminPage.tsx`: remove custom `StorageClient` usage; pass `ExternalBlob.fromBytes(bytes)` directly to `createPost`/`updatePost`
- Frontend `imageUtils.ts`: remove `buildStorageUrl` (which depends on `__CAFFEINE_CONFIG__`); instead use `post.coverImage?.getDirectURL()` and `post.contentImages[i]?.getDirectURL()` for display
- Frontend `BlogPostPage.tsx` and category pages: use `post.coverImage?.getDirectURL()` for displaying cover images

### Remove
- `StorageClient.ts` custom upload class (no longer needed)
- Tag-based image hash storage (`__cover__:...` and `__img__:...` tags)

## Implementation Plan

1. Regenerate backend: change `createPost(title, category, subcategory, content, excerpt, tags, isPublished, coverImage: ?ExternalBlob, contentImages: [ExternalBlob])` and `updatePost` with same signature change. Backend stores blobs natively. Keep all other logic (categories, comments, etc.) unchanged.

2. Update `AdminPage.tsx`:
   - Remove `StorageClient` import and `getStorageClient` function
   - Remove `HttpAgent` import
   - On cover image select: read file bytes, create `ExternalBlob.fromBytes(bytes).withUploadProgress(...)`, store in state
   - On content image select: same pattern for each file
   - On form submit: pass the stored `ExternalBlob` objects to `createPost`/`updatePost`
   - For preview: use `URL.createObjectURL(file)` for local preview before save

3. Update `imageUtils.ts`:
   - Remove `buildStorageUrl`, `addCoverImageToTags`, `addContentImageToTags`, `removeContentImageFromTags`, `updateContentImageSizeInTags`, `extractCoverImageUrl`, `extractContentImageUrls` (tag-based functions no longer needed)
   - Keep `getVisibleTags` to filter out any legacy special tags

4. Update `BlogPostPage.tsx`, `BlogPage.tsx`, and category pages to display images from `post.coverImage?.getDirectURL()` and `post.contentImages`

5. Update `useQueries.ts` mutations to pass ExternalBlob parameters

6. Delete `StorageClient.ts`
