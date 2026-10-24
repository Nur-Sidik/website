import Image from "next/image";
import Link from "next/link";

export function WisataSection({ destinations }: { destinations: any[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Destinasi Wisata Unggulan
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Jelajahi keindahan alam dan ekowisata pesisir Desa Banaran.
            </p>
          </div>
          <Link
            href="/kategori/wisata"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition"
          >
            Lihat Semua Wisata &rarr;
          </Link>
        </div>

        {(!destinations || destinations.length === 0) ? (
          <div className="text-center py-12 text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            Belum ada destinasi wisata yang dipublikasikan.
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
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/kategori/wisata/${item.slug}`}
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
    </section>
  );
}