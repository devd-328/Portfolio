import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { Database } from '@/types/supabase'

export async function createClient() {
    let cookieStore: ReadonlyRequestCookies | undefined;
    try {
        cookieStore = await cookies();
    } catch {
        // cookies() were called outside a request scope (e.g. build time)
    }

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
        {
            cookies: {
                getAll() {
                    return cookieStore?.getAll() ?? []
                },
                setAll(cookiesToSet) {
                    if (!cookieStore) return;
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                    }
                },
            },
        }
    )
}
