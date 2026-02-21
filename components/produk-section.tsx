import { Leaf, Fish, Coffee, ShoppingBag } from "lucide-react"

const produkItems = [
  {
    title: "Keripik Mangrove",
    description: "Camilan khas dari buah mangrove yang diolah secara tradisional oleh masyarakat setempat.",
    price: "Rp 25.000",
    icon: Leaf,
  },
  {
    title: "Ikan Asin Premium",
    description: "Ikan segar dari hasil tangkapan nelayan Banaran, diawetkan dengan cara tradisional.",
    price: "Rp 35.000",
    icon: Fish,
  },
  {
    title: "Teh Mangrove",
    description: "Teh herbal organik dari daun mangrove pilihan, kaya antioksidan dan menyegarkan.",
    price: "Rp 20.000",
    icon: Coffee,
  },
  {
    title: "Batik Mangrove",
    description: "Batik cap bermotif mangrove buatan pengrajin lokal, cocok untuk oleh-oleh khas.",
    price: "Rp 150.000",
    icon: ShoppingBag,
  },
]

export function ProdukSection() {
  return (
    <section
      id="produk"
      className="bg-sand-light py-20 lg:py-28"
      aria-labelledby="produk-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sand-beige">
            Oleh-Oleh
          </p>
          <h2
            id="produk-heading"
            className="mb-4 text-3xl font-extrabold text-foreground lg:text-4xl text-balance"
          >
            Produk Lokal Unggulan
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            Bawa pulang oleh-oleh khas Desa Banaran yang dibuat dengan cinta
            oleh masyarakat setempat. Setiap pembelian mendukung ekonomi lokal.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {produkItems.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mangrove-green/10 text-mangrove-green transition-colors group-hover:bg-mangrove-green group-hover:text-primary-foreground">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-card-foreground">
                {item.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-mangrove-green">
                  {item.price}
                </span>
                <button className="rounded-lg bg-sand-beige/20 px-3 py-1.5 text-xs font-semibold text-sand-beige transition-colors hover:bg-sand-beige hover:text-foreground">
                  Pesan
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
