"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { ClipboardList, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const data = await loginUser(email, password);

      if (data.access_token) {
        saveToken(data.access_token);
        router.push("/dashboard");
      } else {
        setMessage(data.message || "Invalid credentials provided.");
      }
    } catch (error: any) {
      setMessage(error.message || "A secure connection could not be established.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative decorative elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <div className="m-auto w-full max-w-md px-4 relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-600 p-4 rounded-[2rem] text-white shadow-2xl shadow-indigo-500/30 mb-4 transform hover:scale-110 transition-transform cursor-pointer">
            <ClipboardList size={40} />
          </div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">
            MinutesMaster
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 font-medium">Enterprise Meeting Governance</p>
        </div>

        {/* Login Card */}
        <div className="glass dark:bg-slate-900/50 rounded-[2.5rem] border border-white dark:border-slate-800 p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Secure Sign-In</h2>
            <p className="text-slate-500 dark:text-zinc-500 text-sm mt-1 font-medium">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest ml-1">
                Email Identity
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest ml-1">
                Access Token
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-bold border border-rose-100 dark:border-rose-900/30">
                <ShieldCheck size={18} className="flex-shrink-0" />
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-indigo-500/30"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Authenticate <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium tracking-wide">
              &copy; {new Date().getFullYear()} MinutesMaster Governance Systems. <br />All access is monitored and logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
