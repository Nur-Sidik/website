"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Ticket, Clock, Info } from "lucide-react"
import Link from "next/link"

// 1. DATABASE WISATA (Lengkap dengan data dokumentasi kegiatan/berita per destinasi)
const wisataData: Record<string, any> = {
    "burung": {
        title: "Burung Migran",
        image: "/images/FotoBurungMigrasi.jpg",
        desc: "Fenomena tahunan ribuan burung migran yang singgah di pesisir Trisik.",
        content: "Setiap tahun, ribuan burung dari belahan bumi utara bermigrasi ke selatan untuk mencari kehangatan. Laguna Trisik menjadi tempat persinggahan favorit mereka. Waktu terbaik untuk pengamatan adalah bulan September - Desember.",
        ticket: "Gratis",
        open: "09.00 - 16.00 WIB",
        dokumentasi: [
            { id: 1, title: "Pengamatan Musim Migrasi", desc: "Pencatatan jenis burung bersama kelompok pemerhati.", image: "/images/FotoBurungMigrasi.jpg" },
            { id: 2, title: "Edukasi Pelajar", desc: "Kunjungan edukasi konservasi alam oleh sekolah lokal.", image: "/images/Foto1.jpg" },
            { id: 3, title: "Pemasangan Plang Suaka", desc: "Menjaga ketenangan area singgah burung dari aktivitas bising.", image: "/images/FotoPantai.jpeg" }
        ]
    },
    "pantai": {
        title: "Pantai Trisik",
        image: "/images/FotoPantai.jpeg",
        desc: "Pantai eksotis dengan pasir hitam berkilau dan ombak selatan yang gagah.",
        content: "Pantai Trisik menawarkan pemandangan laut selatan yang memukau. Selain wisata alam, pantai ini juga menjadi pusat kegiatan nelayan lokal. Anda bisa membeli ikan segar langsung dari perahu nelayan di pagi hari.",
        ticket: "Rp 5.000 / orang",
        open: "09.00 - 18.00 WIB",
        dokumentasi: [
            { id: 1, title: "Bersih Pantai Bersama Warga", desc: "Aksi peduli lingkungan pesisir selatan.", image: "/images/FotoMangrove.jpg" },
            { id: 2, title: "Aktivitas Nelayan Pagi", desc: "Menyambut perahu nelayan yang membawa hasil tangkapan.", image: "/images/FotoNumpakPerahu.jpeg" }
        ]
    },
    "menara": {
        title: "Menara Pantau",
        image: "/images/FotoMenaraPantau.jpg",
        desc: "Nikmati pemandangan 360 derajat pesisir Kulon Progo dari ketinggian.",
        content: "Menara pantau yang menjadi spot foto favorit wisatawan. Dari atas sini, Anda bisa melihat garis pantai yang memanjang.",
        ticket: "Rp 2.000 / orang",
        open: "09.00 - 18.00 WIB",
        dokumentasi: [
            { id: 1, title: "Spot Sunset Terbaik", desc: "Pemandangan matahari terbenam dari puncak menara.", image: "/images/FotoMenaraPantau.jpg" }
        ]
    },
    "mangrove": {
        title: "Hutan Mangrove",
        image: "/images/FotoMangrove.jpg",
        desc: "Jelajahi ekosistem mangrove yang asri.",
        content: "Hutan Mangrove Banaran menawarkan edukasi lingkungan dan pelestarian abrasi pesisir.",
        ticket: "Rp 10.000",
        open: "09.00 - 15.00 WIB",
        dokumentasi: [
            { id: 1, title: "Penanaman Bibit Baru", desc: "Program penambahan populasi pohon mangrove.", image: "/images/FotoKth.jpeg" },
            { id: 2, title: "Kunjungan Studi Banding", desc: "Menerima kunjungan dari instansi luar daerah.", image: "/images/Foto1.jpg" }
        ]
    },
    "numpak-perahu": {
        title: "Numpak Perahu",
        image: "/images/FotoNumpakPerahu.jpeg",
        desc: "Sensasi menyusuri sungai dengan perahu tradisional.",
        content: "Nikmati ketenangan sungai di bawah rimbunnya mangrove dengan menggunakan perahu tradisional yang aman.",
        ticket: "Rp 20.000 / perahu",
        open: "09.00 - 16.00 WIB",
        dokumentasi: [
            { id: 1, title: "Jalur Susur Sungai Baru", desc: "Pembukaan rute jelajah air yang lebih menantang.", image: "/images/FotoNumpakPerahu.jpeg" }
        ]
    }
}

export default function WisataDetail() {
    const params = useParams()
    const slug = params.slug as string
    const data = wisataData[slug]

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#1a5c38]">404</h1>
                    <p className="text-gray-600">Wisata tidak ditemukan</p>
                    <Link href="/" className="text-[#F4A460] underline mt-4 block">Pulang ke Beranda</Link>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#faf8f5]">
            <Navbar />

            {/* HEADER GAMBAR */}
            <div className="relative h-[60vh] w-full bg-[#1a5c38] flex items-center">
                <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="w-full relative z-10 px-6 md:px-16 text-white text-center md:text-left">
                    <div className="max-w-7xl mx-auto">
                        <Link href="/#wisata" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#F4A460] mb-6 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit mx-auto md:mx-0">
                            <ArrowLeft className="h-4 w-4" /> Kembali
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
                            {data.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-100 font-light tracking-wide drop-shadow-sm">
                            {data.desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* KONTEN UTAMA */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

                {/* KOLOM KIRI (Artikel & Kotak Dokumentasi Berita) */}
                <div className="md:col-span-2 space-y-10">
                    <div className="prose prose-lg text-gray-700">
                        <h2 className="text-[#1a5c38] font-bold">Tentang Destinasi</h2>
                        <p>{data.content}</p>

                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 my-8">
                            <h3 className="flex items-center gap-2 text-[#1a5c38] font-bold m-0 mb-4">
                                <Info className="h-5 w-5" /> Tips Berkunjung
                            </h3>
                            <ul className="m-0 pl-4">
                                <li>Bawa topi dan kacamata hitam karena cuaca cukup terik.</li>
                                <li>Jangan membuang sampah sembarangan di area pantai.</li>
                                <li>Hormati kearifan lokal warga sekitar.</li>
                            </ul>
                        </div>
                    </div>

                    {/* ✨ TAMBAHAN KOTAK DOKUMENTASI / BERITA (Otomatis menyesuaikan data) */}
                    <div className="border-t pt-8">
                        <h3 className="text-2xl font-bold text-[#1a5c38] mb-6">Dokumentasi & Kabar Kegiatan</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.dokumentasi && data.dokumentasi.map((item: any) => (
                                <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <div className="relative h-40 w-full">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-base mb-1">{item.title}</h4>
                                            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN (Info Tiket & Jam) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                        <h3 className="text-lg font-bold text-[#1a5c38] mb-4 border-b pb-2">Informasi Kunjungan</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Ticket className="h-5 w-5 text-[#F4A460] shrink-0 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Harga Tiket</span>
                                    <span className="font-medium text-gray-900">{data.ticket}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-[#F4A460] shrink-0 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Jam Buka</span>
                                    <span className="font-medium text-gray-900">{data.open}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#F4A460] shrink-0 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold">Lokasi</span>
                                    <span className="font-medium text-gray-900">Desa Banaran, Galur, Kulon Progo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    )
}