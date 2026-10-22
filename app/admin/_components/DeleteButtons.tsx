"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
    id: number;
    itemName: string;
    itemType: "Destinasi" | "Produk" | "Artikel";
    onDeleteAction: (id: number) => Promise<{ success: boolean; message?: string }>;
}

export function DeleteButton({
    id,
    itemName,
    itemType,
    onDeleteAction,
}: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        const confirmed = window.confirm(
            `Yakin ingin menghapus ${itemType} "${itemName}"?\nData yang dihapus tidak dapat dikembalikan lagi!`
        );

        if (confirmed) {
            startTransition(async () => {
                const res = await onDeleteAction(id);
                if (res && !res.success) {
                    alert(res.message || `Gagal menghapus ${itemType.toLowerCase()}.`);
                }
            });
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 text-xs font-semibold ml-3 disabled:opacity-50 transition cursor-pointer"
        >
            {isPending ? "Menghapus..." : "Hapus"}
        </button>
    );
}