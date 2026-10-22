import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleForm from "./form";

export default async function EditArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id: parseInt(id) },
  });

  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <EditArticleForm article={article} />
    </div>
  );
}