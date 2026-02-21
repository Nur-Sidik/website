import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WisataSection } from "@/components/wisata-section"
import { ProdukSection } from "@/components/produk-section"
import { KontakSection } from "@/components/kontak-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WisataSection />
      <ProdukSection />
      <KontakSection />
      <Footer />
    </main>
  )
}
