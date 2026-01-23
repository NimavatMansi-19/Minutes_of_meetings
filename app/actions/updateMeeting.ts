"use server";

import { prisma } from "@/app/lib/Prisma";
import { redirect } from "next/navigation";

export async function updateMeeting(formData: FormData) {
    const MeetingID = formData.get("MeetingID");
    const MeetingDate = formData.get("MeetingDate") as string;
    const MeetingTypeID = formData.get("MeetingTypeID");
    const MeetingDescription = formData.get("MeetingDescription") as string;
    const DocumentPath = formData.get("DocumentPath") as string;
    const IsCancelled = formData.get("IsCancelled") === "on";

    const updateData: any = {
        MeetingDate: new Date(MeetingDate),
        MeetingTypeID: Number(MeetingTypeID),
        MeetingDescription: MeetingDescription,
        DocumentPath: DocumentPath,
        IsCancelled: IsCancelled,
    };

    if (IsCancelled) {
        updateData.CancellationDateTime = new Date();
        // Assuming we might want a reason field in the form, 
        // but for now keeping it simple or if passed in formData
        const reason = formData.get("CancellationReason") as string;
        if (reason) updateData.CancellationReason = reason;
    }

    await prisma.meetings.update({
        where: {
            MeetingID: Number(MeetingID),
        },
        data: updateData,
    });

    redirect("/meetings");
}
