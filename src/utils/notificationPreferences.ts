/**
 * Local, per-device notification preferences. There is no backend endpoint for
 * notification preferences yet, so these are stored in localStorage only and will
 * not sync across devices.
 */

const STORAGE_KEY = 'wazobiatax.notificationPreferences';

export interface NotificationPreferences {
  push: boolean;
  sms: boolean;
  email: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  push: true,
  sms: true,
  email: false,
};

export function getNotificationPreferences(): NotificationPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to read notification preferences:', err);
    return DEFAULT_PREFERENCES;
  }
}

export function saveNotificationPreferences(prefs: NotificationPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save notification preferences:', err);
  }
}
