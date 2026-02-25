"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToken, logout, getRoleFromToken } from '@/lib/auth';
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Calendar,
    LogOut,
    LogIn,
    ClipboardList,
    Command
} from 'lucide-react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
        setRole(getRoleFromToken());
    }, [pathname]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, show: isLoggedIn },
        { href: "/staff", label: "Staff", icon: Users, show: isLoggedIn && (role === 'admin' || role === 'meeting_convener') },
        { href: "/meetingmember", label: "Members", icon: UserPlus, show: isLoggedIn && (role === 'admin' || role === 'meeting_convener') },
        { href: "/meetings", label: "Meetings", icon: Calendar, show: isLoggedIn },
        { href: "/meetingtype", label: "Types", icon: ClipboardList, show: isLoggedIn && (role === 'admin' || role === 'meeting_convener') },
    ];

    // Hide navbar completely on the login page since it's a fullscreen design
    if (pathname === '/' || pathname === '/login') return null;

    return (
        <nav className="sticky top-0 z-50 bg-[#161224]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[72px]">
                    <div className="flex items-center gap-10">
                        {/* Branding */}
                        <Link href="/dashboard" className="flex items-center gap-3 group">
                            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 shadow-inner border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <Command size={22} className="text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                MinutesMaster
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        {isLoggedIn && (
                            <div className="hidden md:flex items-center gap-2">
                                {navLinks.map((link) => link.show && (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.href)
                                            ? "bg-white/10 text-white shadow-inner border border-white/5"
                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <link.icon size={18} className={isActive(link.href) ? "text-indigo-400" : ""} />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-end px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Role</span>
                                    <span className="text-sm font-semibold text-indigo-300 leading-none capitalize">{role?.replace('_', ' ') || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/5 hover:shadow-red-500/10 active:scale-95"
                                >
                                    <LogOut size={16} strokeWidth={2.5} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/"
                                className="flex items-center gap-2 bg-gradient-to-r from-[#211833] via-[#332560] to-[#594ea5] hover:from-[#2a1e42] hover:via-[#3f2f76] hover:to-[#6a5fc1] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg border border-white/10 transition-all active:scale-95"
                            >
                                <LogIn size={16} strokeWidth={2.5} />
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
