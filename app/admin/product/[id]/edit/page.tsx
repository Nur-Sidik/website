import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "./form";

export default async function EditProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) notFound();

  // Ubah tipe Decimal menjadi number biasa
  const serializedProduct = {
    ...product,
    price: Number(product.price),
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <EditProductForm product={serializedProduct} />
    </div>
  );
} 