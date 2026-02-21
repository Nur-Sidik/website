import Image from "next/image"
import { Bird, Shell, Trees, Waves, ArrowRight } from "lucide-react"

const wisataItems = [
  {
    title: "Pengamatan Burung Migran",
    description:
      "Saksikan keindahan puluhan spesies burung migran yang singgah di kawasan mangrove Banaran setiap tahun. Dipandu oleh pemandu lokal berpengalaman, Anda akan belajar mengenali berbagai jenis burung langka.",
    image: "/images/burung-migran.jpg",
    icon: Bird,
    tag: "Wisata Edukasi",
  },
  {
    title: "Konservasi Penyu",
    description:
      "Ikut serta dalam program pelestarian penyu yang dikelola masyarakat setempat. Mulai dari pelepasan tukik hingga edukasi tentang pentingnya ekosistem pesisir untuk kelangsungan hidup penyu.",
    image: "/images/konservasi-penyu.jpg",
    icon: Shell,
    tag: "Konservasi",
  },
  {
    title: "Tracking Hutan Mangrove",
    description:
      "Jelajahi keindahan hutan mangrove melalui jalur kayu yang asri. Pelajari peran vital mangrove dalam melindungi pesisir dan mendukung keanekaragaman hayati laut.",
    image: "/images/hutan-mangrove.jpg",
    icon: Trees,
    tag: "Ekowisata",
  },
  {
    title: "Pantai Trisik",
    description:
      "Nikmati panorama pantai pasir hitam eksotis dengan ombak yang dramatis. Spot sempurna untuk menikmati sunset sambil menyaksikan aktivitas nelayan tradisional.",
    image: "/images/pantai-trisik.jpg",
    icon: Waves,
    tag: "Wisata Alam",
  },
]

export function WisataSection() {
  return (
    <section
      id="wisata"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="wisata-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sand-beige">
            Destinasi
          </p>
          <h2
            id="wisata-heading"
            className="mb-4 text-3xl font-extrabold text-foreground lg:text-4xl text-balance"
          >
            Wisata Edukasi & Alam
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            Empat destinasi unggulan yang memadukan keindahan alam dengan
            edukasi konservasi untuk pengalaman wisata yang bermakna.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {wisataItems.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`flex flex-col ${
                  index === 0 ? "md:flex-row" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "h-56 md:h-auto md:w-1/2"
                      : "h-48"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-mangrove-green/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-1 flex-col justify-center p-6 ${
                    index === 0 ? "md:p-8" : ""
                  }`}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sand-light text-mangrove-green">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="group/link inline-flex items-center gap-1 text-sm font-semibold text-mangrove-green transition-colors hover:text-mangrove-dark">
                    Selengkapnya
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
