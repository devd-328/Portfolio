import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getRateLimit, rateLimitResponse } from "../security/rate-limit";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Rate Limiting for API routes
    if (request.nextUrl.pathname.startsWith("/api")) {
        const ip = request.headers.get("x-forwarded-for") || "anonymous";
        const limitResult = getRateLimit(ip);
        if (limitResult.isLimited) {
            return rateLimitResponse(limitResult);
        }
    }

    // refreshing the auth token
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isLoginPage = request.nextUrl.pathname === "/admin/login";
    const isVerifyPage = request.nextUrl.pathname === "/admin/verify";
    const isAuthPage = isLoginPage || isVerifyPage;
    const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

    if (isAdminPath && !isAuthPage) {
        if (!user) {
            // no user, redirect to login page
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }

        // Check Multi-Factor Authentication (MFA)
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        if (aal?.nextLevel === "aal2" && aal?.currentLevel !== "aal2") {
            // User has MFA enabled but hasn't verified this session
            // Check for trusted device cookie
            const isTrusted = request.cookies.has("portfolio_admin_device_trust");

            if (!isTrusted) {
                // Not trusted and MFA needed, redirect to verify page
                const url = request.nextUrl.clone();
                url.pathname = "/admin/verify";
                return NextResponse.redirect(url);
            }
        }
    }

    if (isLoginPage && user) {
        // user is logged in, no need to see the login page
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
