"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteDestination(id: number) {
  try {
    await prisma.destination.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menghapus destinasi." };
  }
}

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menghapus produk." };
  }
}

export async function deleteArticle(id: number) {
  try {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/informasi");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menghapus artikel." };
  }
}