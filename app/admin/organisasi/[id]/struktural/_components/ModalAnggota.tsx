import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { X, User, Eye } from "lucide-react";

export interface MemberItem {
  id: string;
  name: string;
  role: string;
  foto: string | null;
}

interface Props {
  isOpen: boolean;
  member: MemberItem | null;
  onClose: () => void;
  onSave: (memberData: { id?: string; name: string; role: string; file: File | null; currentFoto: string | null }) => void;
  onViewFoto: (url: string, title: string) => void;
}

export function ModalAnggota({ isOpen, member, onClose, onSave, onViewFoto }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setRole(member.role);
      setPreview(member.foto);
      setFile(null);
    } else {
      setName("");
      setRole("");
      setPreview(null);
      setFile(null);
    }
  }, [member, isOpen]);

  if (!isOpen) return null;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        const sizeMB = (selected.size / (1024 * 1024)).toFixed(1);
        window.alert(
          `Ukuran file "${selected.name}" terlalu besar (${sizeMB} MB)!\nMaksimal foto adalah 5 MB.`
        );
        e.target.value = "";
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !role) {
      window.alert("Nama dan Jabatan/Seksi wajib diisi!");
      return;
    }
    onSave({
      id: member?.id,
      name,
      role,
      file,
      currentFoto: member?.foto || null,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-bold text-gray-900">
          {member ? "Edit Personel / Anggota" : "Tambah Personel / Anggota Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 bg-white flex items-center justify-center shrink-0">
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-cover" />
              ) : (
                <User className="w-7 h-7 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Foto Personel (&lt; 5 MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-[11px] text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {preview && (
                <button
                  type="button"
                  onClick={() => onViewFoto(preview, name || "Personel")}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  <Eye className="w-3 h-3" /> Lihat Foto
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Rahmat Hidayat"
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Seksi / Jabatan / Divisi
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Contoh: Seksi Konservasi & Sabuk Hijau"
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
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
              className="px-5 py-2 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}