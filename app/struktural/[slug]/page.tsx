import Image from "next/image"
import { notFound } from "next/navigation"
import { Users, Briefcase } from "lucide-react"
import prisma from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type Seksi = { nama: string; anggota: string[] }

type Struktur = {
  namaStruktural: string
  subjudul: string
  ketua: string
  sekretaris: string
  bendahara: string
  seksi: Seksi[]
  anggota: string[]
}

function bacaStruktur(teks: string | null, namaCadangan: string): Struktur {
  const kosong: Struktur = {
    namaStruktural: namaCadangan,
    subjudul: namaCadangan,
    ketua: "-",
    sekretaris: "-",
    bendahara: "-",
    seksi: [],
    anggota: [],
  }
  if (!teks) return kosong
  try {
    return { ...kosong, ...JSON.parse(teks) }
  } catch {
    return kosong
  }
}

export default async function StrukturalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const org = await prisma.organization.findUnique({
    where: { slug },
  })

  if (!org) {
    notFound()
  }

  const s = bacaStruktur(org.structureInfo, org.name)

  return (
    <main className="min-h-screen bg-cream flex flex-col justify-between">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative min-h-[50vh] w-full flex flex-col justify-center pt-32 pb-12 bg-emerald-950 overflow-hidden">
        {org.imageUrl ? (
          <>
            <Image
              src={org.imageUrl}
              alt={`Struktural ${org.name}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#143225] to-[#1B4332]" />
        )}

        <div className="relative z-10 w-full px-6 md:px-16 text-center md:text-left">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Struktur Organisasi
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-200 font-light drop-shadow-md mt-2">
              {s.subjudul || org.name}
            </h2>
            {!org.imageUrl && (
              <p className="mt-3 text-xs text-emerald-200/80 italic">
                (Foto bersama kelompok belum diunggah oleh admin)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. BAGAN STRUKTUR ORGANISASI */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F4A460] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            Bagan Kepengurusan
          </span>
          <h2 className="text-3xl font-bold text-mangrove-dark mt-3">
            Pengurus {s.namaStruktural}
          </h2>
        </div>

        <div className="flex flex-col items-center space-y-8 relative">
          {/* KETUA */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border-2 border-mangrove-dark p-6 text-center relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-xs text-gray-400 font-medium">
              [ Foto Ketua ]
            </div>
            <span className="text-xs font-bold text-[#F4A460] uppercase tracking-wider">Ketua</span>
            <h3 className="text-xl font-extrabold text-gray-800 mt-1">{s.ketua}</h3>
          </div>

          <div className="w-0.5 h-8 bg-gray-300 relative"></div>

          {/* SEKRETARIS */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-6 text-center relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 text-xs text-gray-400 font-medium">
              [ Foto ]
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sekretaris</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{s.sekretaris}</h3>
          </div>

          <div className="w-0.5 h-8 bg-gray-300 relative"></div>

          {/* BENDAHARA */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-6 text-center relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 text-xs text-gray-400 font-medium">
              [ Foto ]
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bendahara</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{s.bendahara}</h3>
          </div>

          {/* SEKSI-SEKSI */}
          {s.seksi && s.seksi.length > 0 && (
            <>
              <div className="w-0.5 h-8 bg-gray-300 relative"></div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative pt-4">
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-300 hidden md:block"></div>

                {s.seksi.map((sie, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-3 border-b pb-2">
                      <Briefcase className="h-5 w-5 text-[#F4A460]" />
                      <h4 className="font-bold text-mangrove-dark text-base">{sie.nama}</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700 pl-2">
                      {sie.anggota.map((nama, j) => (
                        <li key={j}>{nama}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ANGGOTA */}
          {s.anggota && s.anggota.length > 0 && (
            <>
              <div className="w-0.5 h-8 bg-gray-300 relative"></div>

              <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 border-b pb-3">
                  <Users className="h-6 w-6 text-mangrove-dark" />
                  <h4 className="font-bold text-mangrove-dark text-lg">
                    Anggota {s.namaStruktural}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  {s.anggota.map((nama, i) => (
                    <div key={i}>{nama}</div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}