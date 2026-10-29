import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Edit3, Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrganisasiPage() {
  const organizations = await prisma.organization.findMany({
    orderBy: { id: "asc" },
    include: {
      news: {
        select: { id: true },
      },
    },
  });

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Kelola Organisasi & Komunitas
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Daftar kelompok resmi Desa Banaran. Pilih organisasi untuk memperbarui foto bersama atau menambahkan berita kegiatan.
          </p>
        </div>
      </div>

      {/* Tabel Organisasi */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50/75 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Foto</th>
                <th className="py-4 px-6">Nama Kelompok</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6 text-center">Total Berita</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {organizations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 text-xs">
                    Belum ada data organisasi yang tersimpan di database.
                  </td>
                </tr>
              ) : (
                organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Thumbnail Foto */}
                    <td className="py-4 px-6">
                      {org.imageUrl ? (
                        <div className="relative h-14 w-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                          <Image
                            src={org.imageUrl}
                            alt={org.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-14 w-20 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 text-center px-1">
                          Tanpa Foto
                        </div>
                      )}
                    </td>

                    {/* Nama & Deskripsi */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-sm">{org.name}</div>
                      <div className="text-gray-500 text-xs line-clamp-1 max-w-xs mt-0.5">
                        {org.description}
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                        {org.slug}
                      </span>
                    </td>

                    {/* Jumlah Berita */}
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                        <Newspaper className="w-3.5 h-3.5" />
                        {org.news.length}
                      </span>
                    </td>

                    {/* Tombol Aksi */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Link Preview Publik */}
                        <Link
                          href={`/komunitas/${org.slug}`}
                          target="_blank"
                          title="Lihat Halaman Publik"
                          className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-gray-200 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Tombol Edit */}
                        <Link
                          href={`/admin/organisasi/${org.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Kelola
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}