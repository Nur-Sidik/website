"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function createAdmin(formData: FormData) {
  try {
    // 1. Validasi kuota maksimal 3 akun
    const totalAdmins = await prisma.admin.count();
    if (totalAdmins >= 3) {
      return {
        success: false,
        message: "Batas maksimal admin tercapai (maksimal 3 akun).",
      };
    }

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!name || !username || !password) {
      return { success: false, message: "Semua kolom wajib diisi." };
    }

    // 2. Cek apakah username sudah dipakai
    const existing = await prisma.admin.findUnique({
      where: { username },
    });
    if (existing) {
      return { success: false, message: "Username sudah digunakan." };
    }

    // 3. Hash password dengan bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        name,
        username,
        password_hash: passwordHash,
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Admin baru berhasil ditambahkan!" };
  } catch (error: any) {
    console.error("Error createAdmin:", error);
    return { success: false, message: "Gagal menambahkan admin." };
  }
}

export async function deleteAdmin(targetId: number) {
  try {
    // 1. Ambil identitas admin yang sedang login dari cookie sesi
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return { success: false, message: "Sesi tidak valid." };

    const payload = (await verifyToken(token)) as { id: number } | null;
    if (!payload) return { success: false, message: "Akses ditolak." };

    // 2. Cegah admin menghapus dirinya sendiri
    if (payload.id === targetId) {
      return { success: false, message: "Anda tidak bisa menghapus akun sendiri yang sedang aktif." };
    }

    // 3. Cegah menghapus jika hanya tersisa 1 admin
    const totalAdmins = await prisma.admin.count();
    if (totalAdmins <= 1) {
      return { success: false, message: "Tidak dapat menghapus akun admin terakhir." };
    }

    await prisma.admin.delete({
      where: { id: targetId },
    });

    revalidatePath("/admin");
    return { success: true, message: "Akun admin berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Gagal menghapus admin." };
  }
}