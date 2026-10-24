import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export async function WisataSection() {
  // 1. Ambil data destinasi langsung dari database MySQL
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-12 bg-white" id="wisata">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Destinasi Unggulan Desa Banaran
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Temukan berbagai pengalaman seru dan keindahan alam yang hanya ada di Desa Banaran.
          </p>
        </div>

        {/* 2. Grid Render Dinamis */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              Belum ada destinasi yang ditambahkan.
            </p>
          ) : (
            destinations.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="flex-shrink-0 relative h-48 w-full bg-gray-100">
                  <Image
                    src={item.imageUrl || "/images/FotoPantai.jpeg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <Link
                      href={`/kategori/wisata/${item.slug}`}
                      className="block mt-2"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-green-600 transition">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">
                        {item.description}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-700">
                      {Number(item.price) > 0
                        ? `Rp ${Number(item.price).toLocaleString("id-ID")}`
                        : "Gratis"}
                    </span>
                    <Link
                      href={`/kategori/wisata/${item.slug}`}
                      className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500"
                    >
                      Detail &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}