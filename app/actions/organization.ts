"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function updateOrganization(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !description) {
      return { success: false, message: "Nama dan deskripsi wajib diisi." };
    }

    const existing = await prisma.organization.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, message: "Organisasi tidak ditemukan." };
    }

    let imageUrl = existing.imageUrl;
    let oldImageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { success: false, message: "Ukuran foto tidak boleh melebihi 5 MB." };
      }

      const upload = await uploadImage(imageFile, existing.slug);
      if (!upload.ok) {
        return { success: false, message: upload.message || "Gagal mengunggah foto." };
      }
      oldImageUrl = existing.imageUrl;
      imageUrl = upload.url;
    }

    await prisma.organization.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
      },
    });

    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      await deleteImage(oldImageUrl);
    }

    revalidatePath(`/komunitas/${existing.slug}`);
    revalidatePath(`/struktural/${existing.slug}`);
    revalidatePath(`/admin/organisasi/${id}/edit`);
    revalidatePath("/admin/organisasi");

    return { success: true, message: "Berhasil memperbarui organisasi." };
  } catch (error: any) {
    console.error("Gagal update organisasi:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}

export async function createOrganizationNews(organizationId: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !content) {
      return { success: false, message: "Judul dan isi berita wajib diisi." };
    }

    const org = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!org) {
      return { success: false, message: "Organisasi tidak ditemukan." };
    }

    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { success: false, message: "Ukuran foto berita tidak boleh melebihi 5 MB." };
      }

      const slugNews = `${org.slug}-news-${Date.now()}`;
      const upload = await uploadImage(imageFile, slugNews);
      if (!upload.ok) {
        return { success: false, message: upload.message || "Gagal mengunggah dokumentasi berita." };
      }
      imageUrl = upload.url;
    }

    await prisma.organizationNews.create({
      data: {
        organizationId,
        title,
        content,
        image: imageUrl,
      },
    });

    revalidatePath(`/komunitas/${org.slug}`);
    revalidatePath(`/struktural/${org.slug}`);
    revalidatePath(`/admin/organisasi/${organizationId}/edit`);

    return { success: true, message: "Berita kegiatan berhasil diterbitkan!" };
  } catch (error: any) {
    console.error("Gagal membuat berita kegiatan:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}

export async function deleteOrganizationNews(newsId: number, organizationId: number) {
  try {
    const news = await prisma.organizationNews.findUnique({
      where: { id: newsId },
    });

    if (!news) {
      return { success: false, message: "Berita tidak ditemukan." };
    }

    if (news.image && news.image.includes("cloudinary.com")) {
      await deleteImage(news.image);
    }

    await prisma.organizationNews.delete({
      where: { id: newsId },
    });

    const org = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (org) {
      revalidatePath(`/komunitas/${org.slug}`);
      revalidatePath(`/struktural/${org.slug}`);
    }
    revalidatePath(`/admin/organisasi/${organizationId}/edit`);

    return { success: true, message: "Berita berhasil dihapus." };
  } catch (error: any) {
    console.error("Gagal menghapus berita:", error);
    return { success: false, message: "Gagal menghapus berita." };
  }
}