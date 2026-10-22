import prisma from "@/lib/prisma";
import Link from "next/link";
import { DestinasiTable } from "./_components/DestinasiTable";
import { ProdukTable } from "./_components/ProdukTable";
import { ArtikelTable } from "./_components/ArtikelTable";

export default async function AdminDashboardPage() {
  const [destinations, products, articles] = await Promise.all([
    prisma.destination.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.article.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Panel Admin</h1>
            <p className="text-sm text-gray-500">Kelola konten website Ecotourism Desa Banaran</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Lihat Website
            </Link>
            <Link href="/admin/destinasi/tambah" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
              + Tambah Destinasi
            </Link>
            <Link href="/admin/product/tambah" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              + Tambah Produk
            </Link>
            <Link href="/admin/artikel/tambah" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
              + Tambah Berita
            </Link>
          </div>
        </div>

        {/* Kartu Metrik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Destinasi Wisata</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{destinations.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Produk UMKM</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Artikel & Berita</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{articles.length}</p>
          </div>
        </div>

        {/* Komponen Tabel Terpisah */}
        <DestinasiTable destinations={destinations} />
        <ProdukTable products={products} />
        <ArtikelTable articles={articles} />

      </div>
    </div>
  );
}