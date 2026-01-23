"use server";

import { prisma } from "@/app/lib/Prisma";
import { redirect } from "next/navigation";

export async function saveMeetingMember(formData: FormData) {
    const MeetingID = formData.get("MeetingID");
    const StaffID = formData.get("StaffID");
    const Remarks = formData.get("Remarks");
    const IsPresent = formData.get("IsPresent") === "on"; // Checkbox returns "on" if checked

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
