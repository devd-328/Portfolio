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
    const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

    if (isAdminPath && !isLoginPage) {
        if (!user) {
            // no user, potentially respond by redirecting the user to the login page
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }

        // RBAC: Check if user is admin
        // We check app_metadata or user_metadata for role
        const role = user.app_metadata?.role || user.user_metadata?.role;
        if (role !== "admin") {
            const url = request.nextUrl.clone();
            url.pathname = "/"; // Redirect unauthorized to home
            return NextResponse.redirect(url);
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
