import { HeroSection } from "@/components/hero-section";
import { FeatureCards } from "@/components/feature-cards";
import { WisataSection } from "@/components/wisata-section";
import { ProdukSection } from "@/components/produk-section";
import { KontakSection } from "@/components/kontak-section";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [destinations, products] = await Promise.all([
    prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureCards />
      <WisataSection destinations={destinations} />
      <ProdukSection products={products} />
      <KontakSection />
    </div>
  );
}