"use server";

import { prisma } from "@/app/lib/Prisma";

export async function getDashboardStats() {
    const [totalStaff, totalMeetings, totalMembers, meetingsBase] = await Promise.all([
        prisma.staff.count(),
        prisma.meetings.count(),
        prisma.meetingmember.count(),
        prisma.meetings.findMany({
            where: {
                MeetingDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                MeetingDate: "asc",
            },
            take: 5,
        }),
    ]);

    // Manually fetch meeting types for the retrieved meetings
    const typeIds = Array.from(new Set(meetingsBase.map((m) => m.MeetingTypeID)));
    const meetingTypes = await prisma.meetingtype.findMany({
        where: {
            MeetingTypeID: {
                in: typeIds,
            },
        },
    });

    const typeMap = new Map(meetingTypes.map((t) => [t.MeetingTypeID, t]));

    const upcomingMeetings = meetingsBase.map((meeting) => ({
        ...meeting,
        meetingtype: typeMap.get(meeting.MeetingTypeID) || null,
    }));

    return {
        totalStaff,
        totalMeetings,
        totalMembers,
        upcomingMeetings,
    };
}
