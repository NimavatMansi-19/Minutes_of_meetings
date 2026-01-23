"use server";

import { prisma } from "@/app/lib/Prisma";
import { redirect } from "next/navigation";

export async function updateMeetingType(formData: FormData) {
    const MeetingTypeID = formData.get("MeetingTypeID");
    const MeetingTypeName = formData.get("MeetingTypeName") as string;
    const Remarks = formData.get("Remarks") as string;

    await prisma.meetingtype.update({
        where: {
            MeetingTypeID: Number(MeetingTypeID),
        },
        data: {
            MeetingTypeName: MeetingTypeName,
            Remarks: Remarks,
        },
    });

    redirect("/meetingtype");
}
