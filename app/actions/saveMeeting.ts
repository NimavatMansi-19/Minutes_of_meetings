"use server";

import { prisma } from "@/lib/Prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function saveMeeting(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (user.role !== 'admin' && user.role !== 'meeting_convener') {
        throw new Error("Permission denied: Only Admins and Conveners can schedule meetings.");
    }

    const MeetingDate = formData.get("MeetingDate") as string;
    const MeetingTypeID = formData.get("MeetingTypeID");
    const MeetingDescription = formData.get("MeetingDescription") as string;

    // Process File Upload
    const documentFile = formData.get("DocumentPath") as File | null;
    let DocumentPath = "";

    if (documentFile && documentFile.size > 0 && documentFile.name !== "undefined") {
        const bytes = await documentFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${documentFile.name.replace(/\s+/g, '_')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        DocumentPath = `/uploads/${fileName}`;
    } else {
        // Fallback if they entered text instead of file, or nothing
        const docString = formData.get("DocumentPath");
        if (typeof docString === 'string' && docString.trim() !== "") {
            DocumentPath = docString;
        }
    }

    await prisma.meetings.create({
        data: {
            MeetingDate: new Date(MeetingDate),
            MeetingTypeID: Number(MeetingTypeID),
            MeetingDescription: MeetingDescription,
            DocumentPath: DocumentPath || null,
            CreatedBy: user.StaffID, // Link to creator
            Created: new Date(),
            Modified: new Date(),
        },
    });

    redirect("/meetings");
}
