"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function getDashboardStats() {
    const user = await getCurrentUser();

    let meetingFilter: any = undefined;
    let staffProfile = null;

    if (user && (user.sys_role === 'meeting_convener' || user.role === 'meeting_convener')) {
        const staffId = Number(user.StaffID);
        if (!isNaN(staffId) && staffId > 0) {
            meetingFilter = {
                OR: [
                    { CreatedBy: staffId },
                    {
                        meetingmember: {
                            some: { StaffID: staffId }
                        }
                    },
                    {
                        MeetingDate: { gte: new Date() },
                        CreatedBy: 0
                    },
                    {
                        MeetingDate: { gte: new Date() },
                        CreatedBy: null
                    }
                ]
            };
        }
    } else if (user && (user.sys_role === 'staff' || user.role === 'staff')) {
        const staffId = Number(user.StaffID);
        if (!isNaN(staffId) && staffId > 0) {
            meetingFilter = {
                OR: [
                    {
                        meetingmember: {
                            some: {
                                StaffID: staffId
                            }
                        }
                    },
                    {
                        MeetingDate: { gte: new Date() },
                        CreatedBy: 0
                    },
                    {
                        MeetingDate: { gte: new Date() },
                        CreatedBy: null
                    }
                ]
            };
            staffProfile = await prisma.staff.findUnique({
                where: { StaffID: staffId }
            });
        }
    }

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
                in: typeIds.length > 0 ? typeIds : [-1],
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
        staffProfile,
    };
}
