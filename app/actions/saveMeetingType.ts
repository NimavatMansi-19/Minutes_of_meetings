"use server";

import { prisma } from "@/app/lib/Prisma";
import { redirect } from "next/navigation";

export async function saveMeetingType(formData: FormData) {
    const MeetingTypeName = formData.get("MeetingTypeName") as string;
    const Remarks = formData.get("Remarks") as string;

    await prisma.meetingtype.create({
        data: {
            MeetingTypeName: MeetingTypeName,
            Remarks: Remarks,
        },
    });

    redirect("/meetingtype");
}
