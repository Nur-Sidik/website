import prisma from "@/lib/prisma"
import { NavbarClient } from "./navbar-clients"

export async function Navbar() {
  const [destinations, organizations] = await Promise.all([
    prisma.destination.findMany({
      select: { name: true, slug: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.organization.findMany({
      select: { name: true, slug: true, structureInfo: true },
      orderBy: { id: "asc" },
    }),
  ])

  // Nama untuk menu Struktural diambil dari data pengurus (kalau ada)
  const orgs = organizations.map((o) => {
    let namaStruktural = o.name
    try {
      const data = JSON.parse(o.structureInfo ?? "{}")
      if (data.namaStruktural) namaStruktural = data.namaStruktural
    } catch {}
    return { name: o.name, slug: o.slug, namaStruktural }
  })

  return <NavbarClient destinations={destinations} organizations={orgs} />
}