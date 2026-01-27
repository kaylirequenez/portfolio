/**
 * Utility for persisting media playback times and last viewed index across sessions
 * Uses localStorage with keys:
 * - `mediaTime_${fileId}_${evidenceIndex}` for playback times
 * - `lastIndex_${fileId}` for last viewed evidence index
 * - `lastTab_${fileId}` for last viewed tab (Details vs Evidence)
 * - `lastSelectedItem_${viewId}` for last selected file/item in a view (Archives/Operations)
 */

// ─────────────────────────────────────────────────────
// Media Time Storage
// ─────────────────────────────────────────────────────

export function getMediaTimeKey(fileId: string, evidenceIndex: number): string {
  return `mediaTime_${fileId}_${evidenceIndex}`;
}

export function saveMediaTime(
  fileId: string | null,
  evidenceIndex: number,
  time: number,
): void {
  if (!fileId) return;
  try {
    const key = getMediaTimeKey(fileId, evidenceIndex);
    localStorage.setItem(key, time.toString());
  } catch (error) {
    // Ignore localStorage errors (e.g., quota exceeded, private browsing)
    console.warn("Failed to save media time:", error);
  }
}

export function getMediaTime(
  fileId: string | null,
  evidenceIndex: number,
): number {
  if (!fileId) return 0;
  try {
    const key = getMediaTimeKey(fileId, evidenceIndex);
    const stored = localStorage.getItem(key);
    return stored ? parseFloat(stored) : 0;
  } catch (error) {
    console.warn("Failed to get media time:", error);
    return 0;
  }
}

export function clearMediaTime(
  fileId: string | null,
  evidenceIndex: number,
): void {
  if (!fileId) return;
  try {
    const key = getMediaTimeKey(fileId, evidenceIndex);
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to clear media time:", error);
  }
}

// ─────────────────────────────────────────────────────
// Last Index Storage
// ─────────────────────────────────────────────────────

export function getLastIndexKey(fileId: string): string {
  return `lastIndex_${fileId}`;
}

export function saveLastIndex(fileId: string | null, index: number): void {
  if (!fileId) return;
  try {
    const key = getLastIndexKey(fileId);
    localStorage.setItem(key, index.toString());
  } catch (error) {
    console.warn("Failed to save last index:", error);
  }
}

export function getLastIndex(fileId: string | null): number | null {
  if (!fileId) return null;
  try {
    const key = getLastIndexKey(fileId);
    const stored = localStorage.getItem(key);
    return stored !== null ? parseInt(stored, 10) : null;
  } catch (error) {
    console.warn("Failed to get last index:", error);
    return null;
  }
}

// ─────────────────────────────────────────────────────
// Last Tab Storage (for Details vs Evidence tabs)
// ─────────────────────────────────────────────────────

export function getLastTabKey(fileId: string): string {
  return `lastTab_${fileId}`;
}

export function saveLastTab(fileId: string | null, tabIndex: number): void {
  if (!fileId) return;
  try {
    const key = getLastTabKey(fileId);
    localStorage.setItem(key, tabIndex.toString());
  } catch (error) {
    console.warn("Failed to save last tab:", error);
  }
}

export function getLastTab(fileId: string | null): number | null {
  if (!fileId) return null;
  try {
    const key = getLastTabKey(fileId);
    const stored = localStorage.getItem(key);
    return stored !== null ? parseInt(stored, 10) : null;
  } catch (error) {
    console.warn("Failed to get last tab:", error);
    return null;
  }
}

// ─────────────────────────────────────────────────────
// Last Selected Item Storage (for Archives/Operations views)
// ─────────────────────────────────────────────────────

export function getLastSelectedItemKey(viewId: string): string {
  return `lastSelectedItem_${viewId}`;
}

export function saveLastSelectedItem(
  viewId: string | null,
  itemId: string | null,
): void {
  if (!viewId) return;
  // Allow saving null to clear the selection
  try {
    const key = getLastSelectedItemKey(viewId);
    if (itemId === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, itemId);
    }
  } catch (error) {
    console.warn("Failed to save last selected item:", error);
  }
}

export function getLastSelectedItem(viewId: string | null): string | null {
  if (!viewId) return null;
  try {
    const key = getLastSelectedItemKey(viewId);
    const stored = localStorage.getItem(key);
    console.log("retrieved selectedItemId", stored);
    return stored;
  } catch (error) {
    console.warn("Failed to get last selected item:", error);
    return null;
  }
}
