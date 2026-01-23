"use server";

import { redirect } from "next/navigation";
import { prisma } from "../lib/Prisma";
import { revalidatePath } from "next/cache";

export default async function deleteUser(MeetingMemberID: number) {
  await prisma.meetingmember.delete({ where: { MeetingMemberID } });
  revalidatePath("/meetingmember");
  redirect("/meetingmember");
}