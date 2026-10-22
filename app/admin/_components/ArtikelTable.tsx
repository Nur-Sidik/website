import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";
import { deleteArticle } from "@/app/actions/delete";

export function ArtikelTable({ articles }: { articles: any[] }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Daftar Berita & Informasi</h2>
                <Link href="/admin/artikel/tambah" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                    Tambah Baru &rarr;
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Foto</th>
                            <th className="px-6 py-4">Judul Berita</th>
                            <th className="px-6 py-4">Ringkasan</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">Belum ada artikel berita.</td>
                            </tr>
                        ) : (
                            articles.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image src={item.imageUrl || "/images/FotoMangrove.jpg"} alt={item.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {item.title}
                                        <p className="text-xs text-gray-400 mt-0.5">/{item.slug}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{item.content}</td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <Link
                                            href={`/admin/artikel/${item.id}/edit`}
                                            className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteButton id={item.id} itemType="artikel" onDelete={deleteArticle} />
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