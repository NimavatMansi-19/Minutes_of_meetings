import { saveMeeting } from "@/app/actions/saveMeeting";
import React from "react";
import { prisma } from "@/lib/Prisma";
import PageHeader from "../../components/PageHeader";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { Calendar, Clock, FileText, Link as LinkIcon, Save, Type } from "lucide-react";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

async function AddMeeting() {
    const session = await requireUser();
    const role = session.role;

    if (role !== 'admin' && role !== 'meeting_convener') {
        redirect("/");
    }

    const meetingTypes = await prisma.meetingtype.findMany();

    return (
        <div className="bg-pattern min-h-screen pb-12">
            <PageHeader
                title="Schedule Meeting"
                description="Organize a new governance session and define its parameters."
                icon={Calendar}
                backHref="/meetings"
            />

            <Section>
                <div className="max-w-3xl mx-auto">
                    <Card>
                        <form action={saveMeeting} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-800  flex items-center gap-2">
                                        <Clock size={16} className="text-indigo-500" />
                                        Meeting Schedule
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="MeetingDate"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                {/* Type Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-800  flex items-center gap-2">
                                        <Type size={16} className="text-indigo-500" />
                                        Classification
                                    </label>
                                    <select
                                        name="MeetingTypeID"
                                        className="input-field appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Meeting Classification</option>
                                        {meetingTypes.map((type) => (
                                            <option key={type.MeetingTypeID} value={type.MeetingTypeID}>
                                                {type.MeetingTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Description Input */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-800  flex items-center gap-2">
                                        <FileText size={16} className="text-indigo-500" />
                                        Agenda Description
                                    </label>
                                    <input
                                        type="text"
                                        name="MeetingDescription"
                                        placeholder="Briefly state the primary focus of this meeting"
                                        className="input-field"
                                    />
                                </div>

                                {/* Document Path Input */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-800  flex items-center gap-2">
                                        <LinkIcon size={16} className="text-indigo-500" />
                                        Resource Path / Repository Link
                                    </label>
                                    <input
                                        type="text"
                                        name="DocumentPath"
                                        placeholder="URL or path to related session documents"
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end gap-3 border-t border-slate-200">
                                <button
                                    type="reset"
                                    className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-slate-50 transition-all"
                                >
                                    Reset Details
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary flex items-center gap-2 px-8"
                                >
                                    <Save size={18} />
                                    Publish Schedule
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Section>
        </div>
    );
}

export default AddMeeting;
