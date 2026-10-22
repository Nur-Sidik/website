"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahProdukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 5 MB

    if (file && file.size > MAX_SIZE_BYTES) {
      alert(
        `Ukuran file "${file.name}" terlalu besar (${(file.size / (1024 * 1024)).toFixed(1)} MB)!\nMaksimal ukuran foto adalah ${MAX_SIZE_MB} MB.`
      );
      e.target.value = ""; // Reset input file agar batal dipilih
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await createProduct(formData);

    if (res.success) {
      setMessage({ text: res.message, isError: false });
      form.reset();
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } else {
      setMessage({ text: res.message, isError: true });
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tambah Produk UMKM</h1>
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Kembali ke Dashboard
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Contoh: Keripik Mangrove Khas Banaran"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Produk (Rp)
              </label>
              <input
                type="number"
                name="price"
                min={0}
                step={1000}
                required
                placeholder="Contoh: 15000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                min={0}
                required
                placeholder="Contoh: 10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Produk
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Jelaskan keunikan bahan, rasa, atau manfaat produk..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto Produk (Maks. 5 MB)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Format: JPG, PNG, atau WEBP. Ukuran maksimal 5 MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Menyimpan data..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}