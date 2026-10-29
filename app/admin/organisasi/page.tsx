import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Edit3, Users, Newspaper, UserCheck, ArrowLeft } from "lucide-react";

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
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-12">
      {/* Header Info & Tombol Kembali ke Dashboard Utama */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard Utama
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Kelola Organisasi & Komunitas
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Daftar kelompok resmi Desa Banaran. Kelola profil, berita agenda, dan susunan bagan kepengurusan.
          </p>
        </div>
      </div>

      {/* TABEL 1: DAFTAR KELOMPOK & KANAL BERITA */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-emerald-700" />
            Daftar Kelompok & Publikasi Berita
          </h2>
          <span className="text-xs text-gray-400">Total: {organizations.length} Kelompok</span>
        </div>

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
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50/60 transition-colors">
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

                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-sm">{org.name}</div>
                      <div className="text-gray-500 text-xs line-clamp-1 max-w-xs mt-0.5">
                        {org.description}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-mono text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                        {org.slug}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                        <Newspaper className="w-3.5 h-3.5" />
                        {org.news.length}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/komunitas/${org.slug}`}
                          target="_blank"
                          title="Lihat Komunitas"
                          className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-gray-200 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/organisasi/${org.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Kelola Berita & Foto
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SEKSI 2: PENGATURAN BAGAN STRUKTURAL KEPENGURUSAN */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              Kelola Personel & Bagan Struktural
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Atur nama pejabat inti (Ketua, Sekretaris, Bendahara) dan foto personel untuk halaman publik struktural.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizations.map((org) => {
            let struct = { ketua: "-", sekretaris: "-", bendahara: "-" };
            try {
              if (org.structureInfo) {
                struct = { ...struct, ...JSON.parse(org.structureInfo) };
              }
            } catch (e) {}

            return (
              <div
                key={org.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                      {org.slug}
                    </span>
                    <Link
                      href={`/struktural/${org.slug}`}
                      target="_blank"
                      className="text-[11px] text-gray-400 hover:text-emerald-700 flex items-center gap-1"
                    >
                      Bagan Publik <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm">{org.name}</h3>

                  <div className="mt-4 space-y-2 text-xs bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Ketua:</span>
                      <span className="font-semibold text-gray-800">{struct.ketua || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Sekretaris:</span>
                      <span className="font-semibold text-gray-800">{struct.sekretaris || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Bendahara:</span>
                      <span className="font-semibold text-gray-800">{struct.bendahara || "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/admin/organisasi/${org.id}/struktural`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-600 hover:text-emerald-800 text-gray-700 font-semibold text-xs rounded-xl transition shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Edit Personel & Foto Struktural
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}