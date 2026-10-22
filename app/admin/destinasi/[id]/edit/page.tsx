import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditDestinationForm from "./form";

export default async function EditDestinasiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(id) },
  });

  if (!destination) notFound();

  // Ubah tipe Decimal menjadi number biasa
  const serializedDestination = {
    ...destination,
    price: Number(destination.price),
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <EditDestinationForm destination={serializedDestination} />
    </div>
  );
}