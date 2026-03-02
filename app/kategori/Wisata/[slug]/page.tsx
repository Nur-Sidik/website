"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Ticket, Clock, Info } from "lucide-react"
import Link from "next/link"

// 1. DATABASE WISATA (Data Rahasia Kita)
const wisataData: Record<string, any> = {
    "burung": {
        title: "Burung Migran",
        image: "/images/FotoBurungMigrasi.jpg", // Pastikan file ini ada
        desc: "Fenomena tahunan ribuan burung migran yang singgah di pesisir Trisik.",
        content: "Setiap tahun, ribuan burung dari belahan bumi utara bermigrasi ke selatan untuk mencari kehangatan. Laguna Trisik menjadi tempat persinggahan favorit mereka. Waktu terbaik untuk pengamatan adalah bulan September - Desember.",
        ticket: "Gratis",
        open: "09.00 - 16.00 WIB"
    },
    "pantai": {
        title: "Pantai Trisik",
        image: "/images/FotoPantai.jpeg", // Pastikan file ini ada
        desc: "Pantai eksotis dengan pasir hitam berkilau dan ombak selatan yang gagah.",
        content: "Pantai Trisik menawarkan pemandangan laut selatan yang memukau. Selain wisata alam, pantai ini juga menjadi pusat kegiatan nelayan lokal. Anda bisa membeli ikan segar langsung dari perahu nelayan di pagi hari.",
        ticket: "Rp 5.000 / orang",
        open: "09.00 - 18.00 WIB"
    },
    "menara": {
        title: "Menara Pantau",
        image: "/images/FotoMenaraPantau.jpg", // Pastikan file ini ada
        desc: "Nikmati pemandangan 360 derajat pesisir Kulon Progo dari ketinggian.",
        content: "Menara pantau yang menjadi spot foto favorit wisatawan. Dari atas sini, Anda bisa melihat garis pantai yang memanjang.",
        ticket: "Rp 2.000 / orang",
        open: "09.00 - 18.00 WIB"
    },
    "mangrove": {
        title: "Hutan Mangrove",
        image: "/images/FotoMangrove.jpg",
        desc: "Jelajahi ekosistem mangrove yang asri.",
        content: "Hutan Mangrove Banaran menawarkan edukasi lingkungan...",
        ticket: "Rp 10.000",
        open: "09.00 - 15.00 WIB"
    },
    "numpak-perahu": {
        title: "Numpak Perahu",
        image: "/images/FotoNumpakPerahu.jpeg",
        desc: "Sensasi menyusuri sungai dengan perahu tradisional.",
        content: "Nikmati ketenangan sungai di bawah rimbunnya mangrove...",
        ticket: "Rp 20.000 / perahu",
        open: "09.00 - 16.00 WIB"
    }
}


export default function WisataDetail() {
    const params = useParams()
    // Ambil data sesuai link (slug)
    const slug = params.slug as string
    const data = wisataData[slug]

    // Kalau data gak ketemu (Salah Link)
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
                {/* Overlay Gelap agar teks terbaca jelas */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Container Teks - Dibuat Tengah secara Vertikal */}
                <div className="w-full relative z-10 px-6 md:px-16 text-white text-center md:text-left">
                    <div className="max-w-7xl mx-auto">

                        {/* Tombol Kembali */}
                        <Link
                            href="/#destinasi"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#F4A460] mb-6 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit mx-auto md:mx-0"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>

                        {/* Judul Besar */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
                            {data.title}
                        </h1>

                        {/* Subjudul / Deskripsi Pendek */}
                        <p className="text-xl md:text-2xl text-gray-100 font-light tracking-wide drop-shadow-sm">
                            {data.desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* KONTEN */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

                {/* KOLOM KIRI (Artikel) */}
                <div className="md:col-span-2 prose prose-lg text-gray-700">
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