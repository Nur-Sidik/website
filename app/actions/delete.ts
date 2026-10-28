"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary otomatis membaca environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Fungsi helper untuk mengekstrak public_id dari URL Cloudinary
 * Contoh URL: https://res.cloudinary.com/demo/image/upload/v1234567/desa-banaran/artikel/sample.jpg
 * Hasil public_id: desa-banaran/artikel/sample
 */
function extractPublicId(imageUrl: string | null | undefined): string | null {
  if (!imageUrl || !imageUrl.includes("cloudinary.com")) return null;

  try {
    const parts = imageUrl.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    // Ambil bagian path setelah versi (v123456...)
    const relevantParts = parts.slice(uploadIndex + 1);
    if (relevantParts[0].startsWith("v") && !isNaN(Number(relevantParts[0].substring(1)))) {
      relevantParts.shift();
    }

    const filenameWithExt = relevantParts.join("/");
    const publicId = filenameWithExt.substring(0, filenameWithExt.lastIndexOf("."));
    return publicId || null;
  } catch (err) {
    console.error("Gagal mengekstrak public_id:", err);
    return null;
  }
}

// 1. Hapus Artikel
export async function deleteArticle(id: number) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      select: { imageUrl: true },
    });

    if (!article) {
      return { success: false, message: "Artikel tidak ditemukan." };
    }

    // Hapus gambar dari Cloudinary jika ada
    const publicId = extractPublicId(article.imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Hapus data dari database
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/informasi");
    revalidatePath("/");

    return { success: true, message: "Artikel berhasil dihapus!" };
  } catch (error: any) {
    console.error("Error deleteArticle:", error);
    return { success: false, message: "Gagal menghapus artikel." };
  }
}

// 2. Hapus Destinasi Wisata
export async function deleteDestination(id: number) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id },
      select: { imageUrl: true, slug: true },
    });

    if (!destination) {
      return { success: false, message: "Destinasi tidak ditemukan." };
    }

    const publicId = extractPublicId(destination.imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.destination.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/kategori/wisata");
    revalidatePath(`/kategori/wisata/${destination.slug}`);

    return { success: true, message: "Destinasi berhasil dihapus!" };
  } catch (error: any) {
    console.error("Error deleteDestination:", error);
    return { success: false, message: "Gagal menghapus destinasi." };
  }
}

// 3. Hapus Produk UMKM
export async function deleteProduct(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { image: true, slug: true },
    });

    if (!product) {
      return { success: false, message: "Produk tidak ditemukan." };
    }

    const publicId = extractPublicId(product.image);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/kategori/produk");
    revalidatePath(`/kategori/produk/${product.slug}`);

    return { success: true, message: "Produk berhasil dihapus!" };
  } catch (error: any) {
    console.error("Error deleteProduct:", error);
    return { success: false, message: "Gagal menghapus produk." };
  }
}