"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle2, Smartphone, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface EnrollMFAProps {
    onEnrolled: () => void;
    onCancelled: () => void;
}

/**
 * EnrollMFA Component
 * 
 * Displays a QR code for users to scan with Google Authenticator or similar apps.
 * After scanning, users verify with a 6-digit code to complete enrollment.
 */
export function EnrollMFA({ onEnrolled, onCancelled }: EnrollMFAProps) {
    const [factorId, setFactorId] = useState<string>("");
    const [qr, setQR] = useState<string>("");
    const [secret, setSecret] = useState<string>("");
    const [verifyCode, setVerifyCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [showSecret, setShowSecret] = useState<boolean>(false);

    const supabase = createClient();

    useEffect(() => {
        const enrollFactor = async () => {
            try {
                // First, check for existing factors and remove ALL of them to start fresh
                const { data: existingFactors } = await supabase.auth.mfa.listFactors();

                if (existingFactors?.totp && existingFactors.totp.length > 0) {
                    // Unenroll ALL existing TOTP factors to avoid name conflicts
                    for (const factor of existingFactors.totp) {
                        try {
                            await supabase.auth.mfa.unenroll({ factorId: factor.id });
                        } catch (e) {
                            console.log("Failed to unenroll factor:", factor.id, e);
                        }
                    }
                }

                // Now enroll a new factor with unique name
                const { data, error } = await supabase.auth.mfa.enroll({
                    factorType: "totp",
                    friendlyName: `Authenticator App`,
                });

                if (error) {
                    setError(error.message);
                    return;
                }

                if (data) {
                    setFactorId(data.id);
                    setQR(data.totp.qr_code);
                    setSecret(data.totp.secret);
                }
            } catch (err) {
                setError("Failed to initialize 2FA setup");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        enrollFactor();
    }, [supabase]);

    const handleVerify = async () => {
        if (verifyCode.length !== 6) {
            setError("Please enter a 6-digit code");
            return;
        }

        setVerifying(true);
        setError("");

        try {
            // Create challenge
            const challenge = await supabase.auth.mfa.challenge({ factorId });
            if (challenge.error) {
                setError(challenge.error.message);
                setVerifying(false);
                return;
            }

            const challengeId = challenge.data.id;

            // Verify the code
            const verify = await supabase.auth.mfa.verify({
                factorId,
                challengeId,
                code: verifyCode,
            });

            if (verify.error) {
                setError(verify.error.message);
                setVerifying(false);
                return;
            }

            // Success!
            onEnrolled();
        } catch (err) {
            setError("Verification failed. Please try again.");
            console.error(err);
        } finally {
            setVerifying(false);
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setVerifyCode(value);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-border/50 bg-background/50 backdrop-blur-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-purple-500" />
                    </div>
                    <CardTitle>Setup Two-Factor Authentication</CardTitle>
                    <CardDescription>
                        Scan the QR code with Google Authenticator, Authy, or any TOTP app
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* QR Code */}
                    <div className="flex flex-col items-center gap-4">
                        {qr && (
                            <div className="p-4 bg-white rounded-xl">
                                <img
                                    src={qr}
                                    alt="QR Code for 2FA setup"
                                    className="w-48 h-48"
                                />
                            </div>
                        )}

                        {/* Manual Entry Option */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setShowSecret(!showSecret)}
                                className="text-sm text-muted-foreground hover:text-foreground underline"
                            >
                                {showSecret ? "Hide" : "Can't scan?"} Show manual code
                            </button>
                            {showSecret && secret && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-2 p-3 bg-muted rounded-lg"
                                >
                                    <p className="text-xs text-muted-foreground mb-1">Manual entry code:</p>
                                    <code className="text-sm font-mono break-all select-all">{secret}</code>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Verification Code Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Enter verification code
                        </label>
                        <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="000000"
                            value={verifyCode}
                            onChange={handleCodeChange}
                            className="text-center text-2xl tracking-[0.5em] font-mono"
                            maxLength={6}
                            autoFocus
                        />
                        <p className="text-xs text-muted-foreground text-center">
                            Enter the 6-digit code from your authenticator app
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onCancelled}
                        disabled={verifying}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={handleVerify}
                        disabled={verifying || verifyCode.length !== 6}
                    >
                        {verifying ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Enable 2FA
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
