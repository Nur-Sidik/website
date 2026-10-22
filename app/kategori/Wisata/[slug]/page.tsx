import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function DetailWisataPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const destination = await prisma.destination.findUnique({
        where: { slug },
    });

    if (!destination) {
        notFound();
    }

    const priceNumber = Number(destination.price);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            <Navbar />

            {/* Hero Banner Header */}
            <section className="bg-[#1B4332] pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-white shadow-inner">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                        {destination.name}
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-green-100">
                        Destinasi Ekowisata Alam Desa Banaran, Kulon Progo
                    </p>
                </div>
            </section>

            {/* Konten Utama Detail */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Foto Destinasi */}
                    <div className="relative w-full h-72 sm:h-96 bg-gray-100">
                        <Image
                            src={destination.imageUrl || "/images/FotoPantai.jpeg"}
                            alt={destination.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="p-6 sm:p-10 space-y-8">
                        {/* Informasi Tiket & Kategori */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
                            <div>
                                <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">
                                    Biaya Masuk / Tiket
                                </span>
                                <span className="text-2xl font-black text-[#1B4332]">
                                    {priceNumber > 0
                                        ? `Rp ${priceNumber.toLocaleString("id-ID")}`
                                        : "Gratis / Donasi Sukarela"}
                                </span>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-[#1B4332] border border-green-200">
                                Ekowisata Banaran
                            </span>
                        </div>

                        {/* Deskripsi Lengkap */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-3">
                                Tentang Destinasi Ini
                            </h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                {destination.description}
                            </div>
                        </div>

                        {/* Aksi Navigasi / Lokasi */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <p className="text-xs text-gray-400 text-center sm:text-left">
                                Lokasi: Banaran, Galur, Kabupaten Kulon Progo, D.I. Yogyakarta
                            </p>
                            <Link
                                href={`https://maps.app.goo.gl/KCeGRzCfVgBA6of47?api=1&query=${encodeURIComponent(
                                    `${destination.name} Banaran Galur Kulon Progo`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-semibold rounded-lg shadow-sm text-center transition"
                            >
                                Buka di Google Maps
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}