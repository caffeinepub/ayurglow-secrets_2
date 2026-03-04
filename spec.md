# AyurGlow Secrets

## Current State
The admin content section (`AdminPage.tsx`) uses a plain `<Textarea>` for writing blog post content. Users must manually type markdown syntax (e.g., `## Heading`, `- list`, `**bold**`). There is no toolbar or formatting UI. The `BlogPostPage.tsx` renders content via a custom `parseContent`/`renderText` function that already handles `## headings`, `- lists`, and `**bold**` markdown syntax.

## Requested Changes (Diff)

### Add
- A rich text formatting toolbar above the content textarea in the admin Create/Edit Post form.
- Toolbar buttons: **Normal** (clear formatting), **Bold** (wraps selection in `**...**`), *Italic* (wraps selection in `*...*`), and a **Color** picker with a set of preset colors that wraps selection in a color HTML tag (e.g., `<color:hex>text</color>`).
- **Multiple text selection**: The toolbar applies formatting to whatever text the user has selected in the textarea (not just at the cursor).
- The content textarea keeps its existing `font-mono text-sm` style and continues to store raw markdown/custom markup.
- Update `renderText` in `BlogPostPage.tsx` to parse and render the new inline formatting:
  - `**text**` → `<strong>` (already partially handled as block-level; extend to inline within paragraphs)
  - `*text*` → `<em>`
  - `<color:HEX>text</color>` → `<span style="color: #HEX">text</span>`

### Modify
- `AdminPage.tsx`: Replace the plain `<Textarea>` in the Content section with a toolbar + textarea combo. The toolbar sits above the textarea with format buttons.
- `BlogPostPage.tsx`: Update `renderText` to handle inline bold (`**...**`), italic (`*...*`), and color (`<color:HEX>...</color>`) within paragraph lines, not just as standalone block-level patterns.

### Remove
- Nothing removed; the existing content textarea behavior is preserved (users can still type markdown manually).

## Implementation Plan
1. In `AdminPage.tsx`, add a `RichTextToolbar` component (or inline JSX) with buttons: Normal, Bold, Italic, and a color palette picker (preset swatches: black, dark green, dark blue, red, orange, purple, teal).
2. Implement `applyFormat(format, color?)` helper that reads the textarea's `selectionStart`/`selectionEnd`, wraps the selected text with the appropriate markup, and updates `form.content`.
3. After applying format, restore the selection in the textarea using a `useEffect` or `setTimeout`.
4. In `BlogPostPage.tsx`, update `renderText` to process inline formatting tokens within each line: parse `**...**`, `*...*`, and `<color:HEX>...</color>` patterns and render them as React inline elements.
5. The color picker shows a small popover/dropdown with preset colored swatches; clicking one applies the color wrap to the selection.
