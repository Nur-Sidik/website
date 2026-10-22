import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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

  const priceNumber = Number(product.price);
  
  // Nomor pengelola/penjual UMKM Desa Banaran (format: 628xxx tanpa tanda +)
  const waNumber = "6281289368677";
  const waText = encodeURIComponent(
    `Halo, saya tertarik memesan produk "${product.name}" dari website Ecotourism Desa Banaran. Apakah masih tersedia?`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex-1 w-full">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-green-800 mb-6 transition"
        >
          &larr; Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          {/* Foto Produk */}
          <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={product.imageUrl || "/images/Foto1.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Rincian Produk */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Produk Lokal UMKM
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-800">
                  Rp {priceNumber.toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-gray-500">
                  Tersedia {product.stock} unit
                </span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Deskripsi Produk
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Tombol Pesan WhatsApp */}
            <div className="pt-6 border-t border-gray-100">
              <Link
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition"
              >
                Pesan via WhatsApp
              </Link>
              <p className="text-[11px] text-gray-400 text-center mt-2">
                Pemesanan langsung terhubung dengan pengelola UMKM Banaran
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}