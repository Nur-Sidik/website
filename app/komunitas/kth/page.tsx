"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Users, Sprout, ChevronDown } from "lucide-react"
import Link from "next/link"

// Komponen Kartu Ajaib (Bisa Melar)
function ExpandableCard({
  icon: Icon,
  title,
  preview,
  details
}: {
  icon: any, title: string, preview: string, details: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`
        relative bg-white p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
        ${isOpen ? "border-[#1a5c38] shadow-lg ring-1 ring-[#1a5c38]" : "border-gray-200 shadow-sm hover:shadow-md"}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-[#1a5c38] text-lg flex items-center gap-2">
          <Icon className="h-6 w-6" /> {title}
        </h3>
        {/* Ikon Panah yang Mutar */}
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#1a5c38]" : ""}`}
        />
      </div>

      <p className="text-gray-600 text-sm mb-2">{preview}</p>

      {/* Bagian Rahasia yang Melar */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 border-t border-dashed border-gray-200 text-sm text-gray-700 leading-relaxed text-justify">
            {details}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function KTHPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      <div className="relative h-[70vh] w-full bg-[#1a5c38] flex flex-col justify-center pt-32 pb-12">
        <Image
          src="/images/FotoKth.jpeg"
          alt="Kelompok Tani Hutan"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Container Teks */}
        <div className="w-full relative z-10 px-6 md:px-16 text-white text-center md:text-left">
          <div className="max-w-7xl mx-auto">
            
            {/* Tombol Kembali */}
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#F4A460] mb-6 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit mx-auto md:mx-0">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
            </Link>
            
            {/* Judul Besar */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
              Kelompok Tani Hutan
            </h1>
            
            {/* Subjudul */}
            <p className="text-xl md:text-2xl text-gray-100 font-light tracking-wide drop-shadow-sm">
              Penjaga Sabuk Hijau
            </p>
          </div>
        </div>
      </div>

      {/* KONTEN */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="lead text-xl font-medium text-[#1a5c38] mb-8">
            "Menjaga Hutan, Merawat Kehidupan."
          </p>
          <p>
            Kelompok Tani Hutan adalah garda terdepan pelestarian alam di Desa Banaran, Anggota kami terdiri dari masyarakat lokal yang berdedikasi.
          </p>

          {/* 👇 GRID KARTU YANG BISA MELAR */}
          <div className="grid md:grid-cols-2 gap-6 my-10">

            {/* KARTU 1: PEMBIBITAN */}
            <ExpandableCard
              icon={Sprout}
              title="Pembibitan"
              preview="Mengelola rumah bibit mangrove untuk stok penanaman rutin."
              details="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            />

            {/* KARTU 2: EDUKASI */}
            <ExpandableCard
              icon={Users}
              title="Edukasi"
              preview="Menerima kunjungan studi banding sekolah dan instansi."
              details="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            />

          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}