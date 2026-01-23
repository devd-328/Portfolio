"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Shield, Bell } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account and application preferences.</p>
            </div>

            <div className="grid gap-6">
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

                <Card className="border-border/50">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-purple-400" />
                            <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>Manage your password and authentication settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground italic">Security settings are managed through the Supabase Dashboard.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
