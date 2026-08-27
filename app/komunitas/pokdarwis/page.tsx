"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PokdarwisPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* 1. HERO SECTION - Teks di Tengah (Sesuai gaya KTH) */}
      <div className="relative h-[70vh] w-full flex flex-col justify-start pt-32 md:justify-center md:pt-32 pb-12">
        <Image
          src="/images/FotoPantai.jpeg" // Silakan ganti dengan foto yang sesuai
          alt="Kelompok Darma Wisata"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Konten Teks */}
        <div className="relative z-10 w-full px-6 md:px-16 text-center md:text-left">
          <div className="max-w-7xl mx-auto">
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Kelompok Darma Wisata
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-md max-w-2xl">
              Penggerak Pariwisata Desa Banaran
            </p>
          </div>
        </div>
      </div>

      {/* 2. KOTAK INFORMASI / PORTAL BERITA (Tetap Aman!) */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-mangrove-dark mb-4">Informasi & Kegiatan</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Kumpulan dokumentasi dan kabar terbaru mengenai kegiatan Kelompok Darma Wisata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[12] gap-[10px] md:h-[900px]">
          
          {/* DIV 1 */}
          <div className="md:col-span-2 md:row-span-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-gray-400 min-h-[200px] md:min-h-0">
            <p>1. [Tempat Foto/Berita dari Admin]</p>
          </div>

          {/* DIV 2 */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-gray-400 min-h-[200px] md:min-h-0">
            <p>2. [Tempat Foto/Berita dari Admin]</p>
          </div>

          {/* DIV 3 */}
          <div className="md:col-span-2 md:row-span-3 md:row-start-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-gray-400 min-h-[200px] md:min-h-0">
            <p>3. [Tempat Foto/Berita dari Admin]</p>
          </div>

          {/* DIV 4 */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-gray-400 min-h-[200px] md:min-h-0">
            <p>4. [Tempat Foto/Berita dari Admin]</p>
          </div>

          {/* DIV 5 */}
          <div className="md:col-span-2 md:row-span-3 md:row-start-9 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-gray-400 min-h-[200px] md:min-h-0">
            <p>5. [Tempat Foto/Berita dari Admin]</p>
          </div>

          {/* DIV 6 */}
          <div className="md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-9 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-gray-400 min-h-[200px] md:min-h-0">
            <p>6. [Tempat Foto/Berita dari Admin]</p>
          </div>

        </div>
      </section>

      {/* 3. FOOTER */}
      <Footer />
    </main>
  )
}