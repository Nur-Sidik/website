import { TreePine } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-mangrove-dark py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <TreePine className="h-6 w-6 text-sand-beige" aria-hidden="true" />
              <span className="text-lg font-bold">Desa Banaran</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Desa wisata mangrove di pesisir selatan Kulonprogo, Yogyakarta.
              Menawarkan pengalaman ekowisata yang autentik dan bermakna.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-sand-beige">
              Navigasi
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                {["Beranda", "Wisata Edukasi", "Produk Lokal", "Kontak"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                        className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          {/* Wisata */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-sand-beige">
              Destinasi
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "Burung Migran",
                "Konservasi Penyu",
                "Hutan Mangrove",
                "Pantai Trisik",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#wisata"
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Info */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-sand-beige">
              Informasi
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-primary-foreground/70">
                Kec. Galur, Kulonprogo
              </li>
              <li className="text-sm text-primary-foreground/70">
                Yogyakarta 55661
              </li>
              <li className="text-sm text-primary-foreground/70">
                +62 812 3456 7890
              </li>
              <li className="text-sm text-primary-foreground/70">
                info@desabanaran.id
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-primary-foreground/15 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-foreground/50">
              &copy; {new Date().getFullYear()} Desa Wisata Banaran. Hak Cipta
              Dilindungi.
            </p>
            <p className="text-xs text-primary-foreground/50">
              Kulonprogo, Daerah Istimewa Yogyakarta
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
