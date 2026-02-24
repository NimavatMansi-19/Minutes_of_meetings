import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(Buffer.from(base64, 'base64').toString());
        return payload;
    } catch (e) {
        return null;
    }
}

export async function requireUser() {
    const session = await getCurrentUser();
    if (!session) {
        redirect("/login");
    }
    return session;
}
