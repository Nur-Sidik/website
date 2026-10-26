"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const SUPER_ADMIN_USERNAME = "Super Admin Banaran";

// Helper internal untuk cek apakah yang request adalah Super Admin
async function ensureSuperAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return { authorized: false, message: "Sesi telah berakhir." };

  const session = (await verifyToken(token)) as { id: number; username: string } | null;
  if (!session || session.username !== SUPER_ADMIN_USERNAME) {
    return {
      authorized: false,
      message: "Akses ditolak! Hanya Super Admin Banaran yang berhak mengelola admin.",
    };
  }

  return { authorized: true, session };
}

export async function createAdmin(formData: FormData) {
  try {
    // 1. Validasi hak akses Super Admin
    const authCheck = await ensureSuperAdmin();
    if (!authCheck.authorized) {
      return { success: false, message: authCheck.message };
    }

    // 2. Validasi kuota maksimal 4 akun
    const totalAdmins = await prisma.admin.count();
    if (totalAdmins >= 4) {
      return {
        success: false,
        message: "Batas maksimal admin tercapai (maksimal 4 akun).",
      };
    }

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!name || !username || !password) {
      return { success: false, message: "Semua kolom wajib diisi." };
    }

    const existing = await prisma.admin.findUnique({
      where: { username },
    });
    if (existing) {
      return { success: false, message: "Username sudah digunakan." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        name,
        username,
        passwordHash: passwordHash,
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
    // 1. Validasi hak akses Super Admin
    const authCheck = await ensureSuperAdmin();
    if (!authCheck.authorized) {
      return { success: false, message: authCheck.message };
    }

    // 2. Cegah Super Admin menghapus akunnya sendiri
    if (authCheck.session?.id === targetId) {
      return { success: false, message: "Akun Super Admin utama tidak boleh dihapus." };
    }

    // 3. Pastikan tidak menghapus jika admin tersisa 1
    const totalAdmins = await prisma.admin.count();
    if (totalAdmins <= 1) {
      return { success: false, message: "Tidak dapat menghapus admin terakhir." };
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

export async function resetAdminPassword(formData: FormData) {
  try {
    // 1. Validasi hak akses: hanya Super Admin yang boleh reset
    const authCheck = await ensureSuperAdmin();
    if (!authCheck.authorized) {
      return { success: false, message: authCheck.message };
    }

    const adminId = Number(formData.get("adminId"));
    const newPassword = formData.get("newPassword") as string;

    if (!adminId || !newPassword || newPassword.length < 6) {
      return {
        success: false,
        message: "Password baru minimal harus 6 karakter.",
      };
    }

    // 2. Ambil data admin target untuk verifikasi password lama
    const targetAdmin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { passwordHash: true },
    });

    if (!targetAdmin) {
      return { success: false, message: "Akun admin tidak ditemukan." };
    }

    // 3. Cek apakah password baru sama dengan password lama
    const isSamePassword = await bcrypt.compare(
      newPassword,
      targetAdmin.passwordHash
    );

    if (isSamePassword) {
      return {
        success: false,
        message: "Password baru tidak boleh sama dengan password sebelumnya.",
      };
    }

    // 4. Hash password baru dan simpan
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: adminId },
      data: {
        password_hash: passwordHash,
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Password admin berhasil diperbarui!" };
  } catch (error: any) {
    console.error("Error resetAdminPassword:", error);
    return { success: false, message: "Gagal mereset password admin." };
  }
}