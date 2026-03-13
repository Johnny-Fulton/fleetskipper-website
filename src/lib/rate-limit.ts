// Simple in-memory rate limiting
// For production, use Redis or a dedicated rate limiting service

const rateLimit = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per interval
}

export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { interval: 60000, maxRequests: 10 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  // Clean up old entries periodically
  if (rateLimit.size > 1000) {
    for (const [key, value] of rateLimit.entries()) {
      if (value.resetTime < now) {
        rateLimit.delete(key);
      }
    }
  }

  if (!record || record.resetTime < now) {
    // Create new record
    const resetTime = now + options.interval;
    rateLimit.set(identifier, { count: 1, resetTime });
    return {
      success: true,
      remaining: options.maxRequests - 1,
      reset: resetTime,
    };
  }

  if (record.count >= options.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  // Increment count
  record.count++;
  return {
    success: true,
    remaining: options.maxRequests - record.count,
    reset: record.resetTime,
  };
}

// Helper to get client IP from request
export function getClientIp(request: Request): string {
  // Check various headers that might contain the real IP
  const headers = request.headers;
  const possibleHeaders = [
    'x-real-ip',
    'x-forwarded-for',
    'x-client-ip',
    'x-cluster-client-ip',
    'cf-connecting-ip', // Cloudflare
    'fastly-client-ip', // Fastly
    'true-client-ip', // Akamai and Cloudflare
    'x-forwarded',
    'forwarded-for',
    'forwarded',
  ];

  for (const header of possibleHeaders) {
    const value = headers.get(header);
    if (value) {
      // x-forwarded-for may contain multiple IPs, take the first one
      const ip = value.split(',')[0].trim();
      if (ip) return ip;
    }
  }

  // Fallback to a default
  return '127.0.0.1';
}

// Rate limiter specifically for API routes
export async function rateLimitApi(
  request: Request,
  options?: RateLimitOptions
): Promise<Response | null> {
  const ip = getClientIp(request);
  const { success, remaining, reset } = await checkRateLimit(ip, options);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests. Please try again later.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(options?.maxRequests || 10),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }

  // Return null to indicate the request should proceed
  return null;
}