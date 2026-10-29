import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export default async function InformasiPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO / HEADER SECTION */}
      {/* 2. HERO / HEADER SECTION (HIJAU SOLID DESA BANARAN) */}
      <section className="w-full bg-[#1B4332] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3 pt-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Informasi & Berita Terkini
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-medium max-w-xl mx-auto">
            Seputar agenda kegiatan, perkembangan desa wisata, dan kabar terbaru dari Desa Banaran.
          </p>
        </div>
      </section>

      {/* 3. KONTEN DAFTAR ARTIKEL */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 ? (
          <div className="py-20 text-center text-sm text-gray-400 italic">
            Belum ada informasi atau berita yang diterbitkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                  {art.imageUrl ? (
                    <Image
                      src={art.imageUrl}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      Tidak ada foto
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      {new Date(art.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {art.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}   