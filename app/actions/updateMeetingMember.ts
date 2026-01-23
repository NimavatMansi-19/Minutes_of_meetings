"use server";

import { prisma } from "@/app/lib/Prisma";
import { redirect } from "next/navigation";

export async function updateMeetingMember(formData: FormData) {
    const MeetingMemberID = formData.get("MeetingMemberID");
    const MeetingID = formData.get("MeetingID");
    const StaffID = formData.get("StaffID");
    const Remarks = formData.get("Remarks");
    const IsPresent = formData.get("IsPresent") === "on";

    await prisma.meetingmember.update({
        where: {
            MeetingMemberID: Number(MeetingMemberID),
        },
        data: {
            MeetingID: Number(MeetingID),
            StaffID: Number(StaffID),
            Remarks: Remarks as string,
            IsPresent: IsPresent,
        },
    });

    redirect("/meetingmember");
}
