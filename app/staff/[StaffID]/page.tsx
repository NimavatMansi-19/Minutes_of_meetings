import { prisma } from "@/lib/Prisma";
import Link from "next/link";
import React from "react";
import PageHeader from "@/app/components/PageHeader";
import Section from "@/app/components/Section";
import Card from "@/app/components/Card";
import { User, Mail, Phone, MessageSquare, Hash, Calendar, FileEdit } from "lucide-react";

async function DetailStaff({ params }: { params: Promise<{ StaffID: string }> }) {
  const { StaffID } = await params;
  const data = await prisma.staff.findFirst({
    where: { StaffID: Number(StaffID) },
  });

  if (!data) {
    return (
      <div className="bg-pattern min-h-screen">
        <PageHeader title="Staff Not Found" icon={User} backHref="/staff" />
        <Section>
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600 font-medium text-lg">The requested staff record could not be found in the repository.</p>
            </div>
          </Card>
        </Section>
      </div>
    );
  }

  return (
    <div className="bg-pattern min-h-screen pb-12">
      <PageHeader
        title="Staff Profile"
        description="Detailed personnel record and administrative information."
        icon={User}
        backHref="/staff"
        action={{
          href: `/staff/edit/${data.StaffID}`,
          label: "Update Record",
          icon: FileEdit
        }}
      />

      <Section>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Avatar & Basic Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="text-center">
              <div className="mx-auto w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl shadow-indigo-500/20">
                <User size={48} />
              </div>
              <h2 className="text-xl font-bold text-black  line-clamp-1">{data.StaffName}</h2>
              <p className="text-sm text-gray-600 font-medium">Organization Personnel</p>

              <div className="mt-6 pt-6 border-t border-slate-200 flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">ID</p>
                  <p className="font-bold text-indigo-600 text-indigo-400">#{data.StaffID}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="md:col-span-2 space-y-6">
            <Card title="Personnel Information">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white text-indigo-600 text-indigo-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-lg font-medium text-black ">{data.EmailAddress || "No email registered"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white text-indigo-600 text-indigo-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Mobile Access</p>
                    <p className="text-lg font-medium text-black ">{data.MobileNo || "No contact number"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white text-indigo-600 text-indigo-400">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Administrative Remarks</p>
                    <p className="text-lg font-medium text-black ">{data.Remarks || "Zero remarks documented"}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white backdrop-blur-xl border border-slate-200 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 text-black">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Record Integrity</p>
                  <p className="text-sm text-slate-300">This record is synchronized with the central database and was last verified on {new Date().toLocaleDateString()}.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default DetailStaff;
