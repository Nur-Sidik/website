import Link from "next/link";
import { Users, UserCheck, ExternalLink } from "lucide-react";
import { OrgItem } from "./OrganisasiTable";

export function StrukturalCards({ organizations }: { organizations: OrgItem[] }) {
  return (
    <section className="space-y-4 pt-4">
      <div>
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-700" />
          Kelola Personel & Bagan Struktural
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Atur nama pejabat inti dan struktur bagan kepengurusan untuk halaman publik struktural.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {organizations.map((org) => {
          let struct = { ketua: "-", sekretaris: "-", bendahara: "-" };
          try {
            if (org.structureInfo) {
              struct = { ...struct, ...JSON.parse(org.structureInfo) };
            }
          } catch (e) {}

          return (
            <div
              key={org.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    {org.slug}
                  </span>
                  <Link
                    href={`/struktural/${org.slug}`}
                    target="_blank"
                    className="text-[11px] text-gray-400 hover:text-emerald-700 flex items-center gap-1"
                  >
                    Bagan Publik <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <h3 className="font-bold text-gray-900 text-sm">{org.name}</h3>

                <div className="mt-4 space-y-2 text-xs bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Ketua:</span>
                    <span className="font-semibold text-gray-800">{struct.ketua || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Sekretaris:</span>
                    <span className="font-semibold text-gray-800">{struct.sekretaris || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Bendahara:</span>
                    <span className="font-semibold text-gray-800">{struct.bendahara || "-"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/admin/organisasi/${org.id}/struktural`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-600 hover:text-emerald-800 text-gray-700 font-semibold text-xs rounded-xl transition shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Edit Personel & Foto Struktural
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}