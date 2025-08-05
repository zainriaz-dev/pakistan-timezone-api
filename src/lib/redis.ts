import { Redis } from '@upstash/redis';

// Redis instance for rate limiting
export const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Memory fallback for rate limiting when Redis is not available
class MemoryStore {
  private store = new Map<string, { count: number; resetTime: number }>();

  async get(key: string): Promise<number | null> {
    const item = this.store.get(key);
    if (!item) return null;
    
    if (Date.now() > item.resetTime) {
      this.store.delete(key);
      return null;
    }
    
    return item.count;
  }

  async set(key: string, value: number, ttlSeconds: number): Promise<void> {
    this.store.set(key, {
      count: value,
      resetTime: Date.now() + (ttlSeconds * 1000)
    });
  }

  async incr(key: string): Promise<number> {
    const current = await this.get(key);
    const newValue = (current || 0) + 1;
    await this.set(key, newValue, 10); // 10 second TTL
    return newValue;
  }
}

export const memoryStore = new MemoryStore();

// Rate limiting helper
export async function checkRateLimit(ip: string, limit: number = 10, windowSeconds: number = 10): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const key = `rate_limit:${ip}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const resetTime = Math.ceil(now / windowMs) * windowMs;

  try {
    if (redis) {
      // Use Redis for rate limiting
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }
      
      return {
        success: current <= limit,
        limit,
        remaining: Math.max(0, limit - current),
        reset: resetTime
      };
    } else {
      // Use memory store fallback
      const current = await memoryStore.incr(key);
      
      return {
        success: current <= limit,
        limit,
        remaining: Math.max(0, limit - current),
        reset: resetTime
      };
    }
  } catch (error) {
    console.error('Rate limiting error:', error);
    // On error, allow the request
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetTime
    };
  }
}

// Get client IP helper
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  return '127.0.0.1'; // fallback
}