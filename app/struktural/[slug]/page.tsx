import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { User, Users2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
    subjudul: org.description || org.name,
    ketua: org.leaderName || "-",
    fotoKetua: org.leaderImage || null,
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
  const heroImage = org.groupImage || org.imageUrl;

  // KELOMPOKKAN ANGGOTA BERDASARKAN DIVISI / SEKSI
  // Helper: ubah string jadi Title Case (misal: "testing" atau "TESTING" -> "Testing")
  function toTitleCase(str: string) {
    return str
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // KELOMPOKKAN ANGGOTA SECARA CASE-INSENSITIVE (TIDAK PEDULI BESAR/KECIL)
  const divisionGroups = members.reduce((acc, curr) => {
    // Normalisasi: buang spasi lebih dan jadikan Title Case
    const rawRole = curr.role?.trim();
    const divName = rawRole ? toTitleCase(rawRole) : "Anggota Umum";

    if (!acc[divName]) {
      acc[divName] = [];
    }
    acc[divName].push(curr);
    return acc;
  }, {} as Record<string, MemberItem[]>);

  const divisionList = Object.entries(divisionGroups);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO BANNER */}
      <section className="relative w-full h-[45vh] min-h-[320px] flex items-center justify-center bg-gray-900 overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={org.name}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-40"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#143225] to-[#1B4332]" />
        )}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-3 pt-12">
          <span className="inline-block px-3.5 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-400/30 backdrop-blur-xs">
            Bagan Kepengurusan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            {org.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 font-medium max-w-xl mx-auto drop-shadow-xs line-clamp-2">
            {org.description || "Susunan kepengurusan struktural organisasi dan divisi operasional lapangan."}
          </p>
        </div>
      </section>

      {/* 3. DIAGRAM POHON STRUKTURAL */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight">
            Pengurus {struct.namaStruktural || org.name}
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* CONTAINER BAGAN & GARIS POHON */}
        <div className="flex flex-col items-center w-full">
          {/* LEVEL 1: KETUA */}
          <div className="bg-white border-2 border-emerald-600/70 rounded-3xl p-6 sm:p-7 w-full max-w-sm text-center shadow-sm flex flex-col items-center relative hover:shadow-md transition">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-emerald-600 flex items-center justify-center mb-4 shadow-inner">
              {struct.fotoKetua && !struct.fotoKetua.startsWith("blob:") ? (
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
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
              Ketua
            </span>
            <h3 className="text-lg font-black text-gray-900 mt-2">
              {struct.ketua || "-"}
            </h3>
          </div>

          {/* Garis Penghubung Ketua ke Sekretaris & Bendahara */}
          <div className="w-0.5 h-10 bg-emerald-700/40"></div>

          {/* LEVEL 2: SEKRETARIS & BENDAHARA */}
          <div className="relative w-full max-w-2xl">
            {/* Garis Horizontal Penghubung Sekretaris & Bendahara */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-emerald-700/40 hidden sm:block"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {/* SEKRETARIS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 text-center shadow-xs flex flex-col items-center hover:border-emerald-300 transition">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center mb-3 shadow-inner">
                  {struct.fotoSekretaris && !struct.fotoSekretaris.startsWith("blob:") ? (
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
              <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 text-center shadow-xs flex flex-col items-center hover:border-emerald-300 transition">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center mb-3 shadow-inner">
                  {struct.fotoBendahara && !struct.fotoBendahara.startsWith("blob:") ? (
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

          {/* LEVEL 3: SEKSI / DIVISI (DENGAN GARIS CABANG) */}
          {divisionList.length > 0 && (
            <div className="w-full flex flex-col items-center mt-2">
              {/* Garis Cabang Turun dari Inti ke Divisi */}
              <div className="w-0.5 h-12 bg-emerald-700/40"></div>

              {/* Garis Horizontal Menyebar ke Semua Divisi */}
              {divisionList.length > 1 && (
                <div className="w-[85%] max-w-4xl h-0.5 bg-emerald-700/40 hidden md:block"></div>
              )}

              {/* Grid Kotak Divisi */}
              <div className={`grid grid-cols-1 ${divisionList.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6 w-full pt-4`}>
                {divisionList.map(([divisiName, listAnggota]) => (
                  <div key={divisiName} className="flex flex-col items-center relative">
                    {/* Garis Vertikal Kecil ke Atas Tiap Box */}
                    <div className="w-0.5 h-4 bg-emerald-700/40 -mt-4 mb-0 hidden md:block"></div>

                    {/* Shape / Card Divisi */}
                    <div className="w-full bg-white border-2 border-emerald-600/40 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition space-y-4">
                      {/* Header Divisi */}
                      <div className="text-center border-b border-gray-100 pb-3">
                        <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {divisiName}
                        </span>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {listAnggota.length} Personel
                        </p>
                      </div>

                      {/* Anggota di dalam Divisi */}
                      <div className="space-y-3">
                        {listAnggota.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-gray-50/80 hover:bg-emerald-50/50 transition border border-gray-100"
                          >
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-emerald-600/40 shrink-0 flex items-center justify-center shadow-xs">
                              {m.foto && !m.foto.startsWith("blob:") ? (
                                <Image
                                  src={m.foto}
                                  alt={m.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : (
                                <User className="w-6 h-6 text-gray-400" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-gray-900 truncate">
                                {m.name}
                              </h4>
                              <p className="text-[10px] text-emerald-700 font-semibold truncate">
                                Anggota Divisi
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}