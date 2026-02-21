import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, MapPin } from "lucide-react"

// 👇 INI PERBAIKANNYA: Nama file harus PERSIS SAMA dengan yang di folder public/images
const wisataItems = [
  {
    id: 1,
    title: "Wisata Penyu",
    desc: "Melihat konservasi penyu lekang dan pelepasan tukik.",
    image: "/images/Foto1.jpeg", // Pastikan F besar dan .jpeg
    link: "/kategori/wisata/penyu"
  },
  {
    id: 2, 
    title: "Burung Migran",
    desc: "Pengamatan burung langka yang bermigrasi dari benua lain.",
    image: "/images/Foto2.jpeg", 
    link: "/kategori/wisata/burung"
  },
  {
    id: 3,
    title: "Hutan Mangrove",
    desc: "Tracking seru menembus rimbunnya hutan bakau.",
    image: "/images/Foto3.jpeg",
    link: "/kategori/wisata/mangrove" 
  },
  {
    id: 4,
    title: "Pantai Trisik",
    desc: "Menikmati sunset dan aktivitas nelayan di pasir hitam.",
    image: "/images/Foto4.jpeg",
    link: "/kategori/wisata/pantai"
  },
  {
    id: 5,
    title: "Menara Pantau",
    desc: "Melihat pemandangan Desa Banaran dari ketinggian.",
    image: "/images/Foto5.jpeg",
    link: "/kategori/wisata/menara"
  },
  {
    id: 6,
    title: "Susur Sungai",
    desc: "Menikmati aliran sungai progo dengan perahu wisata.",
    image: "/images/Foto6.jpeg",
    link: "/kategori/wisata/susur-sungai"
  },
]

export default function KategoriWisataPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Navbar />
      
      {/* Header Halaman */}
      <div className="pt-32 pb-12 px-6 text-center bg-[#1a5c38] text-white rounded-b-[3rem] shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F4A460]">Destinasi Wisata</h1>
        <p className="max-w-xl mx-auto text-white/80 text-lg">
          Jelajahi 6 keajaiban alam yang tersembunyi di Desa Banaran.
        </p>
      </div>

      {/* Grid Layout 6 Kolom (Sesuai Request CSS Kamu) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Penjelasan Grid:
           - grid-cols-1: HP (1 kolom ke bawah)
           - md:grid-cols-2: Tablet (2 kolom)
           - lg:grid-cols-3: Laptop (3 kolom) -> Ini setara dengan maumu (1,2,3 baris atas, 4,5,6 baris bawah)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {wisataItems.map((item) => (
            <Link 
              href={item.link} 
              key={item.id}
              className="group relative h-[450px] w-full overflow-hidden rounded-3xl border-4 border-transparent hover:border-[#F4A460] transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 bg-gray-200"
            >
              {/* Gambar Full */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gelap */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

              {/* Konten Teks */}
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <div className="flex items-center gap-2 text-[#F4A460] text-xs font-bold uppercase tracking-wider mb-2">
                   <MapPin className="h-4 w-4" /> Desa Banaran
                </div>
                <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {item.desc}
                </p>
                
                <div className="inline-flex items-center gap-2 text-[#F4A460] font-bold text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  Jelajahi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              {/* Nomor Urut */}
              <div className="absolute top-5 right-5 bg-black/30 backdrop-blur-md h-12 w-12 flex items-center justify-center rounded-full text-white font-bold border border-white/20 text-lg">
                {item.id}
              </div>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
    </main>
  )
}