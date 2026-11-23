import type { Notification } from '../services/notifications';

/**
 * There is no backend endpoint to mark notifications as read, so "read" state
 * is tracked locally per device in localStorage and merged onto whatever the
 * API returns. It will not sync across devices.
 */

const STORAGE_KEY = 'wazobiatax.locallyReadNotificationIds';

function getLocallyReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch (err) {
    console.error('Failed to read local notification read-state:', err);
    return new Set();
  }
}

function saveLocallyReadIds(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch (err) {
    console.error('Failed to save local notification read-state:', err);
  }
}

export function markLocallyRead(ids: string[]) {
  const current = getLocallyReadIds();
  ids.forEach((id) => current.add(id));
  saveLocallyReadIds(current);
}

export function applyLocalReadState(notifications: Notification[]): Notification[] {
  const readIds = getLocallyReadIds();
  return notifications.map((n) =>
    n.is_read || readIds.has(n.id) ? { ...n, is_read: true } : n
  );
}
