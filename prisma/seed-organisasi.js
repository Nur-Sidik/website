// Mengisi tabel "organizations" dengan data KTH, KIM, dan Pokdarwis.
// Aman dijalankan berulang kali: kalau slug sudah ada, datanya diperbarui.
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const data = [
  {
    type: "KTH",
    slug: "kth",
    name: "Kelompok Tani Hutan",
    description: "Penjaga Sabuk Hijau",
    imageUrl: "/images/FotoKth.jpeg",
    struktur: {
      namaStruktural: "KTH Tirto Manunggal",
      subjudul: "KTH (Kelompok Tani Hutan) - Desa Banaran",
      ketua: "Nuryanto",
      sekretaris: "Andri Sulistyo",
      bendahara: "Eko Aryanti",
      seksi: [
        { nama: "Sie IpTek", anggota: ["Edi Yulianto", "M Ardiansyah", "M Rizal Fajri", "Apriyanto"] },
        { nama: "Sie Sarana dan Prasarana", anggota: ["Murwantoro", "Catur Adya Akbar", "Tri Budi Susilo", "Surono"] },
        { nama: "Sie Pengolahan Hasil", anggota: ["Dwi Wahyu Nirwanto", "Rubidi", "Sumaryo", "Sangudi"] },
        { nama: "Sie Pemasaran", anggota: ["Meillian Choiruddin", "Rizki Hafid", "Jumilah", "Dian Rana Bagus"] },
      ],
      anggota: ["Rukidi", "M Taufan", "Satria A Muzzaki", "Ruliana Herani S", "Dwiki Firundar R", "Dwi Syafiq S", "Arini Febriyanti", "Hafidzuddin Majid"],
    },
  },
  {
    type: "KIM",
    slug: "kim",
    name: "KIM Desa Banaran",
    description: "Pusat Berita, Informasi, dan Media Desa Wisata",
    imageUrl: "/images/Foto1.jpg",
    struktur: {
      namaStruktural: "KIM Desa Banaran",
      subjudul: "KIM (Kelompok Informasi Masyarakat) - Desa Banaran",
      ketua: "Anonymous",
      sekretaris: "Anonymous",
      bendahara: "Anonymous",
      seksi: [
        { nama: "Sie Media & Publikasi", anggota: ["Anonymous", "Anonymous"] },
        { nama: "Sie Redaksi & Berita", anggota: ["Anonymous", "Anonymous"] },
      ],
      anggota: ["Anonymous", "Anonymous", "Anonymous", "Anonymous"],
    },
  },
  {
    type: "POKDARWIS",
    slug: "pokdarwis",
    name: "Kelompok Darma Wisata",
    description: "Penggerak Pariwisata Desa Banaran",
    imageUrl: "/images/FotoPantai.jpeg",
    struktur: {
      namaStruktural: "Pokdarwis Desa Banaran",
      subjudul: "Pokdarwis (Kelompok Sadar Wisata) - Desa Banaran",
      ketua: "Anonymous",
      sekretaris: "Anonymous",
      bendahara: "Anonymous",
      seksi: [
        { nama: "Sie Pemandu Wisata", anggota: ["Anonymous", "Anonymous"] },
        { nama: "Sie Humas & Pemasaran", anggota: ["Anonymous", "Anonymous"] },
      ],
      anggota: ["Anonymous", "Anonymous", "Anonymous", "Anonymous"],
    },
  },
]

async function main() {
  for (const d of data) {
    const row = {
      type: d.type,
      name: d.name,
      description: d.description,
      imageUrl: d.imageUrl,
      structureInfo: JSON.stringify(d.struktur),
    }
    await prisma.organization.upsert({
      where: { slug: d.slug },
      update: row,
      create: { ...row, slug: d.slug },
    })
    console.log("OK:", d.slug)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())