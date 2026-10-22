"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price") as string;
    const stockRaw = formData.get("stock") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !description) {
      return { success: false, message: "Nama produk dan deskripsi wajib diisi." };
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let imageUrl = "/images/Foto1.jpg";

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

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(priceRaw) || 0,
        stock: parseInt(stockRaw) || 0,
        imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Produk berhasil ditambahkan!" };
  } catch (error: any) {
    console.error("Gagal menambahkan produk:", error);
    return {
      success: false,
      message: error.code === "P2002"
        ? "Produk dengan nama ini sudah ada."
        : "Terjadi kesalahan pada server.",
    };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price") as string;
    const stockRaw = formData.get("stock") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !description) {
      return { success: false, message: "Nama dan deskripsi wajib diisi." };
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Produk tidak ditemukan." };

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

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: parseFloat(priceRaw) || 0,
        stock: parseInt(stockRaw) || 0,
        imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Produk berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}