"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Desa Banaran, Kec. Galur, Kulonprogo, Yogyakarta 55661",
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "+62 812 3456 7890",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@desabanaran.id",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin - Minggu, 07.00 - 17.00 WIB",
  },
]

export function KontakSection() {
  return (
    <section
      id="kontak"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="kontak-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sand-beige">
              Hubungi Kami
            </p>
            <h2
              id="kontak-heading"
              className="mb-4 text-3xl font-extrabold text-foreground lg:text-4xl text-balance"
            >
              Rencanakan Kunjungan Anda
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
              Kami siap membantu merencanakan pengalaman wisata terbaik untuk
              Anda di Desa Banaran. Hubungi kami untuk informasi lebih lanjut.
            </p>

            <div className="flex flex-col gap-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mangrove-green/10 text-mangrove-green">
                    <info.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {info.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-card-foreground">
              Kirim Pesan
            </h3>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nama"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="nama"
                    type="text"
                    placeholder="Masukkan nama"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-mangrove-green focus:ring-2 focus:ring-mangrove-green/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-mangrove-green focus:ring-2 focus:ring-mangrove-green/20 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subjek"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Subjek
                </label>
                <input
                  id="subjek"
                  type="text"
                  placeholder="Topik pesan Anda"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-mangrove-green focus:ring-2 focus:ring-mangrove-green/20 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-mangrove-green focus:ring-2 focus:ring-mangrove-green/20 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-mangrove-green px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-mangrove-dark hover:shadow-lg"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
