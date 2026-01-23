"use server";

import { prisma } from "@/app/lib/Prisma";
import { revalidatePath } from "next/cache";

export default async function deleteMeetingType(id: number) {
    await prisma.meetingtype.delete({
        where: {
            MeetingTypeID: id,
        },
    });
    revalidatePath("/meetingtype");
}
