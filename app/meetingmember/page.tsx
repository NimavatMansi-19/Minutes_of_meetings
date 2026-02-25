import React from "react";
import { prisma } from "../../lib/Prisma";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import deleteMember from "../actions/DeleteUser";
import DeleteUserBtn from "../ui/DeleteUserBtn";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Card from "../components/Card";
import { Users, UserPlus, FileEdit, Eye, Hash, MessageSquare, CheckCircle, XCircle } from "lucide-react";

async function MeetingMember() {
  const session = await requireUser();
  const role = session.role;

  if (role !== 'admin' && role !== 'meeting_convener') {
    redirect("/");
  }

  let queryOptions: any = {
    include: {
      staff: true,
      meetings: true
    }
  };

  if (role === 'meeting_convener') {
    const myMeetings = await prisma.meetings.findMany({
      where: { CreatedBy: Number(session.StaffID) || 0 },
      select: { MeetingID: true }
    });

    if (myMeetings.length === 0) {
      queryOptions.where = { MeetingID: -1 };
    } else {
      const meetingIds = myMeetings.map((m: any) => m.MeetingID);
      queryOptions.where = { MeetingID: { in: meetingIds } };
    }
  }

  const data = await prisma.meetingmember.findMany(queryOptions);

  return (
    <div className="bg-pattern min-h-screen pb-12">
      <PageHeader
        title="Meeting Attendance"
        description="Track and manage members and their attendance for various meetings."
        icon={Users}
        backHref="/dashboard"
        action={{
          href: "/meetingmember/add",
          label: "Assign Member",
          icon: UserPlus
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
                    <div className="flex items-center gap-2"><Users size={14} /> Member Name</div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Meeting Context
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Attendance</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                      No membership records found.
                    </td>
                  </tr>
                ) : (
                  data.map((u: any) => (
                    <tr key={u.MeetingMemberID} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                          {u.MeetingMemberID}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-white">{u.staff?.StaffName || `Staff #${u.StaffID}`}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Meeting #{u.MeetingID}</span>
                          <span className="text-sm text-slate-500 dark:text-zinc-500 line-clamp-1">{u.Remarks || "No remarks"}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${u.IsPresent
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                          {u.IsPresent ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {u.IsPresent ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2 transition-opacity">
                          <Link
                            href={`/meetingmember/${u.MeetingMemberID}`}
                            title="View Details"
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/meetingmember/edit/${u.MeetingMemberID}`}
                            title="Edit Assignment"
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
                          >
                            <FileEdit size={18} />
                          </Link>
                          <DeleteUserBtn id={u.MeetingMemberID} deleteFn={deleteMember} />
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

export default MeetingMember;
