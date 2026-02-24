"use client";

import React, { useState } from "react";
import { updateMeeting } from "@/app/actions/updateMeeting";
import Card from "@/app/components/Card";
import { Calendar, Clock, FileText, Link as LinkIcon, Save, Type, AlertCircle, RefreshCw } from "lucide-react";

type Props = {
    meeting: any;
    meetingTypes: any[];
};

export default function EditMeetingForm({ meeting, meetingTypes }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatDateForInput = (date: any) => {
        if (!date) return "";
        const d = new Date(date);
        return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 16);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await updateMeeting(formData);
        } catch (e: any) {
            if (e.message !== "NEXT_REDIRECT" && !e.message?.includes("NEXT_REDIRECT")) {
                alert(e.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <form action={handleSubmit} className="space-y-8">
                <input
                    type="hidden"
                    name="MeetingID"
                    defaultValue={meeting?.MeetingID?.toString() ?? ""}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Clock size={16} className="text-indigo-500" />
                            Meeting Schedule
                        </label>
                        <input
                            type="datetime-local"
                            name="MeetingDate"
                            defaultValue={formatDateForInput(meeting?.MeetingDate)}
                            className="input-field"
                            required
                        />
                    </div>

                    {/* Type Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Type size={16} className="text-indigo-500" />
                            Classification
                        </label>
                        <select
                            name="MeetingTypeID"
                            defaultValue={meeting?.MeetingTypeID ?? ""}
                            className="input-field appearance-none cursor-pointer"
                            required
                        >
                            <option value="">Select Classification</option>
                            {meetingTypes.map((type) => (
                                <option key={type.MeetingTypeID} value={type.MeetingTypeID}>
                                    {type.MeetingTypeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description Input */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <FileText size={16} className="text-indigo-500" />
                            Agenda Description
                        </label>
                        <input
                            type="text"
                            name="MeetingDescription"
                            defaultValue={meeting?.MeetingDescription ?? ""}
                            placeholder="Primary focus of the session"
                            className="input-field"
                        />
                    </div>

                    {/* Document Path Input */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <LinkIcon size={16} className="text-indigo-500" />
                            Resource Repository
                        </label>
                        <input
                            type="text"
                            name="DocumentPath"
                            defaultValue={meeting?.DocumentPath ?? ""}
                            placeholder="URL or file system path"
                            className="input-field"
                        />
                    </div>

                    {/* Status Checkbox */}
                    <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group transition-all hover:border-rose-200 dark:hover:border-rose-900/30">
                        <label className="flex items-center gap-4 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="IsCancelled"
                                    defaultChecked={meeting?.IsCancelled ?? false}
                                    className="peer sr-only"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <AlertCircle size={16} className="text-rose-500" />
                                    Mark as Cancelled
                                </p>
                                <p className="text-xs text-slate-500">Toggling this will flag the session as inactive across all dashboards.</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <>
                                <RefreshCw className="animate-spin" size={20} />
                                Processing Updates...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Commit Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Card>
    );
}
