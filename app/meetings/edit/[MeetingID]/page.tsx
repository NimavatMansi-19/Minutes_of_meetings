import { prisma } from "@/app/lib/Prisma";
import React from "react";
import { updateMeeting } from "@/app/actions/updateMeeting";
import BackButton from "@/app/components/BackButton";

async function EditMeeting({ params }: { params: Promise<{ MeetingID: string }> }) {
    const { MeetingID } = await params;
    const data = await prisma.meetings.findFirst({
        where: {
            MeetingID: Number(MeetingID),
        },
    });

    const meetingTypes = await prisma.meetingtype.findMany();

    // Helper to format Date for datetime-local input (YYYY-MM-DDTHH:mm)
    const formatDateForInput = (date: Date | null) => {
        if (!date) return "";
        return date.toISOString().slice(0, 16);
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-lg">
                <BackButton href="/meetings" className="mb-2" />
                <form action={updateMeeting} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Edit Meeting</h2>
                    <input
                        type="hidden"
                        name="MeetingID"
                        defaultValue={data?.MeetingID?.toString() ?? ""}
                    />
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Meeting Date</td>
                                <td className="py-3">
                                    <input
                                        type="datetime-local"
                                        name="MeetingDate"
                                        defaultValue={formatDateForInput(data?.MeetingDate || null)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Meeting Type</td>
                                <td className="py-3">
                                    <select
                                        name="MeetingTypeID"
                                        defaultValue={data?.MeetingTypeID ?? ""}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        {meetingTypes.map((type) => (
                                            <option key={type.MeetingTypeID} value={type.MeetingTypeID}>
                                                {type.MeetingTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Description</td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        name="MeetingDescription"
                                        defaultValue={data?.MeetingDescription ?? ""}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Document Path</td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        name="DocumentPath"
                                        defaultValue={data?.DocumentPath ?? ""}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Is Cancelled</td>
                                <td className="py-3">
                                    <input
                                        type="checkbox"
                                        name="IsCancelled"
                                        defaultChecked={data?.IsCancelled ?? false}
                                        className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </td>
                            </tr>

                            {/* Optional: Add cancellation reason field if cancelled */}

                            <tr>
                                <td colSpan={2} className="pt-6 text-center">
                                    <input
                                        type="submit"
                                        value="Update Meeting"
                                        className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default EditMeeting;
