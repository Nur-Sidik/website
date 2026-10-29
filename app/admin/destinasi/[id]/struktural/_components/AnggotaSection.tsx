import Image from "next/image";
import { User, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { MemberItem } from "./ModalAnggota";

interface Props {
  members: MemberItem[];
  onAddClick: () => void;
  onEditClick: (item: MemberItem) => void;
  onDeleteClick: (id: string, name: string) => void;
  onViewFoto: (url: string, title: string) => void;
}

export function AnggotaSection({
  members,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onViewFoto,
}: Props) {
  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900">
            2. Anggota, Koordinator & Seksi ({members.length})
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Daftar pengurus pelaksana di luar ketua, sekretaris, dan bendahara.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Anggota
        </button>
      </div>

      {members.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-400 italic">
          Belum ada anggota atau seksi yang ditambahkan. Klik tombol di atas untuk menambah.
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {members.map((m) => (
            <div key={m.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
                  {m.foto ? (
                    <Image src={m.foto} alt={m.name} fill className="object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900">{m.name}</h4>
                  <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                    {m.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {m.foto && (
                  <button
                    type="button"
                    onClick={() => onViewFoto(m.foto!, m.name)}
                    title="Lihat Foto"
                    className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-gray-200 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onEditClick(m)}
                  title="Edit Anggota"
                  className="p-1.5 text-gray-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg border border-gray-200 transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteClick(m.id, m.name)}
                  title="Hapus Anggota"
                  className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-gray-200 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}