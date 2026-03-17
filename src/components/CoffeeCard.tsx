import React from "react";
import type { Coffee } from "../types";
import { ShoppingBag, Star } from "lucide-react";

interface CoffeeCardProps {
  coffee: Coffee;
  onAddToCart: (coffee: Coffee) => void;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({
  coffee,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-burgundy/10 hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={coffee.imageUrl}
          alt={coffee.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-brand-lime text-brand-forest px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {coffee.roastLevel} Roast
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl text-brand-burgundy">
            {coffee.name}
          </h3>
          <span className="font-mono text-brand-forest font-bold">
            ${coffee.price.toFixed(2)}
          </span>
        </div>
        <p className="text-brand-forest text-sm line-clamp-2 mb-4 h-10 opacity-70">
          {coffee.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {coffee.notes.map((note) => (
            <span
              key={note}
              className="text-[10px] bg-brand-cream text-brand-burgundy px-2 py-0.5 rounded-full border border-brand-burgundy/10"
            >
              {note}
            </span>
          ))}
        </div>
        <button
          onClick={() => onAddToCart(coffee)}
          className="w-full bg-brand-burgundy text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-forest transition-colors active:scale-[0.98]"
        >
          <ShoppingBag size={18} />
          <span className="text-sm font-medium">Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
};
