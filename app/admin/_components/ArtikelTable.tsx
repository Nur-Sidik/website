import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "./DeleteButtons";
import { deleteArticle } from "@/app/actions/delete";

export function ArtikelTable({ articles }: { articles: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Daftar Berita & Informasi</h2>
                <Link
                    href="/admin/artikel/tambah"
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
                            <th className="py-3 px-4">Judul Berita</th>
                            <th className="py-3 px-4">Ringkasan</th>
                            <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-400">
                                    Belum ada berita.
                                </td>
                            </tr>
                        ) : (
                            articles.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                    <td className="py-3 px-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.imageUrl || "/images/Foto2.jpg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <p className="font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-[11px] text-gray-400">/{item.slug}</p>
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 max-w-xs truncate">
                                        {item.excerpt || item.content?.slice(0, 60)}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Link
                                            href={`/admin/artikel/${item.id}/edit`}
                                            className="text-blue-600 hover:underline font-semibold"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteButton
                                            id={item.id}
                                            itemName={item.title}
                                            itemType="Artikel"
                                            onDeleteAction={deleteArticle}
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