import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateOrganization, createOrganizationNews } from "@/app/actions/organization";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function EditOrganisasiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orgId = parseInt(id);

  if (isNaN(orgId)) notFound();

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      news: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!org) notFound();

  const updateActionWithId = updateOrganization.bind(null, org.id);
  const createNewsWithId = createOrganizationNews.bind(null, org.id);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Kelola: {org.name}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Ubah deskripsi, foto kelompok, dan tambahkan agenda berita kegiatan resmi.
        </p>
      </div>

      {/* FORM 1: Update Profil & Foto Kelompok */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-6 border-b pb-3">
          1. Profil & Foto Bersama
        </h2>

        <form action={updateActionWithId} className="space-y-5">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nama Ketua / Penggerak
              </label>
              <input
                type="text"
                name="leaderName"
                defaultValue={org.leaderName || ""}
                placeholder="Contoh: Nuryanto"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Jabatan
              </label>
              <input
                type="text"
                name="leaderTitle"
                defaultValue={org.leaderTitle || ""}
                placeholder="Contoh: Ketua KTH Tirto Manunggal"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Ganti Foto Bersama Kelompok (Cloudinary)
            </label>
            {org.groupImage || org.imageUrl ? (
              <div className="relative h-40 w-72 mb-3 rounded-xl overflow-hidden border">
                <Image
                  src={org.groupImage || org.imageUrl || ""}
                  alt={org.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <input
              type="file"
              name="groupImage"
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

      {/* FORM 2: Tambah Berita / Foto Kegiatan Baru */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-2">
          2. Tambah Berita / Kegiatan Baru
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Akan langsung otomatis muncul di kotak berita halaman publik kelompok ini.
        </p>

        <form action={createNewsWithId} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Judul Kegiatan / Berita
            </label>
            <input
              type="text"
              name="title"
              placeholder="Contoh: Penanaman 500 Bibit Cemara Udang"
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
              placeholder="Ceritakan detail kegiatan..."
              rows={4}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Foto Dokumentasi Kegiatan
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
    </div>
  );
}