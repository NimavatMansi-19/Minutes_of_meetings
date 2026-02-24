"use server";

import { prisma } from "@/lib/Prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export async function saveMeetingMember(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const MeetingID = formData.get("MeetingID");
    const StaffID = formData.get("StaffID");
    const Remarks = formData.get("Remarks");
    const IsPresent = formData.get("IsPresent") === "on";

    // Permission Check
    const meeting = await prisma.meetings.findUnique({
        where: { MeetingID: Number(MeetingID) }
    });

    if (!meeting) throw new Error("Meeting not found");

    const isAdmin = user.role === 'admin';
    const isConvener = user.role === 'meeting_convener';

    if (!isAdmin && !isConvener) {
        throw new Error("Permission denied: only admins and conveners can add members.");
    }

    const isOwner = meeting.CreatedBy === user.StaffID;

    if (isConvener && !isOwner) {
        throw new Error("Permission denied: You can only add members to meetings you created.");
    }

    await prisma.meetingmember.create({
        data: {
            MeetingID: Number(MeetingID),
            StaffID: Number(StaffID),
            Remarks: Remarks as string,
            IsPresent: IsPresent,
        },
    });

    redirect("/meetingmember");
}
