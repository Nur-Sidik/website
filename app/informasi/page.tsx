import prisma from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function InformasiPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Informasi & Berita Terkini
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Seputar agenda kegiatan, perkembangan desa wisata, dan kabar terbaru dari Desa Banaran.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-500">Belum ada artikel informasi yang dirilis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="relative h-52 w-full bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <time className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h2 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-xs text-gray-600 line-clamp-4 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}