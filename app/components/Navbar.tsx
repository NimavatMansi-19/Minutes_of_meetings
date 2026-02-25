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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[72px]">
                    <div className="flex items-center gap-10">
                        {/* Branding */}
                        <Link href="/dashboard" className="flex items-center gap-2.5 group">
                            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-8 h-8 rounded-lg shadow-md border border-indigo-500/10 flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-300">
                                <Command size={18} className="text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-black block">
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
                                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive(link.href)
                                            ? "bg-slate-100/80 text-indigo-700 shadow-sm border border-slate-200"
                                            : "text-gray-700 hover:bg-slate-50 hover:text-black"
                                            }`}
                                    >
                                        <link.icon size={16} className={isActive(link.href) ? "text-indigo-600" : "text-slate-400"} />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex flex-col items-end px-3 py-1 bg-transparent">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Role</span>
                                    <span className="text-sm font-bold text-gray-800 leading-none capitalize">{role?.replace('_', ' ') || 'User'}</span>
                                </div>
                                <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 hover:bg-amber-50 text-gray-600 hover:text-amber-700 transition-colors px-3 py-1.5 rounded-lg text-sm font-semibold"
                                >
                                    <LogOut size={16} strokeWidth={2.5} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/"
                                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors"
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
