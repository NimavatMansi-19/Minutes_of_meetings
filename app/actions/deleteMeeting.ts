"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function deleteMeeting(id: number) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const meeting = await prisma.meetings.findUnique({
        where: { MeetingID: id },
    });

    if (!meeting) {
        throw new Error("Meeting not found");
    }

    const isAdmin = user.role === 'admin';
    const isConvener = user.role === 'meeting_convener';
    const isOwner = meeting.CreatedBy === user.StaffID;

    if (!isAdmin && (!isConvener || !isOwner)) {
        redirect("/unauthorized");
    }

    await prisma.meetings.delete({
        where: {
            MeetingID: id,
        },
    });
    revalidatePath("/meetings");
}
