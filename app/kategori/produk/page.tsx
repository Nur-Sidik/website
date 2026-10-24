import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProdukCatalogPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Katalog UMKM Desa Banaran
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Produk kerajinan dan kuliner asli hasil karya masyarakat dan kelompok usaha mandiri Banaran.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-500">Belum ada produk yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
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
                  <div className="absolute bottom-3 left-3 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </div>
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
                      href={`/kategori/produk/${item.slug}`}
                      className="inline-flex text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                    >
                      Beli / Info Pemesanan &rarr;
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