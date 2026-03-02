"use client"
import { BottleWine } from "lucide-react"

const produkItems = [
  {
    id: 1, title: "Paket 1 Susur Banaran 1",
    description: "Minimal Pemesanan 5 Orang\n• Pelepasan Penyu\n• Pendampingan \n• Edukasi \n• Air Dan Roti\n",
    price: "Rp 125,000",
    icon: BottleWine
  },
  {
    id: 2, title: "Paket 2",
    description: "Minimal Pemesanan 5 Orang\n• Penanaman Mangrove\n• Pendampingan\n• Edukasi\n• Air Dan Roti\n",
    price: "Rp 110.000",
    icon: BottleWine,
  },
  {
    id: 5, title: "Paket 3",
    description: "Minimal Pemesanan 5 Orang\n• Pelepasan Penyu\n• Mangrove\n• Edukasi\n• Pendampingan\n• Snack\n",
    price: "Rp 155.000",
    icon: BottleWine
  },
  {
    id: 3, title: "Paket 1 Susur Banaran 2",
    description: "Minimal Pemesanan 5 Orang\n• Penanaman Mangrove\n• Bird Watching\n• Pendampingan\n• Edukasi Mangrove\n",
    price: "Rp 100.000",
    icon: BottleWine
  },
  {
    id: 4, title: "Paket 2",
    description: "Minimal Pemesanan 5 Orang\n• Penanaman Mangrove\n• Numpak Perahu\n• Bird Watching\n• Pendampingan\n• Edukasi Mangrove\n",
    price: "Rp 125.000",
    icon: BottleWine
  },
  {
    id: 6, title: "Paket 1 Wisata Semrawung Banaran",
    description: "Minimal Pemesanan 5 Orang\n• Menanam Mangrove (Mendapatkan Bibit 2)\n• Air dan Roti\n",
    price: "Rp 40.000",
    icon: BottleWine
  },
  {
    id: 7, title: "Paket 2 Wisata Semrawung Banaran",
    description: "Minimal Pemesanan 5 Orang\n• Menanam Mangrove (Mendapatkan Bibit 2)\n• Keliling Desa\n• Numpak Perahu\n• Air dan Roti\n",
    price: "Rp 60.000",
    icon: BottleWine
  },
  {
    id: 8, title: "Paket 3 Wisata Semrawung Banaran",
    description: "Minimal Pemesanan 5 Orang\n• Menanam Mangrove (Mendapatkan Bibit 2)\n• Keliling Desa\n• Numpak Perahu\n• Air dan Roti\n • Bird Watching\n",
    price: "Rp 80.000",
    icon: BottleWine
  },
]

export function ProdukSection() {
  return (
    <section id="produk" className="bg-sand-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sand-beige">Oleh-Oleh</p>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground lg:text-4xl">Produk Lokal Unggulan</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Setiap pembelian mendukung ekonomi lokal Desa Banaran.
          </p>
        </div>

        {/* 👇 CSS GRID SYSTEM: 12 Columns Layout */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-12">
          {produkItems.map((item, index) => {
            // Di HP: kartu otomatis bagi 2 (karena grid-cols-2)
            // Di Tablet: md:col-span-6 artinya sebaris isi 2 kartu (12/6=2)
            // Di Laptop: lg:col-span-3 artinya sebaris isi 4 kartu (12/3=4)
            let gridStyles = "md:col-span-6 lg:col-span-3 lg:row-span-5";

            // Atur baris kedua khusus di Desktop
            if (index >= 4) {
              gridStyles += " lg:row-start-6";
            }

            return (
              <article
                key={item.id}
                /* p-4 di mobile supaya hemat tempat, p-6 di desktop supaya lega */
                className={`group flex flex-col rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${gridStyles}`}
              >
                <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-mangrove-green/10 text-mangrove-green group-hover:bg-mangrove-green group-hover:text-primary-foreground transition-colors">
                  <item.icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>

                {/* text-sm di mobile supaya judul paket gak menumpuk baris */}
                <h3 className="mb-1 md:mb-2 text-sm md:text-lg font-bold text-card-foreground leading-tight">
                  {item.title}
                </h3>

                {/* text-[10px] di mobile supaya deskripsi panjang tetep keliatan sejajar */}
                <p className="mb-3 md:mb-4 flex-1 text-[10px] md:text-sm leading-relaxed text-muted-foreground whitespace-pre-line text-left">
                  {item.description}
                </p>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-auto pt-3 border-t border-gray-50">
                  <span className="text-sm md:text-lg font-bold text-mangrove-green">
                    {item.price}
                  </span>
                  <button className="w-full sm:w-auto rounded-lg bg-sand-beige/20 px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-xs font-semibold text-sand-beige hover:bg-sand-beige hover:text-foreground transition-colors">
                    Pesan
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )
}