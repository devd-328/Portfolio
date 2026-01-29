import { NextResponse } from "next/server";

// Simple in-memory rate limiter for serverless environment
// Note: This is not shared across instances in a truly distributed setup
// For production, use Upstash Redis or similar.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // Default limit

export function getRateLimit(ip: string, limit = MAX_REQUESTS) {
    const now = Date.now();
    const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userData.lastReset > WINDOW_MS) {
        userData.count = 1;
        userData.lastReset = now;
    } else {
        userData.count++;
    }

    rateLimitMap.set(ip, userData);

    return {
        isLimited: userData.count > limit,
        remaining: Math.max(0, limit - userData.count),
        reset: userData.lastReset + WINDOW_MS,
    };
}

export function rateLimitResponse(data: { remaining: number; reset: number }, limit = MAX_REQUESTS) {
    return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": data.remaining.toString(),
            "X-RateLimit-Reset": data.reset.toString(),
            "Retry-After": Math.ceil((data.reset - Date.now()) / 1000).toString(),
        },
    });
}
