import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminEditStrukturalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orgId = parseInt(id, 10);

  if (isNaN(orgId)) notFound();

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
  });

  if (!org) notFound();

  let struct = {
    namaStruktural: org.name,
    subjudul: org.name,
    ketua: "",
    sekretaris: "",
    bendahara: "",
  };
  try {
    if (org.structureInfo) {
      struct = { ...struct, ...JSON.parse(org.structureInfo) };
    }
  } catch (e) {}

  async function handleSaveStruktural(formData: FormData) {
    "use server";
    const ketua = formData.get("ketua") as string;
    const sekretaris = formData.get("sekretaris") as string;
    const bendahara = formData.get("bendahara") as string;

    const updatedData = {
      ...struct,
      ketua: ketua || "-",
      sekretaris: sekretaris || "-",
      bendahara: bendahara || "-",
    };

    await prisma.organization.update({
      where: { id: orgId },
      data: {
        structureInfo: JSON.stringify(updatedData),
      },
    });

    revalidatePath(`/struktural/${org?.slug}`);
    revalidatePath("/admin/organisasi");
    revalidatePath(`/admin/organisasi/${orgId}/struktural`);
  }

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3 border-b pb-5">
        <Link
          href="/admin/organisasi"
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Personel Struktural: {org.name}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola nama pejabat inti dan struktur bagan kepengurusan.
          </p>
        </div>
      </div>

      <form action={handleSaveStruktural} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center gap-3 text-xs text-emerald-800">
            <Users className="w-5 h-5 shrink-0 text-emerald-700" />
            <span>
              Perubahan pada nama di bawah ini akan langsung tampil secara otomatis pada diagram alur di halaman <b>/struktural/{org.slug}</b>.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Lengkap Ketua
            </label>
            <input
              type="text"
              name="ketua"
              defaultValue={struct.ketua}
              required
              placeholder="Contoh: Nuryanto"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Lengkap Sekretaris
            </label>
            <input
              type="text"
              name="sekretaris"
              defaultValue={struct.sekretaris}
              required
              placeholder="Contoh: Andri Sulistyo"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Lengkap Bendahara
            </label>
            <input
              type="text"
              name="bendahara"
              defaultValue={struct.bendahara}
              required
              placeholder="Contoh: Eko Aryanti"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            Simpan Bagan Struktural
          </button>
        </div>
      </form>
    </div>
  );
}