import Link from "next/link";
import { getDashboardStats } from "@/app/actions/getDashboardStats";
import { requireUser } from "@/lib/session";
import {
    Users,
    Calendar,
    UserPlus,
    ChevronRight,
    Clock,
    CheckCircle2,
    XCircle,
    TrendingUp,
    ArrowRight,
    Settings
} from "lucide-react";

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const session = await requireUser();
    const role = session.role;
    const isAdminOrConvener = role === 'admin' || role === 'meeting_convener';

    return (
        <div className="min-h-[calc(100-64px)] bg-pattern pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Dashboard <span className="text-indigo-600 dark:text-indigo-400">Overview</span>
                            </h1>
                            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                                Welcome back, <span className="font-semibold text-slate-900 dark:text-slate-200 capitalize">{role}</span>.
                                Monitor organization activities and manage meetings efficiently.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <Clock size={16} className="text-indigo-500" />
                                    <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                    {/* Total Staff Card */}
                    {isAdminOrConvener && (
                        <div className="glass group card-shine rounded-3xl p-1 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
                            <div className="bg-white dark:bg-slate-900/50 rounded-[22px] p-6">
                                <div className="flex items-start justify-between">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                        <Users size={24} />
                                    </div>
                                    <TrendingUp size={20} className="text-emerald-500" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Staff Assets</p>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalStaff}</h3>
                                </div>
                                <Link href="/staff" className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all">
                                    Manage Personnel <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Total Meetings Card */}
                    <div className="glass group card-shine rounded-3xl p-1 shadow-lg shadow-rose-500/5 hover:shadow-rose-500/10 transition-all duration-300">
                        <div className="bg-white dark:bg-slate-900/50 rounded-[22px] p-6">
                            <div className="flex items-start justify-between">
                                <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-2xl text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                                    <Calendar size={24} />
                                </div>
                                <div className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">ACTIVE</div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Scheduled Meetings</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalMeetings}</h3>
                            </div>
                            <Link href="/meetings" className="mt-6 flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:gap-3 transition-all">
                                View Repository <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Meeting Members Card */}
                    {isAdminOrConvener && (
                        <div className="glass group card-shine rounded-3xl p-1 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300">
                            <div className="bg-white dark:bg-slate-900/50 rounded-[22px] p-6">
                                <div className="flex items-start justify-between">
                                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                        <UserPlus size={24} />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Members</p>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalMembers}</h3>
                                </div>
                                <Link href="/meetingmember" className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-3 transition-all">
                                    Member Directory <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upcoming Meetings Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Agenda</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review your next scheduled sessions</p>
                                </div>
                                <Link href="/meetings" className="btn-primary flex items-center gap-2">
                                    Full Schedule <ChevronRight size={18} />
                                </Link>
                            </div>

                            <div className="p-2">
                                {stats.upcomingMeetings.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <div className="inline-flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                                            <Calendar size={32} className="text-slate-300 dark:text-slate-600" />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium">No upcoming sessions found.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {stats.upcomingMeetings.map((meeting) => (
                                            <div key={meeting.MeetingID} className="p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                            <span className="text-xs font-bold uppercase">{new Date(meeting.MeetingDate).toLocaleDateString(undefined, { month: 'short' })}</span>
                                                            <span className="text-xl font-black">{new Date(meeting.MeetingDate).getDate()}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 dark:text-white text-lg">
                                                                {meeting.meetingtype?.MeetingTypeName || 'Standard Meeting'}
                                                            </p>
                                                            <div className="mt-1 flex items-center gap-x-3 text-sm text-slate-500 dark:text-slate-400">
                                                                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(meeting.MeetingDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <span>&bull;</span>
                                                                <span className="flex items-center gap-1 line-clamp-1">{meeting.MeetingDescription || 'No description available'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${meeting.IsCancelled
                                                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                                                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                            }`}>
                                                            {meeting.IsCancelled ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                                                            {meeting.IsCancelled ? 'Cancelled' : 'Confirmed'}
                                                        </span>
                                                        <Link href={`/meetings/${meeting.MeetingID}`} className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all opacity-0 group-hover:opacity-100">
                                                            <ChevronRight size={20} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 dark:bg-indigo-950 rounded-[32px] p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Settings size={120} />
                            </div>

                            <h2 className="text-2xl font-bold mb-6 relative z-10">Command Center</h2>
                            <div className="space-y-4 relative z-10">
                                {isAdminOrConvener && (
                                    <Link href="/staff/add" className="flex items-center justify-between group p-2">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all">
                                                <UserPlus size={20} />
                                            </div>
                                            <span className="font-semibold">Onboard Staff</span>
                                        </div>
                                        <ChevronRight size={20} className="text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                    </Link>
                                )}

                                <Link href="/meetings/add" className="flex items-center justify-between group p-2">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-rose-500 transition-all">
                                            <Calendar size={20} />
                                        </div>
                                        <span className="font-semibold">Schedule Meeting</span>
                                    </div>
                                    <ChevronRight size={20} className="text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                </Link>

                                {isAdminOrConvener && (
                                    <Link href="/meetingmember/add" className="flex items-center justify-between group p-2">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-emerald-500 transition-all">
                                                <Users size={20} />
                                            </div>
                                            <span className="font-semibold">Assign Members</span>
                                        </div>
                                        <ChevronRight size={20} className="text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                            </div>

                            <div className="mt-12 p-6 rounded-3xl bg-white/5 border border-white/10">
                                <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-2">Pro Tip</p>
                                <p className="text-sm text-indigo-100/70 leading-relaxed font-medium">Use the "Types" module to categorize meetings for better analytics reporting.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
