import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { APP_TITLE } from "@/const";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, navigate] = useLocation();
  
  const loginMutation = trpc.auth.simpleLogin.useMutation({
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      setError(err.message || "Login failed");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-blue-500 border-opacity-30">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#0066ff" }}>
            {APP_TITLE}
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Accedi al tuo account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2"
            >
              {loginMutation.isPending ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded">
            <p className="text-sm text-slate-300">
              <strong>Test Account:</strong>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Email: <code className="bg-slate-700 px-2 py-1 rounded">test@example.com</code>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Password: <code className="bg-slate-700 px-2 py-1 rounded">password123</code>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

