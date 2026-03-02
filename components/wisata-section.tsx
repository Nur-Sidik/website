"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bird, Trees, Waves, TowerControl, Shell, Ship, Turtle } from "lucide-react"

// 👇 DAFTAR 6 WISATA (Data sudah rapi)
const wisataItems = [
  {
    title: "Burung Migran",
    description: "Pengamatan burung yang bermigrasi.",
    image: "/images/FotoBurungMigrasi.jpg",
    link: "/kategori/wisata/burung",
    icon: Bird,
    tag: "Edukasi"
  },
  {
    title: "Hutan Mangrove",
    description: "Jelajah ekosistem mangrove dan temukan keindahan di dalamnya.",
    image: "/images/FotoMangrove.jpg",
    link: "/kategori/wisata/mangrove",
    icon: Trees,
    tag: "Alam"
  },
  {
    title: "Pantai Trisik",
    description: "Keindahan pantai dengan pasir putih dan ombak yang menenangkan.",
    image: "/images/FotoPantai.jpeg",
    link: "/kategori/wisata/pantai",
    icon: Waves,
    tag: "Wisata"
  },
  {
    title: "Wisata Penyu",
    description: "Konservasi dan pelepasan tukik di pesisir.",
    image: "/images/FotoPenyu.jpg",
    link: "/kategori/wisata/penyu",
    icon: Turtle,
    tag: "Konservasi"
  },
  {
    title: "Menara Pantau",
    description: "Saksikan pemandangan Burung yang bermigrasi dari ketinggian.",
    image: "/images/FotoMenaraPantau.jpg",
    link: "/kategori/wisata/menara",
    icon: TowerControl,
    tag: "Spot Foto"
  },
  {
    title: "Numpak Perahu",
    description: "Saksikan indahnya Mangrove dengan perahu tradisional.",
    image: "/images/FotoNumpakPerahu.jpeg",
    link: "/kategori/wisata/numpak-perahu",
    icon: Ship,
    tag: "Petualangan"
  },
]

export function WisataSection() {
  return (
    <section id="wisata" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Judul Section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a5c38] sm:text-4xl">
            Destinasi Unggulan Desa Banaran
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Temukan berbagai pengalaman seru yang hanya ada di Desa Banaran
          </p>
        </div>

        {/* 👇 GRID SYSTEM: 3 Atas, 3 Bawah (Sesuai CSS Grid 6 Kolom) */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-6">
          
          {wisataItems.map((post) => {
            // Setiap kartu memakan 2 kolom (6 / 2 = 3 kartu per baris)
            let gridPos = "md:col-span-2" 

            return (
              <Link
                key={post.title}
                href={post.link}
                className={`group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${gridPos}`}
              >
                {/* Gambar Card */}
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Overlay Gradient Halus */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                  
                  {/* Ikon di Pojok Kiri Bawah */}
                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf8f5]/90 text-[#1a5c38] shadow-md">
                    {post.icon && <post.icon className="h-4 w-4" aria-hidden="true" />}
                  </div>

                  {/* Tag di Pojok Kanan Atas */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[#1a5c38] shadow-sm">
                    {post.tag}
                  </div>
                </div>

                {/* Konten Card */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-[#1a5c38] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  
                  {/* Tombol Panah Kecil */}
                  <div className="mt-auto flex items-center gap-1 text-xs font-bold text-[#1a5c38] uppercase tracking-wide group-hover:gap-2 transition-all">
                    Lihat Detail <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}