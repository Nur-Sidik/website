"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

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

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileExt = path.extname(imageFile.name) || ".jpg";
            const fileName = `${Date.now()}-${slug}${fileExt}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, buffer);

            imageUrl = `/uploads/${fileName}`;
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

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileExt = path.extname(imageFile.name) || ".jpg";
            const fileName = `${Date.now()}-${slug}${fileExt}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(path.join(uploadDir, fileName), buffer);
            imageUrl = `/uploads/${fileName}`;
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

        revalidatePath("/informasi");
        revalidatePath("/admin");
        return { success: true, message: "Artikel berhasil diperbarui!" };
    } catch (error) {
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