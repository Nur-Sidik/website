import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { deleteProduct } from "@/app/actions/delete";

export function ProdukTable({ products }: { products: any[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Daftar Produk UMKM</h2>
        <Link
          href="/admin/product/tambah"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Tambah Baru &rarr;
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Foto</th>
              <th className="px-6 py-4">Nama Produk</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4">Stok</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  Belum ada data produk.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  {/* 1. Foto */}
                  <td className="px-6 py-4">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <Image
                        src={item.imageUrl || "/images/Foto1.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* 2. Nama Produk */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                    <p className="text-xs text-gray-400 mt-0.5">/{item.slug}</p>
                  </td>

                  {/* 3. Harga */}
                  <td className="px-6 py-4 font-semibold text-green-700">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </td>

                  {/* 4. Stok */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.stock} unit
                    </span>
                  </td>

                  {/* 5. Aksi */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/product/${item.id}/edit`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={item.id}
                        itemType="produk"
                        onDelete={deleteProduct}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}