"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/upload";
import { getAdminSession } from "@/lib/auth";

export async function createDestination(formData: FormData) {
    try {
        const admin = await getAdminSession();
        if (!admin) {
            return { success: false, message: "Sesi login berakhir. Silakan login ulang." };
        }

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

        // Unggah foto ke Cloudinary jika ada foto yang dipilih
        if (imageFile && imageFile.size > 0) {
            const upload = await uploadImage(imageFile, slug);
            if (!upload.ok) {
                return { success: false, message: upload.message };
            }
            imageUrl = upload.url;
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
        const admin = await getAdminSession();
        if (!admin) {
            return { success: false, message: "Sesi login berakhir. Silakan login ulang." };
        }

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
        let oldImageUrl: string | null = null;

        if (imageFile && imageFile.size > 0) {
            const upload = await uploadImage(imageFile, slug);
            if (!upload.ok) {
                return { success: false, message: upload.message };
            }
            oldImageUrl = existing.imageUrl; // foto lama dihapus setelah data berhasil disimpan
            imageUrl = upload.url;
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

        // Hapus foto lama di Cloudinary supaya tidak menumpuk
        if (oldImageUrl) await deleteImage(oldImageUrl);

        revalidatePath("/");
        revalidatePath("/admin");
        revalidatePath(`/kategori/wisata/${slug}`);

        return { success: true, message: "Destinasi berhasil diperbarui!" };
    } catch (error: any) {
        console.error("Gagal update destinasi:", error);
        return { success: false, message: "Terjadi kesalahan pada server." };
    }
}