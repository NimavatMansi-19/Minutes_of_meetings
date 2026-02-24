"use server";

import { prisma } from "@/lib/Prisma";
import { getCurrentUser } from "@/lib/session";

export async function getDashboardStats() {
    const user = await getCurrentUser();

    let meetingFilter: any = {};

    // Conveners can only see meetings they created
    if (user && user.sys_role === 'meeting_convener') {
        meetingFilter = { CreatedBy: user.StaffID };
    }

    // Staff and Admin see all (Staff limitations are on UI/Roles, checking requirement "View meetings they created" applies specifically to Convener)
    // "if staff then only one" was about tables visible on login, handled in dashboard page.

    const [totalStaff, totalMeetings, totalMembers, meetingsBase] = await Promise.all([
        prisma.staff.count(),
        prisma.meetings.count({ where: meetingFilter }),
        prisma.meetingmember.count(),
        prisma.meetings.findMany({
            where: {
                ...meetingFilter,
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
