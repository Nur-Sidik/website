import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  updateOrganization,
  createOrganizationNews,
  deleteOrganizationNews,
} from "@/app/actions/organization";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOrganisasiPage({ params }: PageProps) {
  const resolvedParams = await params;
  const orgId = parseInt(resolvedParams.id, 10);

  if (isNaN(orgId)) {
    notFound();
  }

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      news: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!org) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateOrganization(orgId, formData);
  }

  async function handleCreateNews(formData: FormData) {
    "use server";
    await createOrganizationNews(orgId, formData);
  }

  async function handleDeleteNews(formData: FormData) {
    "use server";
    const newsId = Number(formData.get("newsId"));
    if (newsId) {
      await deleteOrganizationNews(newsId, orgId);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Kelola: {org.name}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Perbarui informasi profil kelompok, foto utama, dan kelola berita kegiatan.
        </p>
      </div>

      {/* FORM 1: Profil & Foto Utama */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-6 border-b pb-3">
          1. Profil & Foto Bersama
        </h2>

        <form action={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Organisasi / Kelompok
            </label>
            <input
              type="text"
              name="name"
              defaultValue={org.name}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Deskripsi Singkat
            </label>
            <textarea
              name="description"
              defaultValue={org.description}
              rows={4}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Foto Kelompok Saat Ini
            </label>
            {org.imageUrl ? (
              <div className="relative h-44 w-72 mb-3 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={org.imageUrl}
                  alt={org.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="text-xs text-gray-400 mb-2 italic">Belum ada foto yang diunggah.</p>
            )}

            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Unggah Foto Baru (&lt; 5 MB)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </form>
      </section>

      {/* FORM 2: Tambah Berita Baru */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-2">
          2. Tambah Berita / Kegiatan Baru
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Dokumentasi yang ditambahkan akan tampil di kanal berita halaman publik kelompok ini.
        </p>

        <form action={handleCreateNews} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Judul Kegiatan / Berita
            </label>
            <input
              type="text"
              name="title"
              placeholder="Contoh: Kegiatan Bersih Pantai dan Monitoring"
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Isi Dokumentasi Kegiatan
            </label>
            <textarea
              name="content"
              placeholder="Tuliskan berita lengkap mengenai kegiatan..."
              rows={4}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Foto Kegiatan (&lt; 5 MB)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Terbitkan Berita Kegiatan
          </button>
        </form>
      </section>

      {/* DAFTAR & AKSI HAPUS BERITA */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4 border-b pb-3">
          3. Daftar Berita Diterbitkan ({org.news.length})
        </h2>

        {org.news.length === 0 ? (
          <p className="text-xs text-gray-400 py-4 italic text-center">
            Belum ada berita yang diterbitkan untuk kelompok ini.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {org.news.map((item) => {
              const deleteActionWithIds = deleteOrganizationNews.bind(null, item.id, org.id);

              return (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-16 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 shrink-0">
                        Tanpa Foto
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.content}</p>
                    </div>
                  </div>

                  <form action={handleDeleteNews}>
                    <input type="hidden" name="newsId" value={item.id} />
                    <button
                      type="submit"
                      title="Hapus Berita"
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}