"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@suburban.co.zw");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      router.push("/trips");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Card className="relative w-full max-w-md border-slate-700/50 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <ShieldAlert className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Suburban Security
          </CardTitle>
          <CardDescription className="text-slate-400">
            Cash-in-Transit Operations Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@suburban.co.zw"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-primary pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-800" />
                Remember me
              </label>
              <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </button>
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-center text-xs text-slate-500">
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-3">
              <p className="font-medium text-slate-400 mb-1">Demo Credentials</p>
              <p>Email: admin@suburban.co.zw</p>
              <p>Password: (any password)</p>
            </div>
            <p>© 2024 Suburban Security Services. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
