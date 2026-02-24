import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "../../lib/Prisma";
import Link from "next/link";
import deleteMeetingType from "../actions/deleteMeetingType";
import DeleteUserBtn from "../ui/DeleteUserBtn";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Card from "../components/Card";
import { Layers, Plus, FileEdit, Eye, Hash, MessageSquare, Type } from "lucide-react";

async function MeetingTypeList() {
    const session = await requireUser();
    const role = session.role;

    if (role !== 'admin' && role !== 'meeting_convener') {
        redirect("/");
    }

    const data = await prisma.meetingtype.findMany();

    return (
        <div className="bg-pattern min-h-screen pb-12">
            <PageHeader
                title="Meeting Classifications"
                description="Define and manage categories of governance sessions within the organization."
                icon={Layers}
                backHref="/"
                action={{
                    href: "/meetingtype/add",
                    label: "Define Type",
                    icon: Plus
                }}
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
                                        <div className="flex items-center gap-2"><Type size={14} /> classification Name</div>
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2"><MessageSquare size={14} /> Regulatory Remarks</div>
                                    </th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                                            No classification schemas documented.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item: any) => (
                                        <tr key={item.MeetingTypeID} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                                                    {item.MeetingTypeID}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{item.MeetingTypeName}</div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-sm text-slate-500 dark:text-zinc-500 line-clamp-1 italic max-w-md">
                                                    {item.Remarks || "No administrative notes provided."}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/meetingtype/${item.MeetingTypeID}`}
                                                        title="View Details"
                                                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <Link
                                                        href={`/meetingtype/edit/${item.MeetingTypeID}`}
                                                        title="Modify Schema"
                                                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
                                                    >
                                                        <FileEdit size={18} />
                                                    </Link>
                                                    <DeleteUserBtn id={item.MeetingTypeID} deleteFn={deleteMeetingType} />
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

export default MeetingTypeList;
