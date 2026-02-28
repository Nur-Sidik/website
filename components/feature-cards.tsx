import Image from "next/image"
import { Bird, Shell, TowerControl, Trees, Waves } from "lucide-react"

const features = [
  {
    title: "Burung Migrasi",
    description: "Amati para burung yang bermigrasi di habitat alami mangrove",
    image: "/images/Foto6.jpg",
    icon: Bird,
    href: "#wisata",
  },
  {
    title: "Hutan Mangrove",
    description: "Jelajahi ekosistem mangrove",
    image: "/images/Foto5.jpg",
    icon: Trees,
    href: "#wisata",
  },
  {
    title: "Pantai Trisik",
    description: "Nikmati keindahan pantai pasir putih dan ombak yang menenangkan",
    image: "/images/Foto4.jpeg",
    icon: Waves,
    href: "#wisata",
  },
  {
    title: "Menara Pantau",
    description: "Nikmati pemandangan indah dari menara pantau",
    image: "/images/Foto3.jpg",
    icon: TowerControl,
    href: "#wisata",
  },
  {
    title: "Numpak Perahu",
    description: "Saksikan indahnya Mangrove dengan perahu tradisional",
    image: "/images/Foto2.jpeg",
    icon: Shell,
    href: "#wisata",
  },
]

export function FeatureCards() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <a
          key={feature.title}
          href={feature.href}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-foreground/25 hover:bg-primary-foreground/15 hover:shadow-2xl"
        >
          {/* Card Image */}
          <div className="relative h-36 overflow-hidden sm:h-32">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
      ))}
    </div>
  )
}
