import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { User } from "lucide-react";

export const dynamic = "force-dynamic";

interface MemberItem {
  id: string;
  name: string;
  role: string;
  foto: string | null;
}

export default async function StrukturalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const org = await prisma.organization.findUnique({
    where: { slug },
  });

  if (!org) notFound();

  let struct: any = {
    namaStruktural: org.name,
    subjudul: org.name,
    ketua: "Belum Ditentukan",
    fotoKetua: null,
    sekretaris: "Belum Ditentukan",
    fotoSekretaris: null,
    bendahara: "Belum Ditentukan",
    fotoBendahara: null,
    members: [] as MemberItem[],
  };

  try {
    if (org.structureInfo) {
      struct = { ...struct, ...JSON.parse(org.structureInfo) };
    }
  } catch (e) {}

  const members: MemberItem[] = struct.members || [];

  return (
    <main className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Bagan */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-200">
            Bagan Kepengurusan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] tracking-tight">
            Pengurus {struct.namaStruktural || org.name}
          </h1>
        </div>

        {/* Diagram Pohon Pejabat Inti */}
        <div className="flex flex-col items-center">
          {/* 1. KETUA */}
          <div className="bg-white border-2 border-emerald-700/60 rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-sm flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-emerald-600 flex items-center justify-center mb-4 shadow-inner">
              {struct.fotoKetua ? (
                <Image src={struct.fotoKetua} alt={struct.ketua} fill className="object-cover" />
              ) : (
                <User className="w-9 h-9 text-gray-400" />
              )}
            </div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              KETUA
            </span>
            <h3 className="text-xl font-black text-gray-900 mt-1">{struct.ketua}</h3>
          </div>

          <div className="w-0.5 h-10 bg-gray-300"></div>

          {/* 2. SEKRETARIS */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-sm flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center mb-4 shadow-inner">
              {struct.fotoSekretaris ? (
                <Image src={struct.fotoSekretaris} alt={struct.sekretaris} fill className="object-cover" />
              ) : (
                <User className="w-9 h-9 text-gray-400" />
              )}
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              SEKRETARIS
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{struct.sekretaris}</h3>
          </div>

          <div className="w-0.5 h-10 bg-gray-300"></div>

          {/* 3. BENDAHARA */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-sm flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center mb-4 shadow-inner">
              {struct.fotoBendahara ? (
                <Image src={struct.fotoBendahara} alt={struct.bendahara} fill className="object-cover" />
              ) : (
                <User className="w-9 h-9 text-gray-400" />
              )}
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              BENDAHARA
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{struct.bendahara}</h3>
          </div>
        </div>

        {/* 4. DAFTAR SEKSI & ANGGOTA (JIKA ADA) */}
        {members.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">
                Divisi, Seksi & Anggota
              </h2>
              <div className="w-12 h-1 bg-emerald-600 mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center hover:border-emerald-300 transition"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center mb-3">
                    {m.foto ? (
                      <Image src={m.foto} alt={m.name} fill className="object-cover" />
                    ) : (
                      <User className="w-7 h-7 text-gray-400" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {m.role}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 mt-2">{m.name}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}