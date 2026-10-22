"use client";

import { useState, useEffect } from "react";
import { updateProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // 1. Pencegah Reload / Tutup Tab DAN Swap Layar (Gesture Back HP / Browser History)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    if (isDirty) {
      // Selipkan history state dummy agar gesture back tertahan
      window.history.pushState({ noBack: true }, "", window.location.href);

      const handlePopState = () => {
        const confirmLeave = window.confirm(
          "Perubahan belum disimpan. Yakin ingin membatalkan editan dan keluar?"
        );

        if (!confirmLeave) {
          // Kunci kembali halaman jika user memilih batal
          window.history.pushState({ noBack: true }, "", window.location.href);
        } else {
          // Izinkan browser beneran kembali
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

  // 2. Konfirmasi klik manual tombol "Batal"
  function handleCancel(e: React.MouseEvent) {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "Perubahan belum disimpan. Yakin ingin membatalkan dan keluar?"
      );
      if (!confirmLeave) e.preventDefault();
    }
  }

  // 3. Validasi ukuran foto maksimal 5 MB
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

  // 4. Konfirmasi sebelum submit data ke server
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const confirmSave = window.confirm("Apakah data yang diubah sudah benar dan siap disimpan?");
    if (!confirmSave) return;

    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateProduct(product.id, formData);

    if (res.success) {
      setIsDirty(false); // Matikan status dirty agar redirect tidak dicegat
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Produk UMKM</h1>
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
          className={`p-4 mb-6 rounded-md text-sm font-medium ${
            message.isError
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
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={product.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga (Rp)
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="any"
              required
              defaultValue={Number(product.price)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok
            </label>
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              required
              defaultValue={product.stock}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            defaultValue={product.description}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto Saat Ini
          </label>
          <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mb-3">
            <Image
              src={product.imageUrl || "/images/Foto1.jpg"}
              alt={product.name}
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
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Menyimpan perubahan..." : "Perbarui Produk"}
        </button>
      </form>
    </div>
  );
}