import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { User, Users2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface MemberItem {
  id: string;
  name: string;
  role: string;
  foto: string | null;
}

interface StructureData {
  namaStruktural?: string;
  subjudul?: string;
  ketua?: string;
  fotoKetua?: string | null;
  sekretaris?: string;
  fotoSekretaris?: string | null;
  bendahara?: string;
  fotoBendahara?: string | null;
  members?: MemberItem[];
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

  let struct: StructureData = {
    namaStruktural: org.name,
    subjudul: org.name,
    ketua: "-",
    fotoKetua: null,
    sekretaris: "-",
    fotoSekretaris: null,
    bendahara: "-",
    fotoBendahara: null,
    members: [],
  };

  if (org.structureInfo) {
    try {
      const parsed = JSON.parse(org.structureInfo);
      struct = { ...struct, ...parsed };
    } catch (e) {
      console.error("Gagal parse structureInfo:", e);
    }
  }

  const members: MemberItem[] = struct.members || [];

  return (
    <main className="min-h-screen bg-gray-50/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Bagan */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-200">
            Bagan Kepengurusan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] tracking-tight">
            Pengurus {struct.namaStruktural || org.name}
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Susunan kepengurusan struktural organisasi dan divisi operasional lapangan.
          </p>
        </div>

        {/* Diagram Pohon Pejabat Inti */}
        <div className="flex flex-col items-center">
          {/* 1. KETUA */}
          <div className="bg-white border-2 border-emerald-600/70 rounded-3xl p-6 w-full max-w-sm text-center shadow-sm flex flex-col items-center relative hover:shadow-md transition">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-emerald-600 flex items-center justify-center mb-4 shadow-inner">
              {struct.fotoKetua ? (
                <Image
                  src={struct.fotoKetua}
                  alt={struct.ketua || "Ketua"}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
              Ketua
            </span>
            <h3 className="text-lg font-black text-gray-900 mt-2">
              {struct.ketua || "-"}
            </h3>
          </div>

          {/* Garis Penghubung Vertikal */}
          <div className="w-0.5 h-8 bg-gray-300"></div>

          {/* 2 & 3. SEKRETARIS & BENDAHARA (Berdampingan) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
            {/* SEKRETARIS */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center hover:border-emerald-300 transition">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center mb-3 shadow-inner">
                {struct.fotoSekretaris ? (
                  <Image
                    src={struct.fotoSekretaris}
                    alt={struct.sekretaris || "Sekretaris"}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest bg-gray-100 px-2.5 py-0.5 rounded-full">
                Sekretaris
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-2">
                {struct.sekretaris || "-"}
              </h3>
            </div>

            {/* BENDAHARA */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center hover:border-emerald-300 transition">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center mb-3 shadow-inner">
                {struct.fotoBendahara ? (
                  <Image
                    src={struct.fotoBendahara}
                    alt={struct.bendahara || "Bendahara"}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest bg-gray-100 px-2.5 py-0.5 rounded-full">
                Bendahara
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-2">
                {struct.bendahara || "-"}
              </h3>
            </div>
          </div>
        </div>

        {/* 4. DAFTAR SEKSI & ANGGOTA */}
        {members.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                <Users2 className="w-3.5 h-3.5" />
                Daftar Personel Divisi
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">
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
                      <Image
                        src={m.foto}
                        alt={m.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
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