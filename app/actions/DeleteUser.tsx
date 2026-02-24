"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../lib/Prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";

export default async function deleteUser(MeetingMemberID: number) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const member = await prisma.meetingmember.findUnique({ where: { MeetingMemberID } });
  if (!member) throw new Error("Member not found");

  const meeting = await prisma.meetings.findUnique({ where: { MeetingID: member.MeetingID } });
  if (!meeting) throw new Error("Meeting not found");

  const isAdmin = user.role === 'admin';
  const isConvener = user.role === 'meeting_convener';

  if (!isAdmin && !isConvener) {
    throw new Error("Permission denied: only admins and conveners can delete members.");
  }

  const isOwner = meeting.CreatedBy === user.StaffID;

  if (isConvener && !isOwner) {
    throw new Error("Permission denied: You can only remove members from meetings you created.");
  }

  await prisma.meetingmember.delete({ where: { MeetingMemberID } });
  revalidatePath("/meetingmember");
}