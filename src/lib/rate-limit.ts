const hits = new Map<string, { count: number; resetAt: number }>();

type RateLimitResult = {
  limited: boolean;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const current = hits.get(key);

  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    prune(now);
    return { limited: false, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  current.count += 1;

  return {
    limited: current.count > limit,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

function prune(now: number) {
  if (hits.size < 500) {
    return;
  }

  for (const [key, value] of hits) {
    if (value.resetAt <= now) {
      hits.delete(key);
    }
  }
}
