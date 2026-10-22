"use client";

import { useState, useEffect } from "react";
import { updateDestination } from "@/app/actions/destination";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function EditDestinasiForm({ destination }: { destination: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    // Pencegah Reload / Tutup Tab & Swap Layar (Gesture Back)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        if (isDirty) {
            window.history.pushState({ noBack: true }, "", window.location.href);

            const handlePopState = () => {
                const confirmLeave = window.confirm(
                    "Perubahan belum disimpan. Yakin ingin membatalkan editan dan keluar?"
                );

                if (!confirmLeave) {
                    window.history.pushState({ noBack: true }, "", window.location.href);
                } else {
                    setIsDirty(false);
                    window.history.back();
                }
            };

            window.addEventListener("popstate", handlePopState);
            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("popstate", handlePopState);
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    function handleCancel(e: React.MouseEvent) {
        if (isDirty) {
            const confirmLeave = window.confirm(
                "Perubahan belum disimpan. Yakin ingin membatalkan dan keluar?"
            );
            if (!confirmLeave) e.preventDefault();
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        const MAX_SIZE_MB = 5;
        const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

        if (file && file.size > MAX_SIZE_BYTES) {
            alert(
                `Ukuran file "${file.name}" terlalu besar (${(file.size / (1024 * 1024)).toFixed(1)} MB)!\nMaksimal ukuran foto adalah ${MAX_SIZE_MB} MB.`
            );
            e.target.value = "";
        } else {
            setIsDirty(true);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const confirmSave = window.confirm("Apakah data destinasi sudah sesuai dan siap disimpan?");
        if (!confirmSave) return;

        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const res = await updateDestination(destination.id, formData);

        if (res.success) {
            setIsDirty(false);
            setMessage({ text: res.message, isError: false });
            setTimeout(() => router.push("/admin"), 1000);
        } else {
            setMessage({ text: res.message, isError: true });
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Destinasi Wisata</h1>
                <Link
                    href="/admin"
                    onClick={handleCancel}
                    className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                    &larr; Batal
                </Link>
            </div>

            {message && (
                <div
                    className={`p-4 mb-6 rounded-md text-sm font-medium ${message.isError
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                onChange={() => setIsDirty(true)}
                className="space-y-6"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Destinasi
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        defaultValue={destination.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Harga Tiket Masuk (Rp)
                    </label>
                    <input
                        type="number"
                        name="price"
                        min="0"
                        step="any"
                        required
                        defaultValue={Number(destination.price)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Destinasi
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        defaultValue={destination.description}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Foto Saat Ini
                    </label>
                    <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mb-3">
                        <Image
                            src={destination.imageUrl || "/images/FotoPantai.jpeg"}
                            alt={destination.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <label className="block text-sm text-gray-500 mb-1">
                        Ganti Foto Baru (Opsional, Maks. 5 MB)
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold rounded-lg shadow transition disabled:bg-gray-400 cursor-pointer"
                >
                    {loading ? "Menyimpan perubahan..." : "Perbarui Destinasi"}
                </button>
            </form>
        </div>
    );
}