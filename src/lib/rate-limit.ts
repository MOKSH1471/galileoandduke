import { createHash } from 'node:crypto';

// Per-process protection. Use a shared limiter or gateway limits across replicas.
export function createRateLimiter(maxEntries = 10000) {
    const buckets = new Map<string, { count: number; resetAt: number }>();
    return (key: string, limit: number, windowMs: number, now = Date.now()) => {
        for (const [id, bucket] of buckets) {
            if (bucket.resetAt <= now) buckets.delete(id);
        }
        let bucket = buckets.get(key);
        if (!bucket) {
            if (buckets.size >= maxEntries) return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };
            bucket = { count: 0, resetAt: now + windowMs };
            buckets.set(key, bucket);
        }
        const allowed = bucket.count < limit;
        if (allowed) bucket.count++;
        return { allowed, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
    };
}

const consume = createRateLimiter();

export function limitRequest(req: Request, endpoint: 'contact'): Response | null {
    // Never trust an arbitrary forwarded header without proxy configuration.
    const header = process.env.RATE_LIMIT_IP_HEADER;
    const identity = header ? req.headers.get(header)?.split(',')[0].trim() : undefined;
    const key = identity
        ? createHash('sha256').update(identity).digest('hex') : 'anonymous';
    const limit = identity ? 5 : 60;
    const result = consume(`${endpoint}:${key}`, limit, 60_000);
    return result.allowed ? null : Response.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(result.retryAfter) } },
    );
}
