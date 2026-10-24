"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function createDestination(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const priceRaw = formData.get("price") as string;
        const imageFile = formData.get("image") as File | null;

        if (!name || !description) {
            return { success: false, message: "Nama dan deskripsi wajib diisi." };
        }

        // Buat slug otomatis dari nama destinasi
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        let imageUrl = "/images/FotoPantai.jpeg"; // Nilai default jika tidak upload foto

        // Proses upload berkas jika ada foto yang dipilih
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Beri nama berkas unik memakai timestamp
            const fileExt = path.extname(imageFile.name) || ".jpg";
            const fileName = `${Date.now()}-${slug}${fileExt}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            // Pastikan folder uploads tersedia
            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, buffer);

            imageUrl = `/uploads/${fileName}`;
        }

        // Simpan data destinasi ke database MySQL via Prisma
        await prisma.destination.create({
            data: {
                name,
                slug,
                description,
                price: parseFloat(priceRaw) || 0,
                imageUrl,
            },
        });

        // Perbarui cache tampilan halaman depan
        revalidatePath("/");
        revalidatePath("/kategori/wisata");

        return { success: true, message: "Destinasi berhasil ditambahkan!" };
    } catch (error: any) {
        console.error("Gagal menambahkan destinasi:", error);
        return {
            success: false,
            message: error.code === "P2002"
                ? "Destinasi dengan nama ini sudah ada."
                : "Terjadi kesalahan pada server.",
        };
    }
}

export async function updateDestination(id: number, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const priceRaw = formData.get("price") as string;
        const imageFile = formData.get("image") as File | null;

        if (!name || !description) {
            return { success: false, message: "Nama dan deskripsi wajib diisi." };
        }

        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const existing = await prisma.destination.findUnique({ where: { id } });
        if (!existing) {
            return { success: false, message: "Destinasi tidak ditemukan." };
        }

        let imageUrl = existing.imageUrl;

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

        await prisma.destination.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                price: parseFloat(priceRaw) || 0,
                imageUrl,
            },
        });

        revalidatePath("/");
        revalidatePath("/admin");
        revalidatePath(`/kategori/wisata/${slug}`);

        return { success: true, message: "Destinasi berhasil diperbarui!" };
    } catch (error: any) {
        console.error("Gagal update destinasi:", error);
        return { success: false, message: "Terjadi kesalahan pada server." };
    }
}

export async function deleteDestination(id: number) {
    try {
        await prisma.destination.delete({
            where: { id },
        });

        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true, message: "Destinasi berhasil dihapus!" };
    } catch (error: any) {
        console.error("Error deleteDestination:", error);
        return { success: false, message: error.message || "Gagal menghapus destinasi." };
    }
}