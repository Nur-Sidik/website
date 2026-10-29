import { ChangeEvent } from "react";
import Image from "next/image";
import { User, Eye } from "lucide-react";

interface Props {
  ketua: string;
  fotoKetua: string | null;
  sekretaris: string;
  fotoSekretaris: string | null;
  bendahara: string;
  fotoBendahara: string | null;
  onFileValidate: (e: ChangeEvent<HTMLInputElement>, setPreview: (url: string | null) => void) => void;
  setPreviewKetua: (url: string | null) => void;
  setPreviewSekretaris: (url: string | null) => void;
  setPreviewBendahara: (url: string | null) => void;
  onViewFoto: (url: string, title: string) => void;
}

export function PejabatIntiSection({
  ketua,
  fotoKetua,
  sekretaris,
  fotoSekretaris,
  bendahara,
  fotoBendahara,
  onFileValidate,
  setPreviewKetua,
  setPreviewSekretaris,
  setPreviewBendahara,
  onViewFoto,
}: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-bold text-gray-900 border-b pb-2">
        1. Pejabat Inti (Ketua, Sekretaris, Bendahara)
      </h2>

      {/* KETUA */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 bg-gray-50 flex items-center justify-center shadow-xs">
            {fotoKetua ? (
              <Image src={fotoKetua} alt="Ketua" fill className="object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            KETUA
          </span>
        </div>

        <div className="flex-1 w-full space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Ketua
            </label>
            <input
              type="text"
              name="ketua"
              defaultValue={ketua}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">Foto Ketua (&lt; 5 MB)</label>
              {fotoKetua && (
                <button
                  type="button"
                  onClick={() => onViewFoto(fotoKetua, "Ketua: " + ketua)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  <Eye className="w-3 h-3" /> View Foto
                </button>
              )}
            </div>
            <input
              type="file"
              name="fotoKetua"
              accept="image/*"
              onChange={(e) => onFileValidate(e, setPreviewKetua)}
              className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
        </div>
      </div>

      {/* SEKRETARIS */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 bg-gray-50 flex items-center justify-center shadow-xs">
            {fotoSekretaris ? (
              <Image src={fotoSekretaris} alt="Sekretaris" fill className="object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            SEKRETARIS
          </span>
        </div>

        <div className="flex-1 w-full space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Sekretaris
            </label>
            <input
              type="text"
              name="sekretaris"
              defaultValue={sekretaris}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">Foto Sekretaris (&lt; 5 MB)</label>
              {fotoSekretaris && (
                <button
                  type="button"
                  onClick={() => onViewFoto(fotoSekretaris, "Sekretaris: " + sekretaris)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  <Eye className="w-3 h-3" /> View Foto
                </button>
              )}
            </div>
            <input
              type="file"
              name="fotoSekretaris"
              accept="image/*"
              onChange={(e) => onFileValidate(e, setPreviewSekretaris)}
              className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
        </div>
      </div>

      {/* BENDAHARA */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 bg-gray-50 flex items-center justify-center shadow-xs">
            {fotoBendahara ? (
              <Image src={fotoBendahara} alt="Bendahara" fill className="object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            BENDAHARA
          </span>
        </div>

        <div className="flex-1 w-full space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Bendahara
            </label>
            <input
              type="text"
              name="bendahara"
              defaultValue={bendahara}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">Foto Bendahara (&lt; 5 MB)</label>
              {fotoBendahara && (
                <button
                  type="button"
                  onClick={() => onViewFoto(fotoBendahara, "Bendahara: " + bendahara)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  <Eye className="w-3 h-3" /> View Foto
                </button>
              )}
            </div>
            <input
              type="file"
              name="fotoBendahara"
              accept="image/*"
              onChange={(e) => onFileValidate(e, setPreviewBendahara)}
              className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}