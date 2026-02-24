import React from "react";
import { prisma } from "../../lib/Prisma";
import { requireUser } from "@/lib/session";
import Link from "next/link";
import deleteMeeting from "../actions/deleteMeeting";
import DeleteUserBtn from "../ui/DeleteUserBtn";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Card from "../components/Card";
import { Calendar, Plus, FileEdit, Eye, Hash, Clock, FileText, CheckCircle2, XCircle } from "lucide-react";

async function MeetingList() {
    const session = await requireUser();
    const role = session.role;
    const isAdminOrConvener = role === 'admin' || role === 'meeting_convener';

    let where = {};
    if (role === 'meeting_convener') {
        where = { CreatedBy: session.StaffID };
    }

    const data = await prisma.meetings.findMany({
        where,
        include: {
            meetingtype: true
        }
    });

    return (
        <div className="bg-pattern min-h-screen pb-12">
            <PageHeader
                title="Meeting Records"
                description="Browse and manage all scheduled and historical meetings."
                icon={Calendar}
                backHref="/"
                action={isAdminOrConvener ? {
                    href: "/meetings/add",
                    label: "Schedule Meeting",
                    icon: Plus
                } : undefined}
            />

            <Section>
                <Card noPadding>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2"><Hash size={14} /> ID</div>
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2"><Clock size={14} /> Date & Time</div>
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2"><FileText size={14} /> Type & Description</div>
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                                            No meetings found in the repository.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item: any) => (
                                        <tr key={item.MeetingID} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                                                    {item.MeetingID}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 dark:text-white">
                                                        {new Date(item.MeetingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-zinc-500">
                                                        {new Date(item.MeetingDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded w-fit mb-1">
                                                        {item.meetingtype?.MeetingTypeName || `Type ${item.MeetingTypeID}`}
                                                    </span>
                                                    <span className="font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
                                                        {item.MeetingDescription || "No description provided"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${item.IsCancelled
                                                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                                                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                    }`}>
                                                    {item.IsCancelled ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                                                    {item.IsCancelled ? 'Cancelled' : 'Scheduled'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/meetings/${item.MeetingID}`}
                                                        title="View Details"
                                                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    {isAdminOrConvener && (
                                                        <>
                                                            <Link
                                                                href={`/meetings/edit/${item.MeetingID}`}
                                                                title="Edit Meeting"
                                                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
                                                            >
                                                                <FileEdit size={18} />
                                                            </Link>
                                                            <DeleteUserBtn id={item.MeetingID} deleteFn={deleteMeeting} />
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </Section>
        </div>
    );
}

export default MeetingList;
