import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DetailProdukPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  // Pesan WhatsApp otomatis untuk pemesanan
  const waMessage = encodeURIComponent(
    `Halo Pengelola UMKM Desa Banaran, saya ingin memesan produk "${product.name}". Apakah stok masih tersedia?`
  );

  return (
    <main className="min-h-screen bg-gray-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/kategori/produk"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-800 transition mb-6"
        >
          &larr; Kembali ke Katalog Produk
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-between h-full">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-2xl font-black text-emerald-800 mb-6">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <a
                  href={`https://wa.me/6281234567890?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition shadow-sm"
                >
                  Pesan via WhatsApp
                </a>
                <p className="text-[11px] text-gray-400 text-center mt-2">
                  Terhubung langsung dengan pengelola UMKM Desa Banaran
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              Deskripsi Produk
            </h3>
            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}