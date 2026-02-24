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
    Settings,
    LogOut,
    LogIn,
    ClipboardList
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
        router.push('/');
    };

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, show: isLoggedIn },
        { href: "/staff", label: "Staff", icon: Users, show: isLoggedIn && (role === 'admin' || role === 'meeting_convener') },
        { href: "/meetingmember", label: "Members", icon: UserPlus, show: isLoggedIn && (role === 'admin' || role === 'meeting_convener') },
        { href: "/meetings", label: "Meetings", icon: Calendar, show: isLoggedIn },
        { href: "/meetingtype", label: "Types", icon: ClipboardList, show: isLoggedIn && (role === 'admin' || role === 'meeting_convener') },
    ];

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-zinc-800/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2 group">
                            <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
                                <ClipboardList size={20} />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                                MinutesMaster
                            </span>
                        </Link>

                        {isLoggedIn && (
                            <div className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => link.show && (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive(link.href)
                                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                                            : "text-slate-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                                            }`}
                                    >
                                        <link.icon size={18} />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex flex-col items-end mr-2">
                                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-500 uppercase tracking-wider">{role}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 dark:bg-zinc-800 dark:hover:bg-red-900/20 dark:text-zinc-400 transition-all px-4 py-2 rounded-xl text-sm font-medium"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline">Sign Out</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/"
                                className="btn-primary flex items-center gap-2"
                            >
                                <LogIn size={18} />
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
