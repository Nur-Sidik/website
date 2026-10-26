"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
    try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            return { success: false, message: "Username dan password wajib diisi." };
        }

        // 1. Cari admin berdasarkan username
        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        if (!admin) {
            return { success: false, message: "Username atau password salah." };
        }

        // 2. Bandingkan password plaintext dengan password_hash di database
        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        if (!isMatch) {
            return { success: false, message: "Username atau password salah." };
        }

        // 3. Buat sesi JWT dalam cookie HttpOnly
        await createSession(admin.id, admin.username, admin.name);

        return { success: true, message: "Login berhasil!" };
    } catch (error: any) {
        console.error("Login error:", error);
        return { success: false, message: "Terjadi kesalahan pada server." };
    }
}

export async function logoutAdmin() {
    await deleteSession();
    redirect("/login");
}