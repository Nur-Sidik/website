import Image from "next/image"
import { Bird, Shell, TowerControl, Trees, Waves } from "lucide-react"

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
    description: "Nikmati keindahan pantai pasir putih dan ombak yang menenangkan",
    image: "/images/FotoPantai.jpeg",
    icon: Waves,
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
    // 👇 UBAH 1: Container jadi 6 Kolom di layar sedang/besar (md:grid-cols-6)
    <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-6">
      
      {features.map((feature, index) => {
        // 👇 UBAH 2: Logika Posisi (3 Atas, 2 Bawah Tengah)
        let gridPos = "md:col-span-2" // Default: Lebar 2 kolom
        
        // Geser kartu ke-4 (Index 3) ke tengah kiri
        if (index === 3) gridPos += " md:col-start-2"
        // Geser kartu ke-5 (Index 4) ke tengah kanan
        if (index === 4) gridPos += " md:col-start-4"

        return (
          <a
            key={feature.title}
            href={feature.href}
            // 👇 Masukkan variable gridPos ke sini
            className={`group relative flex flex-col overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-foreground/25 hover:bg-primary-foreground/15 hover:shadow-2xl ${gridPos}`}
          >
            {/* Card Image */}
            <div className="relative h-36 overflow-hidden sm:h-40">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-mangrove-dark/70 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-sand-beige/90 text-mangrove-dark shadow-md">
                <feature.icon className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="mb-1 text-sm font-bold text-primary-foreground">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          </a>
        )
      })}
    </div>
  )
}