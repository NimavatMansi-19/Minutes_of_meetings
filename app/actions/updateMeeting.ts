"use server";

import { prisma } from "@/lib/Prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export async function updateMeeting(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const MeetingID = formData.get("MeetingID");
    const MeetingDate = formData.get("MeetingDate") as string;
    const MeetingTypeID = formData.get("MeetingTypeID");
    const MeetingDescription = formData.get("MeetingDescription") as string;
    const DocumentPath = formData.get("DocumentPath") as string;
    const IsCancelled = formData.get("IsCancelled") === "on";

    const id = Number(MeetingID);

    // Permission Check
    const existingMeeting = await prisma.meetings.findUnique({
        where: { MeetingID: id },
    });

    if (!existingMeeting) throw new Error("Meeting not found");

    const isAdmin = user.role === 'admin';
    const isConvener = user.role === 'meeting_convener';
    const isOwner = existingMeeting.CreatedBy === user.StaffID;

    if (!isAdmin && (!isConvener || !isOwner)) {
        throw new Error("Permission denied: You can only edit meetings you created.");
    }

    // Additional check: Convener cannot edit admin meetings (which implies CreatedBy != user.StaffID, so covered by isOwner check)

    const updateData: any = {
        MeetingDate: new Date(MeetingDate),
        MeetingTypeID: Number(MeetingTypeID),
        MeetingDescription: MeetingDescription,
        DocumentPath: DocumentPath,
        IsCancelled: IsCancelled,
        Modified: new Date(),
    };

    if (IsCancelled) {
        updateData.CancellationDateTime = new Date();
        const reason = formData.get("CancellationReason") as string;
        if (reason) updateData.CancellationReason = reason;
    }

    await prisma.meetings.update({
        where: {
            MeetingID: id,
        },
        data: updateData,
    });

    redirect("/meetings");
}
