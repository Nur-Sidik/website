import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { FeatureCards } from "./feature-cards"

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-mangrove.jpg"
          alt="Hutan mangrove yang rimbun di Desa Banaran, Kulonprogo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-mangrove-dark/50" aria-hidden="true" />
        {/* Bottom gradient fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mangrove-dark/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Glassmorphism Hero Card */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        <div className="mb-12 w-full max-w-2xl rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12 lg:mb-16">

          {/* 👇 INI YANG DIUBAH: Judul Besar langsung nama Desa */}
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-sand-beige sm:text-5xl lg:text-6xl text-balance drop-shadow-md">
            Desa Wisata Banaran
          </h1>

          {/* Deskripsi di bawahnya */}
          <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-primary-foreground/90 text-pretty font-medium">
            kata katanya ntar disini wokkk
          </p>

          <a
            href="#wisata"
            className="group inline-flex items-center gap-2 rounded-xl bg-mangrove-green px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-mangrove-dark hover:shadow-xl hover:scale-105"
          >
            Jelajahi Sekarang
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Feature Cards */}
        <FeatureCards />
      </div>
    </section>
  )
}