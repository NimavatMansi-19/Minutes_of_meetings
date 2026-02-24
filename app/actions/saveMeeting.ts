"use server";

import { prisma } from "@/lib/Prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export async function saveMeeting(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (user.role !== 'admin' && user.role !== 'meeting_convener') {
        throw new Error("Permission denied: Only Admins and Conveners can schedule meetings.");
    }

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
            CreatedBy: user.StaffID, // Link to creator
            Created: new Date(),
            Modified: new Date(),
        },
    });

    redirect("/meetings");
}
