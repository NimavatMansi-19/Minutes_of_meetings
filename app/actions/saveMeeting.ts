"use server";

import { prisma } from "@/app/lib/Prisma";
import { redirect } from "next/navigation";

export async function saveMeeting(formData: FormData) {
    const MeetingDate = formData.get("MeetingDate") as string;
    const MeetingTypeID = formData.get("MeetingTypeID");
    const MeetingDescription = formData.get("MeetingDescription") as string;
    const DocumentPath = formData.get("DocumentPath") as string;

    await prisma.meetings.create({
        data: {
            MeetingDate: new Date(MeetingDate),
            MeetingTypeID: Number(MeetingTypeID),
            MeetingDescription: MeetingDescription,
            DocumentPath: DocumentPath,
        },
    });

    redirect("/meetings");
}
