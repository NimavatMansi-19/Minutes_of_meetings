import { prisma } from "@/app/lib/Prisma";
import Link from "next/link";
import React from "react";
import BackButton from "@/app/components/BackButton";

async function DetailMeeting({ params }: { params: Promise<{ MeetingID: number }> }) {
    const { MeetingID } = await params;
    const data = await prisma.meetings.findFirst({
        where: { MeetingID: Number(MeetingID) },
    });

    // Fetch type name for display
    const meetingType = data ? await prisma.meetingtype.findFirst({
        where: { MeetingTypeID: data.MeetingTypeID }
    }) : null;

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-lg">
                <BackButton href="/meetings" className="mb-2" />
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 w-full">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">Meeting Details</h1>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">ID:</span>
                            <span className="text-gray-900 dark:text-white">{data?.MeetingID}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Date:</span>
                            <span className="text-gray-900 dark:text-white">
                                {data?.MeetingDate ? new Date(data.MeetingDate).toLocaleString() : 'N/A'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Type:</span>
                            <span className="text-gray-900 dark:text-white">{meetingType?.MeetingTypeName || data?.MeetingTypeID}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Description:</span>
                            <span className="text-gray-900 dark:text-white">{data?.MeetingDescription || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Document:</span>
                            <span className="text-gray-900 dark:text-white">{data?.DocumentPath || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Status:</span>
                            <span className={`font-medium ${data?.IsCancelled ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                {data?.IsCancelled ? 'Cancelled' : 'Scheduled'}
                            </span>
                        </div>
                        {data?.IsCancelled && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-600 dark:text-gray-300">Cancellation Logic:</span>
                                <span className="text-gray-900 dark:text-white">
                                    {data.CancellationDateTime ? new Date(data.CancellationDateTime).toLocaleString() : ''}
                                    <br />
                                    {data.CancellationReason}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/meetings"
                            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            &larr; Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailMeeting;
