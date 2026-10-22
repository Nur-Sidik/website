import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "./DeleteButtons";
import { deleteDestination } from "@/app/actions/delete";


export function DestinasiTable({ destinations }: { destinations: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Daftar Destinasi Wisata</h2>
                <Link
                    href="/admin/destinasi/tambah"
                    className="text-xs font-semibold text-green-700 hover:underline"
                >
                    Tambah Baru &rarr;
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 text-gray-400 uppercase text-[10px]">
                        <tr>
                            <th className="py-3 px-4">Foto</th>
                            <th className="py-3 px-4">Nama Destinasi</th>
                            <th className="py-3 px-4">Harga Tiket</th>
                            <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {destinations.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-400">
                                    Belum ada destinasi.
                                </td>
                            </tr>
                        ) : (
                            destinations.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                    <td className="py-3 px-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.imageUrl || "/images/FotoPantai.jpeg"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <p className="font-semibold text-gray-900">{item.name}</p>
                                        <p className="text-[11px] text-gray-400">/{item.slug}</p>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-700">
                                        Rp {Number(item.price).toLocaleString("id-ID")}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Link
                                            href={`/admin/destinasi/${item.id}/edit`}
                                            className="text-blue-600 hover:underline font-semibold"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteButton
                                            id={item.id}
                                            itemName={item.name}
                                            itemType="Destinasi"
                                            onDeleteAction={deleteDestination}
                                        />
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