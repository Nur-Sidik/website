"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function createArticle(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const imageFile = formData.get("image") as File | null;

        if (!title || !content) {
            return { success: false, message: "Judul dan konten artikel wajib diisi." };
        }

        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        let imageUrl = "/images/FotoMangrove.jpg";

        // Unggah foto ke Cloudinary jika ada foto yang dipilih
        if (imageFile && imageFile.size > 0) {
            const upload = await uploadImage(imageFile, slug);
            if (!upload.ok) {
                return { success: false, message: upload.message };
            }
            imageUrl = upload.url;
        }

        await prisma.article.create({
            data: {
                title,
                slug,
                content,
                imageUrl,
            },
        });

        revalidatePath("/informasi");
        revalidatePath("/admin");

        return { success: true, message: "Artikel berhasil diterbitkan!" };
    } catch (error: any) {
        console.error("Gagal membuat artikel:", error);
        return {
            success: false,
            message: error.code === "P2002"
                ? "Artikel dengan judul ini sudah ada."
                : "Terjadi kesalahan pada server.",
        };
    }
}

export async function updateArticle(id: number, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const imageFile = formData.get("image") as File | null;

        if (!title || !content) {
            return { success: false, message: "Judul dan konten wajib diisi." };
        }

        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const existing = await prisma.article.findUnique({ where: { id } });
        if (!existing) return { success: false, message: "Artikel tidak ditemukan." };

        let imageUrl = existing.imageUrl;
        let oldImageUrl: string | null = null;

        if (imageFile && imageFile.size > 0) {
            const upload = await uploadImage(imageFile, slug);
            if (!upload.ok) {
                return { success: false, message: upload.message };
            }
            oldImageUrl = existing.imageUrl; // foto lama dihapus setelah data berhasil disimpan
            imageUrl = upload.url;
        }

        await prisma.article.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                imageUrl,
            },
        });

        // Hapus foto lama di Cloudinary supaya tidak menumpuk
        if (oldImageUrl) await deleteImage(oldImageUrl);

        revalidatePath("/informasi");
        revalidatePath("/admin");
        return { success: true, message: "Artikel berhasil diperbarui!" };
    } catch (error) {
        console.error("Gagal update artikel:", error);
        return { success: false, message: "Terjadi kesalahan pada server." };
    }
}


export async function deleteArticle(id: number) {
    try {
        await prisma.article.delete({
            where: { id },
        });

        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true, message: "Artikel berhasil dihapus!" };
    } catch (error: any) {
        console.error("Error deleteArticle:", error);
        return { success: false, message: error.message || "Gagal menghapus artikel." };
    }
}