const STORAGE_KEY = "wristnerd-subscriptions";
const SOURCE_KEY = "wristnerd-sub-source";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscriptionResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Validates an email address format.
 */
export function validateEmail(email: string): SubscriptionResult {
  if (!email) {
    return { success: false, error: "Please enter your email address." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  return { success: true };
}

/**
 * Stores an email subscription in localStorage.
 * Returns a result indicating success or the reason for failure.
 */
export function storeSubscription(email: string, source?: string): SubscriptionResult {
  const validation = validateEmail(email);
  if (!validation.success) return validation;

  try {
    const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (stored.includes(email)) {
      return { success: false, error: "This email is already subscribed." };
    }
    stored.push(email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    if (source) {
      localStorage.setItem(SOURCE_KEY, source);
    }
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([email]));
    if (source) {
      localStorage.setItem(SOURCE_KEY, source);
    }
  }

  return { success: true };
}
