"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Plus,
    Trash2,
    Save,
    Loader2,
    Globe,
    Building2,
    X,
} from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Client = Database["public"]["Tables"]["clients"]["Row"];

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newClient, setNewClient] = useState({
        name: "",
        logo_url: "",
        website_url: "",
        display_order: 0,
    });
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const { data, error } = await (supabase
                .from("clients") as any)
                .select("*")
                .order("display_order");

            if (error) throw error;
            setClients(data || []);
        } catch (error: any) {
            console.error("Error fetching clients:", error);
            toast.error("Failed to load clients");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!newClient.name) {
            toast.error("Client name is required");
            return;
        }
        setSaving(true);
        try {
            const { data, error } = await (supabase
                .from("clients") as any)
                .insert([newClient])
                .select()
                .single();

            if (error) throw error;
            setClients([...clients, data]);
            setIsAdding(false);
            setNewClient({ name: "", logo_url: "", website_url: "", display_order: 0 });
            toast.success("Client added successfully");
        } catch (error: any) {
            toast.error("Error adding client: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!clientToDelete) return;
        setSaving(true);
        try {
            const { error } = await (supabase
                .from("clients") as any)
                .delete()
                .eq("id", clientToDelete.id);

            if (error) throw error;
            setClients(clients.filter(c => c.id !== clientToDelete.id));
            toast.success("Client deleted successfully");
        } catch (error: any) {
            toast.error("Error deleting client: " + error.message);
        } finally {
            setSaving(false);
            setClientToDelete(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Clients & Partners</h1>
                    <p className="text-muted-foreground">
                        Manage logos and links for companies you've worked with
                    </p>
                </div>
                {!isAdding && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        className="bg-brand-start hover:bg-brand-start/90 shadow-lg shadow-brand-start/20"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Client
                    </Button>
                )}
            </div>

            {isAdding && (
                <Card className="border-brand-start/20 bg-muted/20 animate-in fade-in slide-in-from-top-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Add New Client</CardTitle>
                            <CardDescription>Enter company details and logo</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Company Name</Label>
                                    <Input
                                        value={newClient.name}
                                        onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                                        placeholder="e.g. Acme Inc"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Website URL (optional)</Label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-md border border-input bg-background">
                                            <Globe className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                            value={newClient.website_url || ""}
                                            onChange={e => setNewClient({ ...newClient, website_url: e.target.value })}
                                            placeholder="https://..."
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Display Order</Label>
                                    <Input
                                        type="number"
                                        value={newClient.display_order}
                                        onChange={e => setNewClient({ ...newClient, display_order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <ImageUpload
                                    label="Company Logo"
                                    value={newClient.logo_url || ""}
                                    onChange={url => setNewClient({ ...newClient, logo_url: url })}
                                    folder="clients"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button onClick={handleAdd} disabled={saving}>
                                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Client
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <Card key={client.id} className="group relative border-border/50 hover:border-brand-start/30 transition-all overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border/50 bg-background flex items-center justify-center">
                                    {client.logo_url ? (
                                        <img src={client.logo_url} alt={client.name} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <Building2 className="w-8 h-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold truncate">{client.name}</h3>
                                    {client.website_url && (
                                        <a
                                            href={client.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-brand-start hover:underline truncate block"
                                        >
                                            {client.website_url.replace(/^https?:\/\//, '')}
                                        </a>
                                    )}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setClientToDelete(client)}
                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AlertDialog open={!!clientToDelete} onOpenChange={(open) => !open && setClientToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Client?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove "{clientToDelete?.name}" from your portfolio?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={saving}
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
