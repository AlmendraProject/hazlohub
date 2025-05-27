"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ItemsMenuMobile from "./ItemsMenuMobile";
const menuItems = [
  { id: "/", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "descargar", label: "Descargar App" },
  { id: "login", label: "Login" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl px-8 py-3 rounded-full backdrop-blur-md bg-black/80 shadow-lg animate-fade-in-down border border-gray-700">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-semibold hover:scale-105 transition-transform duration-300">
          <span className="text-lg">HazloHub</span>
        </div>

        {/* Buscador */}
        <div className="hidden md:flex flex-1 justify-end">
          <div className="relative group transition-all duration-300 ease-in-out w-60 focus-within:w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-white transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 h-9 text-sm rounded-full bg-black/60 border border-gray-600 text-white placeholder-gray-400 transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-black/80"
            />
          </div>
        </div>

        {/* Menú de Escritorio */}
        <nav className="hidden md:flex gap-6 items-center">
          {menuItems.map(({ id, label }) => {
            const href = id === "/" ? "/" : `/${id}`;
            const isActive = pathname === href;

            return (
              <Link
                key={id}
                href={href}
                className={`relative text-sm font-medium transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:bg-gray-300 before:transition-all before:duration-300
                  ${
                    isActive
                      ? "text-gray-300 before:w-full"
                      : "text-white hover:text-gray-300 hover:before:w-full before:w-0"
                  }`}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Menú hamburguesa (móvil) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <ItemsMenuMobile
          menuItems={menuItems}
          onClose={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
