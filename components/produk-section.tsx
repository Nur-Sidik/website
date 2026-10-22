import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export async function ProdukSection() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-16 bg-[#FFF9F2]" id="produk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-[#B58D5A] uppercase">
            OLEH-OLEH
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Produk Lokal Unggulan
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-gray-600 mx-auto">
            Dukung ekonomi lokal Desa Banaran dengan membeli produk olahan warga sekitar.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-gray-500 py-8">
              Belum ada produk yang tersedia.
            </p>
          ) : (
            products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col justify-between group"
              >
                {/* Bagian gambar & teks bisa diklik menuju halaman detail dinamis */}
                <Link href={`/kategori/produk/${item.slug}`} className="block">
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={item.imageUrl || "/images/Foto1.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </Link>

                {/* Footer kartu: Harga dan Tombol WA Langsung */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Harga</span>
                    <span className="text-lg font-bold text-green-700">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/6281289368677?text=${encodeURIComponent(
                      `Halo admin Desa Banaran, saya ingin memesan produk: ${item.name}, apakah masih tersedia?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
                  >
                    Pesan WA
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}