import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, MapPin } from "lucide-react"

// Data Wisata (Pastikan foto ada di public/images)
const wisataItems = [
  {
    id: 1,
    title: "Wisata Penyu",
    desc: "Konservasi penyu lekang.",
    image: "/images/Foto1.jpeg", // Pastikan nama file benar
    link: "/kategori/wisata/penyu",
    // 👇 Logika CSS Kamu: span 2 kolom, span 2 baris (start 1, 1)
    className: "col-span-2 row-span-2" 
  },
  {
    id: 2, 
    title: "Burung Migran",
    desc: "Pengamatan burung.",
    image: "/images/Foto2.jpeg", 
    link: "/kategori/wisata/burung",
    // 👇 Logika CSS Kamu: span 2 kolom, span 2 baris (start 1, 3)
    className: "col-span-2 row-span-2"
  },
  {
    id: 3,
    title: "Hutan Mangrove",
    desc: "Tracking hutan bakau.",
    image: "/images/Foto3.jpeg",
    link: "/kategori/wisata/mangrove",
    className: "col-span-2 row-span-2" 
  },
  {
    id: 4,
    title: "Pantai Trisik",
    desc: "Sunset pasir hitam.",
    image: "/images/Foto4.jpeg",
    link: "/kategori/wisata/pantai",
    className: "col-span-2 row-span-2"
  },
  {
    id: 5,
    title: "Menara Pantau",
    desc: "View dari atas.",
    image: "/images/Foto5.jpeg",
    link: "/kategori/wisata/menara",
    className: "col-span-2 row-span-2"
  },
  {
    id: 6,
    title: "Susur Sungai",
    desc: "Wisata perahu.",
    image: "/images/Foto6.jpg", // Perhatikan .jpg
    link: "/kategori/wisata/susur-sungai",
    className: "col-span-2 row-span-2"
  },
]

export default function KategoriWisataPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-12 px-6 text-center bg-[#1a5c38] text-white rounded-b-[3rem] shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F4A460]">Destinasi Wisata</h1>
        <p className="max-w-xl mx-auto text-white/80">
          Jelajahi keindahan alam Desa Banaran.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        
        {/* 👇 INI GRID SESUAI CSS KAMU (repeat(6, 1fr)) */}
        {/* Di HP: 1 Kolom. Di Laptop (md): 6 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          
          {wisataItems.map((item) => (
            <Link 
              href={item.link} 
              key={item.id}
              // className di sini akan mengambil 'col-span-2' dari data di atas
              className={`group relative overflow-hidden rounded-2xl bg-gray-200 border-2 border-transparent hover:border-[#F4A460] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${item.className}`}
            >
              {/* Gambar (Isi Penuh Kotak) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              </div>

              {/* Teks Overlay */}
              <div className="absolute bottom-0 left-0 p-6 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2">{item.desc}</p>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4 text-[#F4A460]" />
                </div>
              </div>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
    </main>
  )
}