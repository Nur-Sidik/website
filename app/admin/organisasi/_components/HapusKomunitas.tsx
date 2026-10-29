import { Trash2 } from "lucide-react";
import { OrgItem } from "./OrganisasiTable";

interface Props {
  org: OrgItem | null;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function HapusKomunitasModal({ org, onClose, onConfirm, isPending }: Props) {
  if (!org) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100">
        <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center">
          <Trash2 className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Hapus Kelompok &quot;{org.name}&quot;?
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Tindakan ini permanen. Semua berita kegiatan, foto, dan struktur kelompok ini akan ikut terhapus dari sistem.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-50 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Menghapus..." : "Ya, Hapus Kelompok"}
          </button>
        </div>
      </div>
    </div>
  );
}