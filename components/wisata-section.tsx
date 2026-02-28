import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

// 👇 DAFTAR 6 WISATA (Sesuai Fotonya)
const wisataItems = [
  {
    title: "Wisata Penyu",
    description: "Konservasi dan pelepasan tukik.",
    image: "/images/Foto1.jpg", // Pastikan nama file sama persis
    link: "/kategori/wisata/penyu",
    tag: "Konservasi"
  },
  {
    title: "Burung Migran",
    description: "Pengamatan burung yang bermigrasi.",
    image: "/images/Foto2.jpeg",
    link: "/kategori/wisata/burung",
    tag: "Edukasi"
  },
  {
    title: "Hutan Mangrove",
    description: "Jelajah ekosistem mangrove dan temukan keindahan di dalamnya.",
    image: "/images/Foto3.jpeg",
    link: "/kategori/wisata/mangrove",
    tag: "Alam"
  },
  {
    title: "Pantai Trisik",
    description: "Keindahan pantai dengan pasir putih dan ombak yang menenangkan.",
    image: "/images/Foto4.jpeg",
    link: "/kategori/wisata/pantai",
    tag: "Wisata"
  },
  {
    title: "Menara Pantau",
    description: "Saksikan pemandangan Burung yang bermigrasi dari ketinggian.",
    image: "/images/Foto5.jpeg",
    link: "/kategori/wisata/menara",
    tag: "Spot Foto"
  },
  {
    title: "Numpak Perahu",
    description: "Saksikan indahnya Mangrove dengan perahu tradisional.",
    image: "/images/Foto6.jpeg", // Perhatikan .jpg
    link: "/kategori/wisata/susur-sungai",
    tag: "Petualangan"
  },
]

export function WisataSection() {
  return (
    <section id="wisata" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Judul Section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-mangrove-dark sm:text-4xl">
            Destinasi Unggulan Desa Banaran
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Temukan berbagai pengalaman seru yang hanya ada di Desa Banaran
          </p>
        </div>

        {/* 👇 GRID 6 KOTAK (3 Kolom x 2 Baris) */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {wisataItems.map((post) => (
            <article key={post.title} className="flex flex-col items-start justify-between group">
              
              {/* Gambar dengan Hover Effect */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                
                {/* Tag di pojok gambar */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-mangrove-dark shadow-sm">
                  {post.tag}
                </div>
              </div>

              {/* Teks di bawah gambar */}
              <div className="max-w-xl mt-4">
                <div className="flex items-center gap-x-2 text-xs text-sand-beige mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>Desa Banaran</span>
                </div>
                
                <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-mangrove-green transition-colors">
                  <Link href={post.link}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-mangrove-green group-hover:gap-2 transition-all">
                  Lihat Detail <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}