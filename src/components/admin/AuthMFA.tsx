"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, Shield, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { trustDevice } from "@/lib/auth/device-trust";

interface AuthMFAProps {
    onSuccess: () => void;
    onCancel?: () => void;
}

/**
 * AuthMFA Component
 * 
 * Displays the MFA challenge screen after password login.
 * Users enter their 6-digit TOTP code to complete authentication.
 * Optionally allows users to "trust this device" to skip MFA on future logins.
 */
export function AuthMFA({ onSuccess, onCancel }: AuthMFAProps) {
    const [verifyCode, setVerifyCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [trustThisDevice, setTrustThisDevice] = useState<boolean>(true);

    const supabase = createClient();

    const handleVerify = async () => {
        if (verifyCode.length !== 6) {
            setError("Please enter a 6-digit code");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Get user's TOTP factors
            const factors = await supabase.auth.mfa.listFactors();
            if (factors.error) {
                setError(factors.error.message);
                setLoading(false);
                return;
            }

            const totpFactor = factors.data.totp[0];

            if (!totpFactor) {
                setError("No 2FA method found. Please contact support.");
                setLoading(false);
                return;
            }

            const factorId = totpFactor.id;

            // Create challenge
            const challenge = await supabase.auth.mfa.challenge({ factorId });
            if (challenge.error) {
                setError(challenge.error.message);
                setLoading(false);
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
                setError("Invalid code. Please try again.");
                setLoading(false);
                return;
            }

            // If user chose to trust this device, store the trust token
            if (trustThisDevice) {
                trustDevice();
            }

            // Success!
            onSuccess();
        } catch (err) {
            setError("Verification failed. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setVerifyCode(value);
        // Auto-submit when 6 digits entered
        if (value.length === 6) {
            setError("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && verifyCode.length === 6) {
            handleVerify();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
                        Two-Factor Authentication
                    </Badge>
                    <h1 className="text-3xl font-bold">Verify Your Identity</h1>
                    <p className="text-muted-foreground mt-2">
                        Enter the code from your authenticator app
                    </p>
                </div>

                <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Shield className="w-8 h-8 text-purple-500" />
                        </div>
                        <CardTitle>Security Verification</CardTitle>
                        <CardDescription className="flex items-center justify-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Open your authenticator app
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Code Input */}
                        <div className="space-y-3">
                            <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="000000"
                                value={verifyCode}
                                onChange={handleCodeChange}
                                onKeyDown={handleKeyDown}
                                className="text-center text-3xl tracking-[0.5em] font-mono h-16 bg-muted/50"
                                maxLength={6}
                                autoFocus
                                disabled={loading}
                            />
                        </div>

                        {/* Trust Device Checkbox */}
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={trustThisDevice}
                                    onChange={(e) => setTrustThisDevice(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 border-2 border-muted-foreground/50 rounded peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-colors flex items-center justify-center">
                                    {trustThisDevice && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Trust this device for 30 days
                            </span>
                        </label>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12"
                            onClick={handleVerify}
                            disabled={loading || verifyCode.length !== 6}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify & Continue"
                            )}
                        </Button>

                        {onCancel && (
                            <Button
                                variant="ghost"
                                className="w-full text-muted-foreground"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancel &amp; Sign Out
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    Having trouble? Check that your device&#39;s time is accurate.
                </p>
            </motion.div>
        </div>
    );
}
