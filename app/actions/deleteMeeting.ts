"use server";

import { prisma } from "@/app/lib/Prisma";
import { revalidatePath } from "next/cache";

export default async function deleteMeeting(id: number) {
    await prisma.meetings.delete({
        where: {
            MeetingID: id,
        },
    });
    revalidatePath("/meetings");
}
