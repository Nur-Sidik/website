import prisma from "@/lib/prisma"
import { NavbarClient } from "./navbar-clients"

export async function Navbar() {
  const destinations = await prisma.destination.findMany({
    select: { name: true, slug: true },
    orderBy: { createdAt: "asc" },
  })

  return <NavbarClient destinations={destinations} />
}