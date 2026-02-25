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
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5 bg-white backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-slate-200">
                            <Sparkles size={14} />
                            Organization Overview
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
                            Dashboard
                        </h1>
                        <p className="text-lg text-gray-700 max-w-2xl font-medium mt-4">
                            Welcome back, <span className="text-black capitalize font-semibold">{role.replace('_', ' ')}</span>.
                            Monitor organization activities and manage your meetings securely matching enterprise standards.
                        </p>
                    </div>

                    <div className="relative z-10 hidden md:flex">
                        <div className="bg-slate-100/50 backdrop-blur-xl border border-slate-200 px-5 py-3 rounded-2xl shadow-inner flex items-center gap-3">
                            <Clock size={18} className="text-indigo-400" />
                            <span className="text-sm font-medium text-gray-800 tracking-wide">
                                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {/* Total Staff */}
                    {isAdminOrConvener && (
                        <div className="group relative bg-white backdrop-blur-xl border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden hover:bg-slate-50 transition-colors duration-500">
                            

                            <div className="flex items-start justify-between relative z-10">
                                <div className="bg-slate-50/50 p-2.5 rounded-xl text-indigo-600 border border-slate-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <Users size={20} strokeWidth={2.5} />
                                </div>
                                <TrendingUp size={20} className="text-sky-500" />
                            </div>
                            <div className="mt-4 relative z-10">
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Total Personnel</p>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalStaff}</h3>
                            </div>
                            <Link href="/staff" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-600 transition-colors relative z-10 group/link">
                                View Roster <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}

                    {/* Active Meetings */}
                    <div className="group relative bg-white backdrop-blur-xl border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden hover:bg-slate-50 transition-colors duration-500">
                        

                        <div className="flex items-start justify-between relative z-10">
                            <div className="bg-slate-50/50 p-2.5 rounded-xl text-amber-700 border border-slate-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Calendar size={20} strokeWidth={2.5} />
                            </div>
                            <div className="text-[10px] font-black tracking-widest text-gray-900 bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full shadow-sm shadow-amber-100 border border-amber-600">ACTIVE</div>
                        </div>
                        <div className="mt-4 relative z-10">
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Total Meetings</p>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalMeetings}</h3>
                        </div>
                        <Link href="/meetings" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors relative z-10 group/link">
                            Open Registry <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Active Members */}
                    {isAdminOrConvener && (
                        <div className="group relative bg-white backdrop-blur-xl border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden hover:bg-slate-50 transition-colors duration-500">
                            

                            <div className="flex items-start justify-between relative z-10">
                                <div className="bg-slate-50/50 p-2.5 rounded-xl text-sky-600 border border-slate-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <UserPlus size={20} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-4 relative z-10">
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Active Members</p>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalMembers}</h3>
                            </div>
                            <Link href="/meetingmember" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors relative z-10 group/link">
                                Member Directory <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Lower Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Upcoming Agenda */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50/50">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Upcoming Agenda</h2>
                                    <p className="text-sm text-gray-600 mt-1 font-medium">Review your next scheduled sessions seamlessly</p>
                                </div>
                                <Link href="/meetings" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-black text-sm font-bold transition-all active:scale-95 shadow-sm shadow-black/20">
                                    Full Schedule <ChevronRight size={16} strokeWidth={2.5} />
                                </Link>
                            </div>

                            <div className="p-4 flex-1">
                                {stats.upcomingMeetings.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-slate-200 bg-white mb-6 shadow-inner">
                                            <Calendar size={32} className="text-black/30" />
                                        </div>
                                        <h3 className="text-lg font-bold text-black mb-2">No upcoming sessions</h3>
                                        <p className="text-gray-600 text-sm max-w-sm">Your schedule is currently clear. New meetings will appear here once they are scheduled.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {stats.upcomingMeetings.map((meeting) => (
                                            <div key={meeting.MeetingID} className="group p-5 rounded-3xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-300 cursor-default">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-5">
                                                        <div className="h-16 w-16 shrink-0 rounded-[1.25rem] bg-indigo-50 border border-slate-200 flex flex-col items-center justify-center text-black shadow-inner">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{new Date(meeting.MeetingDate).toLocaleDateString(undefined, { month: 'short' })}</span>
                                                            <span className="text-2xl font-black leading-none mt-1">{new Date(meeting.MeetingDate).getDate()}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-black text-lg tracking-wide">
                                                                {meeting.meetingtype?.MeetingTypeName || 'Standard Meeting'}
                                                            </p>
                                                            <div className="mt-1.5 flex items-center gap-2.5 text-sm font-bold text-gray-600">
                                                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {new Date(meeting.MeetingDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-200/50"></span>
                                                                <span className="flex items-center gap-1 line-clamp-1">{meeting.MeetingDescription || 'No description assigned'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black tracking-widest uppercase shadow-inner border ${meeting.IsCancelled
                                                            ? 'bg-amber-100 text-amber-900 font-bold/10 text-amber-600 border-amber-200'
                                                            : 'bg-sky-50 text-sky-500 border-sky-200'
                                                            }`}>
                                                            {meeting.IsCancelled ? <XCircle size={14} strokeWidth={2.5} /> : <CheckCircle2 size={14} strokeWidth={2.5} />}
                                                            {meeting.IsCancelled ? 'CANCELLED' : 'CONFIRMED'}
                                                        </span>
                                                        <Link href={`/meetings/${meeting.MeetingID}`} className="p-2.5 rounded-xl bg-white text-slate-400 group-hover:text-black group-hover:bg-indigo-500/20 transition-all duration-300 border border-transparent group-hover:border-indigo-500/30">
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
                        <div className="bg-white rounded-3xl p-8 text-black shadow-sm relative overflow-hidden border border-slate-200 h-full flex flex-col">

                            {/* Decorative background icon */}
                            <div className="absolute -top-10 -right-10 text-black/5 rotate-12 pointer-events-none">
                                <Command size={180} />
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight mb-2 relative z-10 text-black">Command Center</h2>
                            <p className="text-sm text-gray-600 mb-8 font-medium relative z-10 w-full">Quick access to essential actions.</p>

                            <div className="flex-1 space-y-3 relative z-10">
                                {isAdminOrConvener && (
                                    <Link href="/staff/add" className="flex items-center justify-between group p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all duration-300">
                                        <div className="flex items-center gap-4 text-gray-800 group-hover:text-black">
                                            <div className="text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                                <UserPlus size={22} />
                                            </div>
                                            <span className="font-semibold text-sm tracking-wide">Onboard Staff</span>
                                        </div>
                                        <ChevronRight size={18} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                                    </Link>
                                )}

                                <Link href="/meetings/add" className="flex items-center justify-between group p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all duration-300">
                                    <div className="flex items-center gap-4 text-gray-800 group-hover:text-black">
                                        <div className="text-amber-600 group-hover:scale-110 transition-transform duration-300">
                                            <Calendar size={22} />
                                        </div>
                                        <span className="font-semibold text-sm tracking-wide">Schedule Meeting</span>
                                    </div>
                                    <ChevronRight size={18} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                                </Link>

                                {isAdminOrConvener && (
                                    <Link href="/meetingmember/add" className="flex items-center justify-between group p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all duration-300">
                                        <div className="flex items-center gap-4 text-gray-800 group-hover:text-black">
                                            <div className="text-sky-500 group-hover:scale-110 transition-transform duration-300">
                                                <Users size={22} />
                                            </div>
                                            <span className="font-semibold text-sm tracking-wide">Assign Members</span>
                                        </div>
                                        <ChevronRight size={18} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                                    </Link>
                                )}
                            </div>

                            <div className="mt-8 p-5 rounded-[1.25rem] bg-indigo-50 border border-indigo-100 relative z-10 shadow-inner">
                                <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Sparkles size={12} /> PRO TIP
                                </p>
                                <p className="text-sm text-indigo-700/80 leading-relaxed font-semibold">Use the "Types" module to neatly categorize meetings for better analytics reporting globally.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
