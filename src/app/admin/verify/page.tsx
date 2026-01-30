"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthMFA } from "@/components/admin/AuthMFA";

/**
 * MFA Verification Page
 * 
 * This page is shown after successful password login when the user has MFA enabled
 * and the device is not trusted. Users must enter their TOTP code to proceed.
 */
export default function VerifyPage() {
    const router = useRouter();
    const supabase = createClient();

    const handleSuccess = () => {
        router.push("/admin");
        router.refresh();
    };

    const handleCancel = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <AuthMFA
            onSuccess={handleSuccess}
            onCancel={handleCancel}
        />
    );
}
