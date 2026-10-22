"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
  id: number;
  itemType: "destinasi" | "produk" | "artikel";
  onDelete: (id: number) => Promise<{ success: boolean; message?: string }>;
}

export function DeleteButton({ id, itemType, onDelete }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Yakin mau menghapus ${itemType} ini? Data yang terhapus tidak bisa dikembalikan.`)) {
      startTransition(async () => {
        const res = await onDelete(id);
        if (!res.success) {
          alert(res.message || "Gagal menghapus data.");
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:text-gray-400 transition cursor-pointer"
    >
      {isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}