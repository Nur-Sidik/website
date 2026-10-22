import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { deleteDestination } from "@/app/actions/delete";

export function DestinasiTable({ destinations }: { destinations: any[] }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Daftar Destinasi Wisata</h2>
                <Link href="/admin/destinasi/tambah" className="text-sm font-medium text-green-600 hover:text-green-700">
                    Tambah Baru &rarr;
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Foto</th>
                            <th className="px-6 py-4">Nama Destinasi</th>
                            <th className="px-6 py-4">Harga Tiket</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {destinations.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">Belum ada data destinasi.</td>
                            </tr>
                        ) : (
                            destinations.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image src={item.imageUrl || "/images/FotoPantai.jpeg"} alt={item.name} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {item.name}
                                        <p className="text-xs text-gray-400 mt-0.5">/{item.slug}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {Number(item.price) > 0 ? `Rp ${Number(item.price).toLocaleString("id-ID")}` : "Gratis"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/destinasi/${item.id}/edit`}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                                            >
                                                Edit
                                            </Link>
                                            <DeleteButton id={item.id} itemType="destinasi" onDelete={deleteDestination} />
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