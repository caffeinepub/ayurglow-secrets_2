/**
 * Image storage utilities for AyurGlow Secrets.
 *
 * Since the backend ignores coverImageId and contentImageIds, we embed image
 * hashes directly into the `tags` array using special prefixes:
 *
 *  Cover image:    "__cover__:sha256:abc123..."
 *  Content images: "__img__:0:medium:sha256:abc123..."  (index:size:hash)
 *
 * All other tags are treated as visible user-defined tags.
 */

const COVER_PREFIX = "__cover__:";
const IMG_PREFIX = "__img__:";

/** Build a storage gateway URL from a blob hash using the Caffeine runtime config. */
export function buildStorageUrl(hash: string): string {
  const config = (window as any).__CAFFEINE_CONFIG__;
  if (!config) {
    console.warn("Caffeine config not available on window");
    return "";
  }
  return `${config.storageGatewayUrl}/v1/blob/?blob_hash=${encodeURIComponent(hash)}&owner_id=${encodeURIComponent(config.backendCanisterId)}&project_id=${encodeURIComponent(config.projectId)}`;
}

/** Extract the cover image URL from a post's tags array. Returns null if none. */
export function extractCoverImageUrl(tags: string[]): string | null {
  if (!tags || tags.length === 0) return null;
  const coverTag = tags.find((t) => t.startsWith(COVER_PREFIX));
  if (!coverTag) return null;
  const hash = coverTag.slice(COVER_PREFIX.length);
  if (!hash) return null;
  return buildStorageUrl(hash);
}

/** Extract all content image URLs from a post's tags array, sorted by index. */
export function extractContentImageUrls(
  tags: string[],
): { index: number; size: string; url: string }[] {
  if (!tags || tags.length === 0) return [];
  const results: { index: number; size: string; url: string }[] = [];

  for (const tag of tags) {
    if (!tag.startsWith(IMG_PREFIX)) continue;
    const rest = tag.slice(IMG_PREFIX.length);
    // Format: "index:size:hash"
    const firstColon = rest.indexOf(":");
    if (firstColon === -1) continue;
    const indexStr = rest.slice(0, firstColon);
    const afterIndex = rest.slice(firstColon + 1);

    const secondColon = afterIndex.indexOf(":");
    if (secondColon === -1) continue;
    const size = afterIndex.slice(0, secondColon);
    const hash = afterIndex.slice(secondColon + 1);

    const index = Number.parseInt(indexStr, 10);
    if (Number.isNaN(index) || !hash) continue;

    results.push({ index, size, url: buildStorageUrl(hash) });
  }

  return results.sort((a, b) => a.index - b.index);
}

/** Return tags without the __cover__ and __img__ internal tags. */
export function getVisibleTags(tags: string[]): string[] {
  if (!tags || tags.length === 0) return [];
  return tags.filter(
    (t) => !t.startsWith(COVER_PREFIX) && !t.startsWith(IMG_PREFIX),
  );
}

/** Replace or add the cover image tag in the tags array. */
export function addCoverImageToTags(
  existingTags: string[],
  hash: string,
): string[] {
  const filtered = existingTags.filter((t) => !t.startsWith(COVER_PREFIX));
  return [...filtered, `${COVER_PREFIX}${hash}`];
}

/** Add a content image tag at the given index with the given size and hash. */
export function addContentImageToTags(
  existingTags: string[],
  index: number,
  hash: string,
  size: string,
): string[] {
  // Remove any existing tag for this index
  const filtered = existingTags.filter(
    (t) => !t.startsWith(`${IMG_PREFIX}${index}:`),
  );
  return [...filtered, `${IMG_PREFIX}${index}:${size}:${hash}`];
}

/** Remove a content image tag by index and re-index remaining tags. */
export function removeContentImageFromTags(
  tags: string[],
  indexToRemove: number,
): string[] {
  // First remove the target tag
  const withoutTarget = tags.filter(
    (t) => !t.startsWith(`${IMG_PREFIX}${indexToRemove}:`),
  );

  // Re-index remaining content image tags to fill the gap
  const reindexed = withoutTarget.map((tag) => {
    if (!tag.startsWith(IMG_PREFIX)) return tag;
    const rest = tag.slice(IMG_PREFIX.length);
    const firstColon = rest.indexOf(":");
    if (firstColon === -1) return tag;
    const currentIndex = Number.parseInt(rest.slice(0, firstColon), 10);
    if (Number.isNaN(currentIndex)) return tag;
    if (currentIndex > indexToRemove) {
      const remainder = rest.slice(firstColon);
      return `${IMG_PREFIX}${currentIndex - 1}${remainder}`;
    }
    return tag;
  });

  return reindexed;
}

/** Update the size of a content image tag by index. */
export function updateContentImageSizeInTags(
  tags: string[],
  index: number,
  newSize: string,
): string[] {
  return tags.map((tag) => {
    if (!tag.startsWith(`${IMG_PREFIX}${index}:`)) return tag;
    const rest = tag.slice(IMG_PREFIX.length);
    const firstColon = rest.indexOf(":");
    if (firstColon === -1) return tag;
    const afterIndex = rest.slice(firstColon + 1);
    const secondColon = afterIndex.indexOf(":");
    if (secondColon === -1) return tag;
    const hash = afterIndex.slice(secondColon + 1);
    return `${IMG_PREFIX}${index}:${newSize}:${hash}`;
  });
}

/** Extract hash from a content image tag at a given index. */
export function getContentImageHash(
  tags: string[],
  index: number,
): string | null {
  const tag = tags.find((t) => t.startsWith(`${IMG_PREFIX}${index}:`));
  if (!tag) return null;
  const rest = tag.slice(IMG_PREFIX.length);
  const firstColon = rest.indexOf(":");
  if (firstColon === -1) return null;
  const afterIndex = rest.slice(firstColon + 1);
  const secondColon = afterIndex.indexOf(":");
  if (secondColon === -1) return null;
  return afterIndex.slice(secondColon + 1);
}
