"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/Prisma";
import { redirect } from "next/navigation";

async function saveUser(formData: FormData) {
  const StaffName = formData.get("staffname") as string;
  const EmailAddress = formData.get("email") as string;
  const MobileNo = formData.get("Mobile") as string;
  const Remarks = formData.get("remark") as string;

  const data = {
    StaffName,
    EmailAddress,
    MobileNo,
    Remarks,
    // Created and Modified will auto-default to now()
  };

  await prisma.staff.create({ data });
  revalidatePath("/staff");
  redirect("/staff");
}

export { saveUser };