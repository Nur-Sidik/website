"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteDestination(id: number) {
    try {
        await prisma.destination.delete({
            where: { id },
        });
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true, message: "Destinasi berhasil dihapus!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Gagal menghapus destinasi." };
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true, message: "Produk berhasil dihapus!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Gagal menghapus produk." };
    }
}

export async function deleteArticle(id: number) {
    try {
        await prisma.article.delete({
            where: { id },
        });
        revalidatePath("/admin");
        revalidatePath("/informasi");
        return { success: true, message: "Artikel berhasil dihapus!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Gagal menghapus artikel." };
    }
}