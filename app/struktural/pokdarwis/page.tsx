"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Users, Briefcase } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function StrukturalPokdarwisPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col justify-between">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[50vh] w-full flex flex-col justify-center pt-32 pb-12">
        <Image
          src="/images/FotoPantai.jpeg"
          alt="Struktural Pokdarwis"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full px-6 md:px-16 text-center md:text-left">
          <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
              Struktur Organisasi
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light drop-shadow-md">
              Pokdarwis (Kelompok Sadar Wisata) - Desa Banaran
            </p>
          </div>
        </div>
      </div>

      {/* BAGAN STRUKTUR ORGANISASI */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F4A460] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            Bagan Kepengurusan
          </span>
          <h2 className="text-3xl font-bold text-mangrove-dark mt-3">Pengurus Pokdarwis Desa Banaran</h2>
        </div>

        <div className="flex flex-col items-center space-y-8 relative">
          
          {/* 1. KETUA */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border-2 border-mangrove-dark p-6 text-center relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-xs text-gray-400 font-medium">
              [ Foto Ketua ]
            </div>
            <span className="text-xs font-bold text-[#F4A460] uppercase tracking-wider">Ketua</span>
            <h3 className="text-xl font-extrabold text-gray-800 mt-1">Anonymous</h3>
          </div>

          <div className="w-0.5 h-8 bg-gray-300 relative"></div>

          {/* 2. SEKRETARIS */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-6 text-center relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 text-xs text-gray-400 font-medium">
              [ Foto ]
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sekretaris</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">Anonymous</h3>
          </div>

          <div className="w-0.5 h-8 bg-gray-300 relative"></div>

          {/* 3. BENDAHARA */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-6 text-center relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 text-xs text-gray-400 font-medium">
              [ Foto ]
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bendahara</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">Anonymous</h3>
          </div>

          <div className="w-0.5 h-8 bg-gray-300 relative"></div>

          {/* SEKSI-SEKSI */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative pt-4">
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-300 hidden md:block"></div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3 border-b pb-2">
                <Briefcase className="h-5 w-5 text-[#F4A460]" />
                <h4 className="font-bold text-mangrove-dark text-base">Sie Pemandu Wisata</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 pl-2">
                <li>• Anonymous</li>
                <li>• Anonymous</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3 border-b pb-2">
                <Briefcase className="h-5 w-5 text-[#F4A460]" />
                <h4 className="font-bold text-mangrove-dark text-base">Sie Humas & Pemasaran</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 pl-2">
                <li>• Anonymous</li>
                <li>• Anonymous</li>
              </ul>
            </div>
          </div>

          <div className="w-0.5 h-8 bg-gray-300 relative"></div>

          {/* ANGGOTA */}
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4 border-b pb-3">
              <Users className="h-6 w-6 text-mangrove-dark" />
              <h4 className="font-bold text-mangrove-dark text-lg">Anggota Pokdarwis Desa Banaran</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <div>• Anonymous</div>
              <div>• Anonymous</div>
              <div>• Anonymous</div>
              <div>• Anonymous</div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}