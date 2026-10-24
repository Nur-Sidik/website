import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WisataCatalogPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Destinasi Wisata Desa Banaran
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Kumpulan pesona wisata alam, hutan mangrove, dan pantai asri yang siap menyambut kunjungan Anda.
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-500">Belum ada destinasi yang ditambahkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.price !== null && item.price !== undefined && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/kategori/Wisata/${item.slug}`}
                      className="inline-flex text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                    >
                      Lihat Rincian &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}