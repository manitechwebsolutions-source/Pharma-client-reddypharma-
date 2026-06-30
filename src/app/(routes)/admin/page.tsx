"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Lock, LogOut, Plus, Pencil, Trash2, RotateCcw, Save, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SiteLayout, Section } from "@/components/site/Layout";
import { CATEGORIES, type Product } from "@/lib/products";
import { useProducts } from "@/lib/productStore";
import { fileToCompressedDataUrl } from "@/lib/image";
import {
  getCurrentAdminSession,
  isSupabaseConfigured,
  signInAdmin,
  signOutAdmin,
} from "@/lib/supabase";
import { toast } from "sonner";

function createProductId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `product-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function emptyProduct(): Product {
  return {
    id: createProductId(),
    name: "",
    category: "Medicines",
    description: "",
    available: true,
    emoji: "💊",
  };
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { products, upsert, remove, reset } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const openNew = () => {
    setEditing(emptyProduct());
    setOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setOpen(true);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      toast.error("Name is required");
      return;
    }
    upsert(editing);
    toast.success("Product saved");
    setOpen(false);
    setEditing(null);
  };

  const del = (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    remove(p.id);
    toast.success("Product deleted");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Admin</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">Product catalog</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage products here.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              if (confirm("Reset to defaults?")) {
                reset();
                toast.success("Reset to defaults");
              }
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <Button variant="outline" className="rounded-full" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
          <Button
            className="rounded-full bg-gradient-to-r from-primary to-primary-glow"
            onClick={openNew}
          >
            <Plus className="h-4 w-4 mr-2" /> New product
          </Button>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
            <div className="flex items-start gap-3">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary to-accent/40 text-3xl">
                  {p.emoji}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-primary">{p.category}</div>
                  <Badge
                    className={`rounded-full ${p.available ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}
                  >
                    {p.available ? "In stock" : "Out"}
                  </Badge>
                </div>
                <h3 className="mt-0.5 font-semibold truncate">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => openEdit(p)}
              >
                <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full text-destructive hover:text-destructive"
                onClick={() => del(p)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            No products yet. Click "New product" to add one.
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing && products.find((x) => x.id === editing.id)
                ? "Edit product"
                : "New product"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Emoji</Label>
                  <Input
                    value={editing.emoji}
                    onChange={(e) => setEditing({ ...editing, emoji: e.target.value })}
                    className="mt-1 w-20 text-center text-xl"
                  />
                </div>
              </div>
              <div>
                <Label>Image</Label>
                <div className="mt-1 flex items-center gap-3">
                  {editing.image ? (
                    <img
                      src={editing.image}
                      alt=""
                      className="h-20 w-20 rounded-xl object-cover border border-border/60"
                    />
                  ) : (
                    <div className="grid h-20 w-20 place-items-center rounded-xl border border-dashed border-border/60 bg-secondary text-3xl">
                      {editing.emoji}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-secondary hover:bg-accent px-4 py-2 text-sm font-medium transition-colors">
                      <ImagePlus className="h-4 w-4" />
                      {editing.image ? "Change image" : "Upload image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          try {
                            const url = await fileToCompressedDataUrl(f);
                            setEditing((prev) => (prev ? { ...prev, image: url } : prev));
                          } catch (err) {
                            toast.error("Could not load image");
                            console.error(err);
                          } finally {
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>
                    {editing.image && (
                      <button
                        type="button"
                        onClick={() => setEditing({ ...editing, image: undefined })}
                        className="text-xs text-destructive hover:underline text-left"
                      >
                        Remove image
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Stored locally in this browser. Auto-resized to 720px.
                </p>
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
                <div>
                  <div className="font-medium text-sm">Available</div>
                  <div className="text-xs text-muted-foreground">Show as in stock</div>
                </div>
                <Switch
                  checked={editing.available}
                  onCheckedChange={(v) => setEditing({ ...editing, available: v })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setOpen(false)}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-primary to-primary-glow"
              onClick={save}
            >
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const { data } = await getCurrentAdminSession();
        if (mounted) {
          setAuthed(Boolean(data.session));
        }
      } catch (error) {
        console.error("Failed to restore admin session", error);
        if (mounted) {
          setAuthed(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured()) {
      toast.error(
        "Connect Supabase first by setting VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
      );
      return;
    }

    setLoading(true);
    try {
      await signInAdmin(email, password);
      setAuthed(true);
      setPassword("");
      toast.success("Welcome back, admin");
    } catch (error) {
      console.error(error);
      toast.error("Please check your Supabase admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOutAdmin();
      setAuthed(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Unable to sign out right now.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <Section>
          <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-card">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-soft">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Checking access...</h1>
            <p className="mt-2 text-sm text-muted-foreground">Verifying your admin session.</p>
          </div>
        </Section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Section>
        {!authed ? (
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border/60 bg-card p-8 shadow-card"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-soft">
                <Lock className="h-5 w-5" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Admin sign-in</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in with your Supabase admin account to manage products.
              </p>
              {!isSupabaseConfigured() && (
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
                  Add your Supabase URL and anon key to enable admin sign-in.
                </div>
              )}
              <form onSubmit={login} className="mt-6 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="h-11"
                    autoFocus
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-full bg-gradient-to-r from-primary to-primary-glow"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </motion.div>
          </div>
        ) : (
          <AdminDashboard onLogout={logout} />
        )}
      </Section>
    </SiteLayout>
  );
}
