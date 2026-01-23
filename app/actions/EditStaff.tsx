
"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/Prisma";
import { redirect } from "next/navigation";
export default async function EditStaffAction(formData:FormData) {
    const StaffID=Number(formData.get("StaffID"))
    const data = {
    StaffName:formData.get("staffname") as string,
    EmailAddress:formData.get("email") as string,
    MobileNo:formData.get("Mobile") as string,
    Remarks:formData.get("remark") as string
    // Created and Modified will auto-default to now()
  };
await prisma.staff.update({
  where: { StaffID },
  data,
});
  revalidatePath("/staff");
  redirect("/staff");
    
};