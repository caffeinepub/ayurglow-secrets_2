/**
 * Image utilities for AyurGlow Secrets.
 * Image storage is now handled natively by ExternalBlob via the Caffeine backend.
 */

const COVER_PREFIX = "__cover__:";
const IMG_PREFIX = "__img__:";

/** Return tags without legacy __cover__ and __img__ internal tags. */
export function getVisibleTags(tags: string[]): string[] {
  if (!tags || tags.length === 0) return [];
  return tags.filter(
    (t) => !t.startsWith(COVER_PREFIX) && !t.startsWith(IMG_PREFIX),
  );
}
