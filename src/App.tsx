import React, { useState, useMemo } from "react";
import { BaristaChat } from "./components/BaristaChat";
import { CoffeeCard } from "./components/CoffeeCard";
import { SAMPLE_COFFEES } from "./constants";
import type { Coffee, CoffeeProfile } from "./types";
import {
  ShoppingCart,
  Coffee as CoffeeIcon,
  ChevronRight,
  Info,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";

export default function App() {
  const [profile, setProfile] = useState<CoffeeProfile | null>(null);
  const [cart, setCart] = useState<Coffee[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const recommendedCoffees = useMemo(() => {
    if (!profile) return SAMPLE_COFFEES;

    return SAMPLE_COFFEES.map((coffee) => {
      let score = 0;
      // Match notes
      const matchingNotes = coffee.notes.filter((note) =>
        profile.preferredNotes.some(
          (pNote) =>
            pNote.toLowerCase().includes(note.toLowerCase()) ||
            note.toLowerCase().includes(pNote.toLowerCase()),
        ),
      );
      score += matchingNotes.length * 2;

      // Match acidity
      if (coffee.roastLevel === "Light" && profile.acidity === "High")
        score += 3;
      if (coffee.roastLevel === "Medium" && profile.acidity === "Medium")
        score += 3;
      if (coffee.roastLevel === "Dark" && profile.acidity === "Low") score += 3;

      return { coffee, score };
    })
      .sort((a, b) => b.score - a.score)
      .map((item) => item.coffee);
  }, [profile]);

  const addToCart = (coffee: Coffee) => {
    setCart((prev) => [...prev, coffee]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-burgundy/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-burgundy rounded-xl flex items-center justify-center text-white">
              <CoffeeIcon size={24} />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-burgundy">
              Taza Maestra
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-forest">
            <a href="#" className="hover:text-brand-burgundy transition-colors">
              Tienda
            </a>
            <a href="#" className="hover:text-brand-burgundy transition-colors">
              Orígenes
            </a>
            <a href="#" className="hover:text-brand-burgundy transition-colors">
              Suscripciones
            </a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-brand-burgundy hover:bg-brand-lime/20 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-coffee-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 text-coffee-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              AI Powered Experience
            </div>
            <h1 className="font-serif text-6xl lg:text-7xl text-brand-burgundy leading-[1.1]">
              Encuentra tu <br />
              <span className="italic text-brand-lime">taza maestra</span>
            </h1>
            <p className="text-brand-forest text-lg max-w-md leading-relaxed opacity-80">
              Habla con nuestro Barista experto. Analizaremos tus gustos para
              crear un perfil sensorial único y recomendarte el café que
              realmente amarás.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-brand-burgundy text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-forest transition-all flex items-center gap-2 group">
                Explorar Catálogo
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-coffee-100 flex items-center justify-center text-[10px] font-bold text-coffee-600">
                  +2k
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-coffee-200/30 blur-3xl rounded-full -z-10"></div>
            <BaristaChat onProfileGenerated={(p) => setProfile(p)} />
          </div>
        </section>

        {/* Profile Results - Compact Version */}
        <AnimatePresence>
          {profile && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-brand-burgundy text-white rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-brand-lime mb-2">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Perfil Sensorial Activo
                    </span>
                  </div>
                  <p className="text-lg font-serif italic leading-snug">
                    "{profile.summary}"
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-center">
                    <p className="text-[8px] uppercase text-brand-lime">
                      Acidez
                    </p>
                    <p className="font-bold text-sm">{profile.acidity}</p>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-center">
                    <p className="text-[8px] uppercase text-brand-lime">
                      Cuerpo
                    </p>
                    <p className="font-bold text-sm">{profile.body}</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-serif text-4xl text-coffee-900 mb-2">
                {profile ? "Recomendados para ti" : "Nuestra Colección"}
              </h2>
              <p className="text-coffee-500">
                Granos de especialidad tostados artesanalmente.
              </p>
            </div>
            <div className="flex gap-2">
              {["Todos", "Light", "Medium", "Dark"].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-coffee-200 hover:bg-coffee-100 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recommendedCoffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-coffee-100 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-coffee-900">
                  Tu Carrito
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-coffee-50 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-coffee-400 space-y-4">
                    <ShoppingCart size={48} strokeWidth={1} />
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-coffee-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-coffee-500">{item.origin}</p>
                        <p className="text-sm font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-coffee-100 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-coffee-800 text-white py-4 rounded-2xl font-bold hover:bg-coffee-900 transition-colors">
                  Finalizar Compra
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-coffee-900 text-coffee-300 py-20 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <CoffeeIcon size={24} />
              <span className="font-serif text-2xl font-bold">Barista Pro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Llevando la experiencia del café de especialidad a tu hogar con la
              ayuda de inteligencia artificial.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Tienda</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Granos Enteros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Molido
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sostenibilidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-white/10 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-coffee-500 outline-none"
              />
              <button className="bg-coffee-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                Unirse
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-white/10 text-center text-xs text-coffee-500">
          © 2026 Taza Maestra. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
