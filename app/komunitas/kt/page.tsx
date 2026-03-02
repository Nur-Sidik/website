import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Flag, HeartHandshake } from "lucide-react"
import Link from "next/link"

export default function KarangTarunaPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      {/* HEADER GAMBAR */}
      <div className="relative h-[70vh] w-full bg-[#1a5c38] flex flex-col justify-center pt-32 pb-12">
        {/* Pakai foto kegiatan/umum dulu */}
        <Image
          src="/images/Foto5.jpg"
          alt="Karang Taruna"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/59" />

        <div className="w-full relative z-10 px-6 md:px-16 text-white text-center md:text-left">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#F4A460] mb-6 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit mx-auto md:mx-0">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
              Karang Taruna (KT)
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 font-light tracking-wide drop-shadow-sm">
            Muda, Berkarya, Berdaya.</p>
          </div>
        </div>
      </div>

      {/* KONTEN */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="lead text-xl font-medium text-[#1a5c38] mb-8">
            Wadah pengembangan generasi muda Desa Banaran untuk berkontribusi dalam pembangunan sosial dan ekonomi desa.
          </p>

          <div className="bg-[#1a5c38]/5 p-8 rounded-2xl border border-[#1a5c38]/10 my-8">
            <h3 className="text-xl font-bold text-[#1a5c38] mb-4">Program Unggulan</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <Flag className="h-6 w-6 text-[#F4A460] shrink-0 mt-1" />
                <div>
                  <strong>Event Desa:</strong>
                  <p className="text-sm text-gray-600">Mengorganisir acara tahunan, lomba 17 Agustus, dan festival budaya lokal.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <HeartHandshake className="h-6 w-6 text-[#F4A460] shrink-0 mt-1" />
                <div>
                  <strong>Bakti Sosial:</strong>
                  <p className="text-sm text-gray-600">Rutin mengadakan gotong royong bersih pantai dan santunan bagi warga yang membutuhkan.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}