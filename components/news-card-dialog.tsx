"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Calendar } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string | null;
  eventDate?: Date | string | null;
  createdAt: Date | string;
}

export function NewsCardDialog({ item }: { item: NewsItem }) {
  const [isOpen, setIsOpen] = useState(false);

  // Mengutamakan tanggal pelaksanaan (eventDate), jika null baru fallback ke createdAt
  const targetDate = item.eventDate ? new Date(item.eventDate) : new Date(item.createdAt);

  const formattedDate = targetDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
        {item.image ? (
          <div className="relative h-48 w-full bg-gray-100">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-32 w-full bg-emerald-50/60 flex items-center justify-center text-xs text-emerald-800/60">
            Dokumentasi Kegiatan
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
              {formattedDate}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
              {item.content}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-900 self-start transition cursor-pointer underline underline-offset-4"
          >
            Baca Selengkapnya &rarr;
          </button>
        </div>
      </article>

      {/* Pop-up Dialog Berita Lengkap */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 shadow-sm transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {item.image && (
              <div className="relative h-64 sm:h-80 w-full shrink-0 bg-gray-100">
                <Image src={item.image} alt={item.title} fill className="object-cover" priority />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>

              <h2 className="text-2xl font-black text-gray-900 leading-snug">
                {item.title}
              </h2>

              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line border-t pt-4">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}