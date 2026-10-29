import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  imageUrl: string | null;
  title: string;
  onClose: () => void;
}

export function ModalViewFoto({ isOpen, imageUrl, title, onClose }: Props) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
            Foto: {title}
          </h4>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative w-full h-80 sm:h-96 bg-gray-100">
          <Image src={imageUrl} alt={title} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}