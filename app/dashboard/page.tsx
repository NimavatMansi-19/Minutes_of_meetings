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
    Settings,
    Command,
    Sparkles
} from "lucide-react";

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const session = await requireUser();
    const role = session.role;
    const isAdminOrConvener = role === 'admin' || role === 'meeting_convener';

    return (
        <div className="min-h-full pb-20 pt-8 relative z-10">
            {/* Background elements if needed (optional) */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-4 tracking-widest uppercase shadow-inner">
                            <Sparkles size={14} />
                            Organization Overview
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                            Dashboard
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl font-medium mt-4">
                            Welcome back, <span className="text-white capitalize font-semibold">{role.replace('_', ' ')}</span>.
                            Monitor organization activities and manage your meetings securely matching enterprise standards.
                        </p>
                    </div>

                    <div className="relative z-10 hidden md:flex">
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-inner flex items-center gap-3">
                            <Clock size={18} className="text-indigo-400" />
                            <span className="text-sm font-medium text-white/80 tracking-wide">
                                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {/* Total Staff */}
                    {isAdminOrConvener && (
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] group-hover:bg-indigo-500/30 transition-colors duration-500" />

                            <div className="flex items-start justify-between relative z-10">
                                <div className="bg-white/10 p-3.5 rounded-2xl text-indigo-300 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <Users size={24} strokeWidth={2.5} />
                                </div>
                                <TrendingUp size={20} className="text-emerald-400" />
                            </div>
                            <div className="mt-6 relative z-10">
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Total Staff Assets</p>
                                <h3 className="text-4xl font-black text-white tracking-tight">{stats.totalStaff}</h3>
                            </div>
                            <Link href="/staff" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors relative z-10 group/link">
                                Manage Personnel <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}

                    {/* Active Meetings */}
                    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-500/20 rounded-full blur-[40px] group-hover:bg-rose-500/30 transition-colors duration-500" />

                        <div className="flex items-start justify-between relative z-10">
                            <div className="bg-white/10 p-3.5 rounded-2xl text-rose-300 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Calendar size={24} strokeWidth={2.5} />
                            </div>
                            <div className="text-[10px] font-black tracking-widest text-white/90 bg-rose-500 px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30 border border-rose-400">ACTIVE</div>
                        </div>
                        <div className="mt-6 relative z-10">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Scheduled Meetings</p>
                            <h3 className="text-4xl font-black text-white tracking-tight">{stats.totalMeetings}</h3>
                        </div>
                        <Link href="/meetings" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors relative z-10 group/link">
                            View Repository <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Active Members */}
                    {isAdminOrConvener && (
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] group-hover:bg-emerald-500/30 transition-colors duration-500" />

                            <div className="flex items-start justify-between relative z-10">
                                <div className="bg-white/10 p-3.5 rounded-2xl text-emerald-300 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <UserPlus size={24} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-6 relative z-10">
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Active Members</p>
                                <h3 className="text-4xl font-black text-white tracking-tight">{stats.totalMembers}</h3>
                            </div>
                            <Link href="/meetingmember" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors relative z-10 group/link">
                                Member Directory <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Lower Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Upcoming Agenda */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-full">
                            <div className="px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white/[0.02]">
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Upcoming Agenda</h2>
                                    <p className="text-sm text-white/50 mt-1 font-medium">Review your next scheduled sessions seamlessly</p>
                                </div>
                                <Link href="/meetings" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-bold transition-all active:scale-95 shadow-lg shadow-black/20">
                                    Full Schedule <ChevronRight size={16} strokeWidth={2.5} />
                                </Link>
                            </div>

                            <div className="p-4 flex-1">
                                {stats.upcomingMeetings.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-white/10 bg-white/5 mb-6 shadow-inner">
                                            <Calendar size={32} className="text-white/30" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">No upcoming sessions</h3>
                                        <p className="text-white/50 text-sm max-w-sm">Your schedule is currently clear. New meetings will appear here once they are scheduled.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {stats.upcomingMeetings.map((meeting) => (
                                            <div key={meeting.MeetingID} className="group p-5 rounded-3xl bg-black/20 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-default">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-6">
                                                        <div className="h-16 w-16 shrink-0 rounded-[1.25rem] bg-gradient-to-br from-[#211833]/80 to-[#332560]/80 border border-white/10 flex flex-col items-center justify-center text-white shadow-inner">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">{new Date(meeting.MeetingDate).toLocaleDateString(undefined, { month: 'short' })}</span>
                                                            <span className="text-2xl font-black leading-none mt-1">{new Date(meeting.MeetingDate).getDate()}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white text-lg tracking-wide">
                                                                {meeting.meetingtype?.MeetingTypeName || 'Standard Meeting'}
                                                            </p>
                                                            <div className="mt-1.5 flex items-center gap-2.5 text-sm font-bold text-white/50">
                                                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-white/40" /> {new Date(meeting.MeetingDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                                                <span className="flex items-center gap-1 line-clamp-1">{meeting.MeetingDescription || 'No description assigned'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black tracking-widest uppercase shadow-inner border ${meeting.IsCancelled
                                                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                            }`}>
                                                            {meeting.IsCancelled ? <XCircle size={14} strokeWidth={2.5} /> : <CheckCircle2 size={14} strokeWidth={2.5} />}
                                                            {meeting.IsCancelled ? 'CANCELLED' : 'CONFIRMED'}
                                                        </span>
                                                        <Link href={`/meetings/${meeting.MeetingID}`} className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-white group-hover:bg-indigo-500/20 transition-all duration-300 border border-transparent group-hover:border-indigo-500/30">
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
                        <div className="bg-gradient-to-br from-[#1b1531] to-[#251b42] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border border-white/10 h-full flex flex-col">

                            {/* Decorative background icon */}
                            <div className="absolute -top-10 -right-10 text-white/5 rotate-12 pointer-events-none">
                                <Command size={180} />
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight mb-2 relative z-10 text-white">Command Center</h2>
                            <p className="text-sm text-indigo-200/60 mb-8 font-medium relative z-10 w-full">Quick access to essential actions.</p>

                            <div className="flex-1 space-y-3 relative z-10">
                                {isAdminOrConvener && (
                                    <Link href="/staff/add" className="flex items-center justify-between group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300">
                                        <div className="flex items-center gap-4 text-white/80 group-hover:text-white">
                                            <div className="text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                                <UserPlus size={22} />
                                            </div>
                                            <span className="font-semibold text-sm tracking-wide">Onboard Staff</span>
                                        </div>
                                        <ChevronRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </Link>
                                )}

                                <Link href="/meetings/add" className="flex items-center justify-between group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center gap-4 text-white/80 group-hover:text-white">
                                        <div className="text-rose-400 group-hover:scale-110 transition-transform duration-300">
                                            <Calendar size={22} />
                                        </div>
                                        <span className="font-semibold text-sm tracking-wide">Schedule Meeting</span>
                                    </div>
                                    <ChevronRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                </Link>

                                {isAdminOrConvener && (
                                    <Link href="/meetingmember/add" className="flex items-center justify-between group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300">
                                        <div className="flex items-center gap-4 text-white/80 group-hover:text-white">
                                            <div className="text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                                <Users size={22} />
                                            </div>
                                            <span className="font-semibold text-sm tracking-wide">Assign Members</span>
                                        </div>
                                        <ChevronRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </Link>
                                )}
                            </div>

                            <div className="mt-8 p-5 rounded-[1.25rem] bg-indigo-950/40 border border-indigo-500/20 backdrop-blur-sm relative z-10 shadow-inner">
                                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Sparkles size={12} /> PRO TIP
                                </p>
                                <p className="text-sm text-indigo-200/80 leading-relaxed font-semibold">Use the "Types" module to neatly categorize meetings for better analytics reporting globally.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
