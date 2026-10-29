import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

export function TambahKomunitasModal({ isOpen, onClose, onSubmit, isPending }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <h3 className="text-base font-bold text-gray-900">Tambah Komunitas Baru</h3>
          <p className="text-xs text-gray-500 mt-1">
            Komunitas baru akan otomatis dibuatkan rute halaman dan masuk ke dropdown Navbar.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Komunitas / Kelompok
            </label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Karang Taruna Banaran"
              required
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Slug URL (Opsional, otomatis digenerate bila kosong)
            </label>
            <input
              type="text"
              name="slug"
              placeholder="Contoh: karang-taruna"
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Deskripsi Singkat Kelompok
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Deskripsi kegiatan atau peran kelompok di desa..."
              required
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Foto Utama Kelompok (&lt; 5 MB)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Menyimpan..." : "Simpan Komunitas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}