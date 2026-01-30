"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User, Shield, Loader2, CheckCircle2, XCircle, Smartphone, Trash2 } from "lucide-react";
import { EnrollMFA } from "@/components/admin/EnrollMFA";
import { revokeDeviceTrust, isDeviceTrusted, getDeviceTrustExpiration } from "@/lib/auth/device-trust";
import { toast } from "sonner";

interface MFAFactor {
    id: string;
    friendly_name?: string;
    factor_type: string;
    status: string;
    created_at: string;
}

export default function AdminSettingsPage() {
    const [mfaFactors, setMfaFactors] = useState<MFAFactor[]>([]);
    const [hasMFA, setHasMFA] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showEnrollDialog, setShowEnrollDialog] = useState<boolean>(false);
    const [showDisableDialog, setShowDisableDialog] = useState<boolean>(false);
    const [disabling, setDisabling] = useState<boolean>(false);
    const [deviceTrusted, setDeviceTrusted] = useState<boolean>(false);
    const [trustExpiration, setTrustExpiration] = useState<Date | null>(null);

    const supabase = createClient();

    const loadMFAStatus = async () => {
        try {
            const { data, error } = await supabase.auth.mfa.listFactors();
            if (error) {
                console.error("Failed to load MFA factors:", error);
                return;
            }

            const verifiedFactors = data.totp.filter(f => f.status === "verified");
            setMfaFactors(verifiedFactors);
            setHasMFA(verifiedFactors.length > 0);
        } catch (error) {
            console.error("Error loading MFA status:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMFAStatus();
        setDeviceTrusted(isDeviceTrusted());
        setTrustExpiration(getDeviceTrustExpiration());
    }, []);

    const handleEnrollSuccess = () => {
        setShowEnrollDialog(false);
        loadMFAStatus();
        toast.success("Two-factor authentication enabled successfully!");
    };

    const handleDisableMFA = async () => {
        if (mfaFactors.length === 0) return;

        setDisabling(true);
        try {
            // Unenroll all TOTP factors
            for (const factor of mfaFactors) {
                const { error } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
                if (error) {
                    toast.error(`Failed to disable 2FA: ${error.message}`);
                    setDisabling(false);
                    return;
                }
            }

            // Also revoke device trust
            revokeDeviceTrust();
            setDeviceTrusted(false);
            setTrustExpiration(null);

            toast.success("Two-factor authentication disabled");
            setShowDisableDialog(false);
            loadMFAStatus();
        } catch (error) {
            console.error("Error disabling MFA:", error);
            toast.error("Failed to disable 2FA");
        } finally {
            setDisabling(false);
        }
    };

    const handleRevokeDeviceTrust = () => {
        revokeDeviceTrust();
        setDeviceTrusted(false);
        setTrustExpiration(null);
        toast.success("Device trust revoked. You'll need to verify with 2FA on next login.");
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account and application preferences.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <Card className="border-border/50">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-purple-400" />
                            <CardTitle>Profile Information</CardTitle>
                        </div>
                        <CardDescription>Update your personal details and how people see you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Public Status</p>
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Role</p>
                                <p className="text-sm text-muted-foreground">Administrator</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security / 2FA Section */}
                <Card className="border-border/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-purple-400" />
                                <CardTitle>Two-Factor Authentication</CardTitle>
                            </div>
                            {!loading && (
                                hasMFA ? (
                                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Enabled
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                                        <XCircle className="w-3 h-3 mr-1" />
                                        Disabled
                                    </Badge>
                                )
                            )}
                        </div>
                        <CardDescription>
                            Add an extra layer of security to your account using Google Authenticator or similar apps.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loading ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading security settings...
                            </div>
                        ) : hasMFA ? (
                            <div className="space-y-4">
                                {/* MFA Factor Info */}
                                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Smartphone className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Authenticator App</p>
                                            <p className="text-sm text-muted-foreground">
                                                {mfaFactors[0]?.friendly_name || "TOTP"} • Added {mfaFactors[0]?.created_at ? new Date(mfaFactors[0].created_at).toLocaleDateString() : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Device Trust Status */}
                                {deviceTrusted && (
                                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-purple-400">This Device is Trusted</p>
                                                <p className="text-sm text-muted-foreground">
                                                    2FA is skipped until {formatDate(trustExpiration)}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                                onClick={handleRevokeDeviceTrust}
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Revoke
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    variant="destructive"
                                    className="w-full sm:w-auto"
                                    onClick={() => setShowDisableDialog(true)}
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Disable 2FA
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Protect your admin account by requiring a verification code from your phone in addition to your password.
                                </p>
                                <Button
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                    onClick={() => setShowEnrollDialog(true)}
                                >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Enable Two-Factor Authentication
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Enroll MFA Dialog */}
            <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
                        <DialogDescription>
                            Scan the QR code with your authenticator app to enable 2FA
                        </DialogDescription>
                    </DialogHeader>
                    <EnrollMFA
                        onEnrolled={handleEnrollSuccess}
                        onCancelled={() => setShowEnrollDialog(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Disable MFA Confirmation Dialog */}
            <Dialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-red-500">Disable Two-Factor Authentication?</DialogTitle>
                        <DialogDescription>
                            This will remove the extra security layer from your account. You can always re-enable it later.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setShowDisableDialog(false)}
                            disabled={disabling}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDisableMFA}
                            disabled={disabling}
                        >
                            {disabling ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Disabling...
                                </>
                            ) : (
                                "Disable 2FA"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
