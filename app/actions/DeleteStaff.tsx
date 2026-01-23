"use server";

import { redirect } from "next/navigation";
import { prisma } from "../lib/Prisma";
import { revalidatePath } from "next/cache";

export default async function deleteStaff(StaffID: number) {
  await prisma.staff.delete({ where: { StaffID } });
  revalidatePath("/staff");
  redirect("/staff");
}