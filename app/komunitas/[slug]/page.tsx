import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NewsCardDialog } from "@/components/news-card-dialog";

export default async function KomunitasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const org = await prisma.organization.findUnique({
    where: { slug },
    include: {
      news: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!org) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative min-h-[50vh] w-full flex flex-col justify-center pt-32 pb-12 bg-emerald-950 overflow-hidden">
        {org.imageUrl ? (
          <>
            <Image
              src={org.imageUrl}
              alt={org.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#143225] to-[#1B4332]" />
        )}

        <div className="relative z-10 w-full px-6 md:px-16 text-center md:text-left">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {org.name}
            </h1>
            <p className="text-base md:text-lg text-gray-200 font-light drop-shadow-md max-w-2xl mt-2">
              {org.description}
            </p>
            {!org.imageUrl && (
              <p className="mt-3 text-xs text-emerald-200/80 italic">
                (Foto utama kelompok belum diunggah oleh admin)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* KOTAK INFORMASI / PORTAL BERITA DINAMIS */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-mangrove-dark mb-4">Informasi & Kegiatan</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Kumpulan dokumentasi dan kabar terbaru mengenai kegiatan {org.name}.
          </p>
        </div>

        {org.news && org.news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {org.news.map((item) => (
              <NewsCardDialog key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 px-6 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 mb-3 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-700">
              Belum Ada Kegiatan / Berita
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              Admin {org.name} belum menerbitkan dokumentasi atau kabar kegiatan terbaru di sini.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}