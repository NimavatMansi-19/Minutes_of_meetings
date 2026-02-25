import React from "react";
import { prisma } from "../../lib/Prisma";
import { staff } from "../generated/prisma/browser";
import Link from "next/link";
import deleteStaff from "../actions/DeleteStaff";
import DeleteUserBtn from "../ui/DeleteUserBtn";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Card from "../components/Card";
import { Users, UserPlus, FileEdit, Eye, Mail, Phone, Hash } from "lucide-react";
import { requireUser } from "@/lib/session";

async function Staff() {
  const session = await requireUser();
  const role = session.role;
  const isAdminOrConvener = role === 'admin' || role === 'meeting_convener';

  const data = await prisma.staff.findMany();

  return (
    <div className="bg-pattern min-h-screen pb-12">
      <PageHeader
        title="Staff Directory"
        description="Comprehensive directory of all organization staff and personnel."
        icon={Users}
        backHref="/dashboard"
        action={isAdminOrConvener ? {
          href: "/staff/add",
          label: "Onboard Staff",
          icon: UserPlus
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
                    <div className="flex items-center gap-2"><Users size={14} /> Name</div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2"><Phone size={14} /> Contact</div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2"><Mail size={14} /> Email</div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                      No staff members found in the repository.
                    </td>
                  </tr>
                ) : (
                  data.map((u: staff) => (
                    <tr key={u.StaffID} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                          {u.StaffID}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-white">{u.StaffName}</div>
                      </td>
                      <td className="px-8 py-5 font-medium text-slate-600 dark:text-slate-400">
                        {u.MobileNo || "—"}
                      </td>
                      <td className="px-8 py-5 font-medium text-slate-600 dark:text-slate-400 text-sm">
                        {u.EmailAddress}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2 transition-opacity">
                          <Link
                            href={`/staff/${u.StaffID}`}
                            title="View Details"
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                          >
                            <Eye size={18} />
                          </Link>
                          {isAdminOrConvener && (
                            <>
                              <Link
                                href={`/staff/edit/${u.StaffID}`}
                                title="Edit Record"
                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
                              >
                                <FileEdit size={18} />
                              </Link>
                              <DeleteUserBtn id={u.StaffID} deleteFn={deleteStaff} />
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

export default Staff;
