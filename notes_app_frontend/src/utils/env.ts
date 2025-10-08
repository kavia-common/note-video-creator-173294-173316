export const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (isBrowser && typeof window.localStorage !== "undefined") {
        return window.localStorage.getItem(key);
      }
    } catch {
      // ignore
    }
    return null;
  },
  setItem(key: string, value: string) {
    try {
      if (isBrowser && typeof window.localStorage !== "undefined") {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // ignore
    }
  },
};

export const safeUUID = (): string => {
  try {
    const c: any = typeof globalThis !== "undefined" ? (globalThis as any).crypto : undefined;
    if (isBrowser && c && typeof c.randomUUID === "function") {
      return c.randomUUID();
    }
  } catch {
    // ignore
  }
  // Fallback
  return `id_${Math.random().toString(36).slice(2)}_${Date.now()}`;
};
