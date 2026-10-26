"use client"

import { useState, useEffect } from "react"
import { Menu, TreePine, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Destination = { name: string; slug: string }
type Organization = { name: string; slug: string; namaStruktural: string }

export function NavbarClient({
  destinations,
  organizations,
}: {
  destinations: Destination[]
  organizations: Organization[]
}) {
  const [scrolled, setScrolled] = useState(false)
  // Menu dropdown (Radix) baru ditampilkan setelah halaman dimuat di browser,
  // supaya ID-nya tidak beda antara server dan browser (peringatan hydration).
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { label: "Beranda", href: "/" },
    {
      label: "Kategori",
      href: "#",
      subItems: [
        ...destinations.map((d) => ({
          label: d.name,
          href: `/kategori/wisata/${d.slug}`,
        })),
        { label: "Lihat Semua Wisata", href: "/kategori/wisata" },
      ],
    },
    {
      label: "Komunitas",
      href: "#",
      subItems: organizations.map((o) => ({
        label: o.name,
        href: `/komunitas/${o.slug}`,
      })),
    },
    {
      label: "Struktural",
      href: "#",
      subItems: organizations.map((o) => ({
        label: o.namaStruktural,
        href: `/struktural/${o.slug}`,
      })),
    },
    { label: "Informasi", href: "/informasi" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-mangrove-dark/95 backdrop-blur-xl shadow-lg py-2"
          : "bg-transparent py-4"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-sand-beige transition-colors">
            <TreePine className="h-8 w-8 text-sand-beige" />
            <span className="text-xl font-bold tracking-tight">Desa Banaran</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.subItems ? (
                mounted ? (
                  <DropdownMenu key={link.label} modal={false}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-sand-beige font-medium outline-none">
                      {link.label} <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-mangrove-dark border-sand-beige/20 text-white min-w-[200px] z-[60]">
                      {link.subItems.map((sub) => (
                        <DropdownMenuItem key={sub.label} asChild className="focus:bg-white/20 focus:text-white cursor-pointer">
                          <Link href={sub.href}>{sub.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span key={link.label} className="flex items-center gap-1 text-white font-medium">
                    {link.label} <ChevronDown className="h-4 w-4" />
                  </span>
                )
              ) : (
                <Link key={link.href} href={link.href} className="text-white hover:text-sand-beige font-medium transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              {!mounted ? (
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Buka Menu</span>
                </Button>
              ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Menu className="h-7 w-7" />
                    <span className="sr-only">Buka Menu</span>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="bg-mangrove-dark border-l-sand-beige/20 text-white w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2 text-sand-beige">
                      <TreePine className="h-6 w-6" /> Desa Banaran
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <div key={link.label}>
                        {link.subItems ? (
                          <div className="flex flex-col gap-2">
                            <span className="font-bold text-sand-beige px-4">{link.label}</span>
                            <div className="ml-4 border-l border-white/20 pl-4 flex flex-col gap-2">
                              {link.subItems.map((sub) => (
                                <Link key={sub.label} href={sub.href} className="text-sm hover:text-sand-beige transition-colors py-1 block">
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link href={link.href} className="text-lg font-medium hover:text-sand-beige transition-colors px-4 py-2 block rounded-md hover:bg-white/10">
                            {link.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}