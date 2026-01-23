import { prisma } from "@/app/lib/Prisma";
import Link from "next/link";
import React from "react";
import BackButton from "@/app/components/BackButton";

async function DetailMeetingType({ params }: { params: Promise<{ MeetingTypeID: string }> }) {
    const { MeetingTypeID } = await params;
    const data = await prisma.meetingtype.findFirst({
        where: { MeetingTypeID: Number(MeetingTypeID) },
    });

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-lg">
                <BackButton href="/meetingtype" className="mb-2" />
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 w-full">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">Type Details</h1>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Type ID:</span>
                            <span className="text-gray-900 dark:text-white">{data?.MeetingTypeID}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Type Name:</span>
                            <span className="text-gray-900 dark:text-white">{data?.MeetingTypeName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Remarks:</span>
                            <span className="text-gray-900 dark:text-white">{data?.Remarks || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/meetingtype"
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

export default DetailMeetingType;
