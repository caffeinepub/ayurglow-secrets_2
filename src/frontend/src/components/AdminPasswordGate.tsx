import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";

// Change this password to whatever you want
const ADMIN_PASSWORD = "AyurGlow@2024";
const SESSION_KEY = "ayurglow_admin_auth";

interface AdminPasswordGateProps {
  children: React.ReactNode;
}

export default function AdminPasswordGate({
  children,
}: AdminPasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  if (isLoading) return null;

  if (isAuthenticated) return <>{children}</>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(0.97_0.02_230)] to-[oklch(0.95_0.03_155)] px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-white shadow-xl p-8 space-y-6">
          {/* Icon */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[oklch(0.38_0.12_225)] flex items-center justify-center shadow-md">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="font-display text-xl font-bold text-[oklch(0.25_0.1_230)]">
                Admin Access
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AyurGlow Secrets — Enter password to continue
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`mt-1 ${error ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive mt-1.5">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[oklch(0.38_0.12_225)] hover:bg-[oklch(0.32_0.12_225)] text-white"
            >
              Unlock Admin Panel
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Public visitors cannot access this page without the password.
          </p>
        </div>
      </div>
    </main>
  );
}
