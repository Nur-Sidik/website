"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// Helper internal untuk menghapus berkas fisik di folder public/uploads
async function removeUploadedFile(imagePath: string | null | undefined) {
  if (!imagePath || !imagePath.startsWith("/uploads/")) return;

  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    await fs.unlink(fullPath);
  } catch (err: any) {
    // Jika berkas fisik tidak ditemukan di disk, abaikan agar query delete tetap tereksekusi
    if (err.code !== "ENOENT") {
      console.error("Gagal menghapus file gambar:", err);
    }
  }
}

// 1. Hapus Destinasi (menggunakan imageUrl)
export async function deleteDestination(id: number) {
  try {
    const item = await prisma.destination.findUnique({ where: { id } });
    if (!item) {
      return { success: false, message: "Destinasi tidak ditemukan." };
    }

    await removeUploadedFile(item.imageUrl);
    await prisma.destination.delete({ where: { id } });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, message: "Destinasi dan foto berhasil dihapus!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Gagal menghapus destinasi.",
    };
  }
}

// 2. Hapus Produk UMKM (menggunakan image)
export async function deleteProduct(id: number) {
  try {
    const item = await prisma.product.findUnique({ where: { id } });
    if (!item) {
      return { success: false, message: "Produk tidak ditemukan." };
    }

    await removeUploadedFile(item.imageUrl);
    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, message: "Produk dan foto berhasil dihapus!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Gagal menghapus produk.",
    };
  }
}

// 3. Hapus Artikel Berita (menggunakan imageUrl)
export async function deleteArticle(id: number) {
  try {
    const item = await prisma.article.findUnique({ where: { id } });
    if (!item) {
      return { success: false, message: "Artikel tidak ditemukan." };
    }

    await removeUploadedFile(item.imageUrl);
    await prisma.article.delete({ where: { id } });

    revalidatePath("/admin");
    revalidatePath("/informasi");
    return { success: true, message: "Artikel dan foto berhasil dihapus!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Gagal menghapus artikel.",
    };
  }
}