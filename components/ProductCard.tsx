import Image from "next/image";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  buttonLabel: string;
  color: "green" | "red";
  onClick: () => void;
};

const colorStyles = {
  green: "bg-green-50 border-green-300 text-green-600 hover:bg-green-100",
  red: "bg-red-50 border-red-300 text-red-600 hover:bg-red-100",
};

export default function ProductCard({ product, buttonLabel, color, onClick }: Props) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-square border border-b-0 border-gray-300 rounded-t-lg overflow-hidden">
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          width={150}
          height={150}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1 right-1 bg-black/60 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          ${product.price.toFixed(2)}
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-1 py-0.5 line-clamp-2">
          {product.title}
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`w-full py-1.5 text-sm cursor-pointer border rounded-b-lg ${colorStyles[color]}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
