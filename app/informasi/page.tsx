import prisma from "@/lib/prisma";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function InformasiPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Navbar melayang bawaan proyekmu */}
      <Navbar />

      {/* Hero Banner Hijau: tempat bersandarnya Navbar transparan */}
      <section className="bg-[#1B4332] pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-white shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Berita & Informasi Desa
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100 max-w-2xl mx-auto">
            Dapatkan kabar terkini seputar kegiatan komunitas, ekowisata, dan perkembangan Desa Banaran.
          </p>
        </div>
      </section>

      {/* Grid Kartu Berita dari Database */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 w-full">
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">Belum ada berita atau informasi yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full bg-gray-100">
                    <Image
                      src={item.imageUrl || "/images/FotoMangrove.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-[#1B4332] uppercase tracking-wider block mb-2">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-[#1B4332] transition">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="text-sm font-semibold text-[#1B4332] hover:underline inline-flex items-center cursor-pointer">
                    Baca Selengkapnya &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}