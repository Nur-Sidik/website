"use client"

import Image from "next/image"
import { Bird, Shell, TowerControl, Trees, Turtle, Waves } from "lucide-react"

const features = [
  {
    title: "Burung Migrasi",
    description: "Amati para burung yang bermigrasi di habitat alami mangrove",
    image: "/images/FotoBurungMigrasi.jpg",
    icon: Bird,
    href: "#wisata",
  },
  {
    title: "Hutan Mangrove",
    description: "Jelajahi ekosistem mangrove",
    image: "/images/FotoMangrove.jpg",
    icon: Trees,
    href: "#wisata",
  },
  {
    title: "Pantai Trisik",
    description: "Keindahan pantai pasir putih dan ombak yang menenangkan",
    image: "/images/FotoPantai.jpeg",
    icon: Waves,
    href: "#wisata",
  },
  {
    title: "Konservasi Penyu",
    description: "Ikut serta dalam pelestarian penyu di Pantai Trisik",
    image: "/images/FotoPenyu.jpg",
    icon: Turtle,
    href: "#wisata",
  },
  {
    title: "Menara Pantau",
    description: "Nikmati pemandangan indah dari menara pantau",
    image: "/images/FotoMenaraPantau.jpg",
    icon: TowerControl,
    href: "#wisata",
  },
  {
    title: "Numpak Perahu",
    description: "Saksikan indahnya Mangrove dengan perahu tradisional",
    image: "/images/FotoNumpakPerahu.jpeg",
    icon: Shell,
    href: "#wisata",
  },
]

export function FeatureCards() {
  return (
    // 👇 KONFIGURASI GRID: 6 Kolom di Desktop (md:grid-cols-6)
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
      
      {features.map((feature, index) => {
        // 👇 LOGIKA CSS GRID: Setiap kartu makan 2 kolom (12/2 = 3 kartu sebaris)
        // Ini sesuai dengan .div3 s/d .div8 yang masing-masing punya grid-column: span 2
        let gridPos = "md:col-span-2 md:row-span-3" 

        return (
          <a
            key={feature.title}
            href={feature.href}
            className={`group relative flex flex-col overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-foreground/25 hover:bg-primary-foreground/15 hover:shadow-2xl ${gridPos}`}
          >
            {/* Card Image */}
            <div className="relative h-32 overflow-hidden sm:h-36">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-sand-beige/90 text-mangrove-dark shadow-md">
                <feature.icon className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="mb-1 text-sm font-bold text-primary-foreground">
                {feature.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-primary-foreground/70 line-clamp-2">
                {feature.description}
              </p>
            </div>
          </a>
        )
      })}
    </div>
  )
}