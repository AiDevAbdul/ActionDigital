// src/lib/rateLimit.ts
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

const getStore = () => {
  const globalStore = global as typeof global & { __rateLimitStore?: Map<string, RateLimitEntry> };
  if (!globalStore.__rateLimitStore) {
    globalStore.__rateLimitStore = new Map();
  }
  return globalStore.__rateLimitStore;
};

export const rateLimit = (key: string, windowMs: number, max: number): RateLimitResult => {
  const store = getStore();
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    const entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { ok: true, remaining: max - 1, resetAt: entry.resetAt };
  }

  if (current.count >= max) {
    return { ok: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  store.set(key, current);
  return { ok: true, remaining: max - current.count, resetAt: current.resetAt };
};
