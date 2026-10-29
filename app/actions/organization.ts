"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function updateOrganization(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const structureInfo = formData.get("structureInfo") as string;
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
        structureInfo: structureInfo || existing.structureInfo,
      },
    });

    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      await deleteImage(oldImageUrl);
    }

    revalidatePath(`/komunitas/${existing.slug}`);
    revalidatePath(`/struktural/${existing.slug}`);
    revalidatePath(`/admin/organisasi/${id}/edit`);
    revalidatePath("/admin/organisasi");

    return { success: true, message: "Profil dan struktural berhasil diperbarui!" };
  } catch (error: any) {
    console.error("Gagal update organisasi:", error);
    return { success: false, message: "Terjadi kesalahan server saat menyimpan data." };
  }
}

export async function createOrganizationNews(organizationId: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const eventDateRaw = formData.get("eventDate") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !content) {
      return { success: false, message: "Judul dan isi berita wajib diisi." };
    }

    if (!eventDateRaw) {
      return { success: false, message: "Tanggal pelaksanaan kegiatan wajib dipilih." };
    }

    const parsedDate = new Date(eventDateRaw);
    if (isNaN(parsedDate.getTime())) {
      return { success: false, message: "Format tanggal tidak valid." };
    }

    // Date constraint (tahun saat ini ± 1)
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 1;
    const maxYear = currentYear + 1;
    const eventYear = parsedDate.getFullYear();

    if (eventYear < minYear || eventYear > maxYear) {
      return {
        success: false,
        message: `Peringatan: Tahun kegiatan (${eventYear}) di luar batas rentang (${minYear} - ${maxYear})!`,
      };
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
        eventDate: parsedDate,
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

export async function updateOrganizationNews(newsId: number, organizationId: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const eventDateRaw = formData.get("eventDate") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !content) {
      return { success: false, message: "Judul dan isi berita wajib diisi." };
    }

    if (!eventDateRaw) {
      return { success: false, message: "Tanggal pelaksanaan kegiatan wajib dipilih." };
    }

    const parsedDate = new Date(eventDateRaw);
    if (isNaN(parsedDate.getTime())) {
      return { success: false, message: "Format tanggal tidak valid." };
    }

    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 1;
    const maxYear = currentYear + 1;
    const eventYear = parsedDate.getFullYear();

    if (eventYear < minYear || eventYear > maxYear) {
      return {
        success: false,
        message: `Peringatan: Tahun kegiatan (${eventYear}) di luar batas rentang (${minYear} - ${maxYear})!`,
      };
    }

    const existingNews = await prisma.organizationNews.findUnique({
      where: { id: newsId },
      include: { organization: true },
    });

    if (!existingNews) {
      return { success: false, message: "Data berita tidak ditemukan." };
    }

    let imageUrl = existingNews.image;
    let oldImageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { success: false, message: "Ukuran foto berita tidak boleh melebihi 5 MB." };
      }

      const slugNews = `${existingNews.organization.slug}-news-${Date.now()}`;
      const upload = await uploadImage(imageFile, slugNews);
      if (!upload.ok) {
        return { success: false, message: upload.message || "Gagal mengunggah foto baru." };
      }
      oldImageUrl = existingNews.image;
      imageUrl = upload.url;
    }

    await prisma.organizationNews.update({
      where: { id: newsId },
      data: {
        title,
        content,
        image: imageUrl,
        eventDate: parsedDate,
      },
    });

    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      await deleteImage(oldImageUrl);
    }

    revalidatePath(`/komunitas/${existingNews.organization.slug}`);
    revalidatePath(`/struktural/${existingNews.organization.slug}`);
    revalidatePath(`/admin/organisasi/${organizationId}/edit`);

    return { success: true, message: "Berita kegiatan berhasil diperbarui!" };
  } catch (error: any) {
    console.error("Gagal update berita:", error);
    return { success: false, message: "Terjadi kesalahan server saat memperbarui berita." };
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

    return { success: true, message: "Berita kegiatan berhasil dihapus!" };
  } catch (error: any) {
    console.error("Gagal menghapus berita:", error);
    return { success: false, message: "Gagal menghapus berita." };
  }
}

export async function createOrganization(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slugRaw = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !description) {
      return { success: false, message: "Nama dan deskripsi kelompok wajib diisi." };
    }

    const slug = (slugRaw || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existing = await prisma.organization.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, message: `Slug atau kelompok "${slug}" sudah terdaftar.` };
    }

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return { success: false, message: "Ukuran foto tidak boleh melebihi 5 MB." };
      }
      const upload = await uploadImage(imageFile, slug);
      if (!upload.ok) {
        return { success: false, message: upload.message || "Gagal mengunggah foto." };
      }
      imageUrl = upload.url;
    }

    const defaultStructure = {
      namaStruktural: name,
      subjudul: name,
      ketua: "-",
      sekretaris: "-",
      bendahara: "-",
      seksi: [],
      anggota: [],
    };

    await prisma.organization.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        structureInfo: JSON.stringify(defaultStructure),
      },
    });

    revalidatePath("/admin/organisasi");
    revalidatePath("/");
    return { success: true, message: `Komunitas "${name}" berhasil ditambahkan!` };
  } catch (error: any) {
    console.error("Gagal create organisasi:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}

export async function deleteOrganization(id: number) {
  try {
    const org = await prisma.organization.findUnique({
      where: { id },
      include: { news: true },
    });

    if (!org) {
      return { success: false, message: "Organisasi tidak ditemukan." };
    }

    if (org.imageUrl && org.imageUrl.includes("cloudinary.com")) {
      await deleteImage(org.imageUrl);
    }

    for (const n of org.news) {
      if (n.image && n.image.includes("cloudinary.com")) {
        await deleteImage(n.image);
      }
    }

    await prisma.organization.delete({
      where: { id },
    });

    revalidatePath("/admin/organisasi");
    revalidatePath("/");
    return { success: true, message: `Komunitas "${org.name}" berhasil dihapus!` };
  } catch (error: any) {
    console.error("Gagal delete organisasi:", error);
    return { success: false, message: "Gagal menghapus organisasi." };
  }
}

export async function updateOrganizationStructure(id: number, formData: FormData) {
  try {
    const org = await prisma.organization.findUnique({
      where: { id },
    });

    if (!org) {
      return { success: false, message: "Organisasi tidak ditemukan." };
    }

    let currentStruct: any = {
      namaStruktural: org.name,
      subjudul: org.name,
      ketua: "-",
      fotoKetua: null,
      sekretaris: "-",
      fotoSekretaris: null,
      bendahara: "-",
      fotoBendahara: null,
      members: [],
    };

    if (org.structureInfo) {
      try {
        currentStruct = { ...currentStruct, ...JSON.parse(org.structureInfo) };
      } catch (e) { }
    }

    const ketua = formData.get("ketua") as string;
    const sekretaris = formData.get("sekretaris") as string;
    const bendahara = formData.get("bendahara") as string;
    const membersJson = formData.get("membersJson") as string;

    const fotoKetuaFile = formData.get("fotoKetua") as File | null;
    const fotoSekretarisFile = formData.get("fotoSekretaris") as File | null;
    const fotoBendaharaFile = formData.get("fotoBendahara") as File | null;

    let fotoKetuaUrl = currentStruct.fotoKetua || null;
    let fotoSekretarisUrl = currentStruct.fotoSekretaris || null;
    let fotoBendaharaUrl = currentStruct.fotoBendahara || null;

    // 1. Upload Foto Pejabat Inti
    if (fotoKetuaFile && fotoKetuaFile.size > 0) {
      const upload = await uploadImage(fotoKetuaFile, `${org.slug}-ketua-${Date.now()}`);
      if (upload.ok) fotoKetuaUrl = upload.url;
    }

    if (fotoSekretarisFile && fotoSekretarisFile.size > 0) {
      const upload = await uploadImage(fotoSekretarisFile, `${org.slug}-sekretaris-${Date.now()}`);
      if (upload.ok) fotoSekretarisUrl = upload.url;
    }

    if (fotoBendaharaFile && fotoBendaharaFile.size > 0) {
      const upload = await uploadImage(fotoBendaharaFile, `${org.slug}-bendahara-${Date.now()}`);
      if (upload.ok) fotoBendaharaUrl = upload.url;
    }

    // 2. Parse & Upload Foto Anggota
    let parsedMembers: any[] = [];
    if (membersJson) {
      try {
        parsedMembers = JSON.parse(membersJson);
      } catch (e) { }
    }

    // Loop tiap anggota: jika ada file foto baru yang di-append di FormData, upload ke Cloudinary
    for (let i = 0; i < parsedMembers.length; i++) {
      const m = parsedMembers[i];
      const memberFile = formData.get(`memberFile_${m.id}`) as File | null;

      if (memberFile && memberFile.size > 0) {
        const uploadMember = await uploadImage(memberFile, `${org.slug}-member-${m.id}-${Date.now()}`);
        if (uploadMember.ok) {
          m.foto = uploadMember.url; // ganti URL blob sementara dengan URL permanen Cloudinary
        }
      }
    }

    const updatedData = {
      ...currentStruct,
      ketua: ketua || "-",
      fotoKetua: fotoKetuaUrl,
      sekretaris: sekretaris || "-",
      fotoSekretaris: fotoSekretarisUrl,
      bendahara: bendahara || "-",
      fotoBendahara: fotoBendaharaUrl,
      members: parsedMembers,
    };

    await prisma.organization.update({
      where: { id },
      data: {
        structureInfo: JSON.stringify(updatedData),
      },
    });

    revalidatePath(`/struktural/${org.slug}`);
    revalidatePath("/admin/organisasi");
    revalidatePath(`/admin/organisasi/${id}/struktural`);

    return { success: true, message: "Bagan & seluruh personel berhasil disimpan!" };
  } catch (error: any) {
    console.error("Gagal update struktural:", error);
    return { success: false, message: "Terjadi kesalahan server saat menyimpan data." };
  }
}