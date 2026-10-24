import prisma from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DestinasiTable } from "./_components/DestinasiTable";
import { ProdukTable } from "./_components/ProdukTable";
import { ArtikelTable } from "./_components/ArtikelTable";
import { LogoutButton } from "./_components/Logout";
import { AdminManagement } from "./_components/AdminManagement";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 1. Ambil data sesi admin yang sedang login dari cookie JWT
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const session = token
    ? ((await verifyToken(token)) as { id: number; username: string } | null)
    : null;

  const currentAdminId = session?.id || 0;
  const isSuperAdmin = session?.username === "Super Admin Banaran";

  // 2. Tarik semua data yang dibutuhkan dari database
  const [destinations, products, articles, admins] = await Promise.all([
    prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <main className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Dashboard & Tombol Logout */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Pengelola
              </h1>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-200">
                Admin Panel
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Kelola informasi destinasi wisata, produk UMKM, dan artikel Desa Banaran.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition"
            >
              Lihat Web Publik &rarr;
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Ringkasan Statistik Singkat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Destinasi
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {destinations.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Produk UMKM
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {products.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Artikel
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {articles.length}
            </p>
          </div>
        </div>

        {/* Modul Kelola Pengguna Admin dengan Role Check */}
        <AdminManagement
          admins={admins}
          currentAdminId={currentAdminId}
          isSuperAdmin={isSuperAdmin}
        />

        {/* Tabel Data Kelola Konten */}
        <DestinasiTable destinations={destinations} />
        <ProdukTable products={products} />
        <ArtikelTable articles={articles} />
      </div>
    </main>
  );
}