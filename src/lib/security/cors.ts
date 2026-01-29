import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:3000",
    "https://devdas.tech",
];

export function validateCors(request: Request) {
    const origin = request.headers.get("origin");

    // Allow requests with no origin (like mobile apps or curl) 
    // but for web apps, we usually want to restrict it.
    if (!origin) {
        return true;
    }

    return ALLOWED_ORIGINS.includes(origin);
}

export function corsHeaders(origin: string | null) {
    return {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}

export function handleOptions(request: Request) {
    const origin = request.headers.get("origin");
    if (validateCors(request)) {
        return new NextResponse(null, {
            status: 204,
            headers: corsHeaders(origin),
        });
    }
    return new NextResponse("CORS Error", { status: 403 });
}
