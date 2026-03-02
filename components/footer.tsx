import Link from "next/link"
import { TreePine, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a5c38] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          
          {/* BAGIAN KIRI */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TreePine className="h-6 w-6 text-[#F4A460]" />
              <span className="text-lg font-bold tracking-wide">Desa Banaran</span>
            </div>
            <p className="text-gray-300 max-w-sm leading-relaxed text-sm">
              Menikmati keindahan alam pesisir Kulon Progo dengan kearifan lokal yang terjaga.
            </p>
            
            {/* 👇 LINK MEDSOS DI SINI */}
            <div className="flex gap-4 pt-2">
              {/* bagian instagram */}
              <Link 
                href="https://www.instagram.com/desawisatabanaran?igsh=MWh1bDB1OGo0cDdwNQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-[#F4A460] hover:text-[#1a5c38] transition-all"
              >
                <Instagram className="h-4 w-4" />
              </Link>

              {/* 3. ini bagian youtube */}
              <Link 
                href="https://youtube.com/@visitbanaran?si=akTgMmX6fBTPa-Pn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-[#F4A460] hover:text-[#1a5c38] transition-all"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* BAGIAN KANAN */}
          <div className="md:text-right space-y-4">
            <h3 className="text-base font-bold text-[#F4A460] uppercase tracking-wider">Informasi Kontak</h3>
            
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start md:justify-end gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#F4A460] md:order-2" />
                <span>
                  Jl. Banaran No. 1, Galur,<br />
                  Kulon Progo, Yogyakarta 55661
                </span>
              </li>
              <li className="flex items-center md:justify-end gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#F4A460] md:order-2" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center md:justify-end gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#F4A460] md:order-2" />
                <span>info@desabanaran.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Desa Wisata Banaran. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}