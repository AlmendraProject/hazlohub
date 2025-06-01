"use client";

import { Input } from "@/components/ui/input";
import { GripVertical, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePostButton from "./CreatePostButton";

const menuItems = [
  { id: "/", label: "Inicio" },
  { id: "empleos", label: "Empleos" },
  { id: "chat", label: "Chat" },
  { id: "notifications", label: "Notificaciones" },
  { id: "perfil", label: "Perfil" },
];

const Header = () => {
  const [search, setSearch] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [createPostButton, setCreatePostButton] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    setShowSearchModal(false);
    router.push(`/${trimmedSearch}`);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSearchModal(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <header className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl px-4 py-3 rounded-full backdrop-blur-md bg-black/80 shadow-lg animate-fade-in-down border border-gray-700">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="text-white font-semibold text-lg">HazloHub</div>

          {/* Botones para móvil */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-9 h-9 rounded-full bg-white/10 border border-gray-600 text-white flex items-center justify-center hover:bg-white/20 transition"
              aria-label="Buscar">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCreatePostButton(true)}
              className="w-9 h-9 rounded-full bg-white/10 border border-gray-600 text-white flex items-center justify-center hover:bg-white/20 transition"
              aria-label="Menú">
              <GripVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Buscador escritorio */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 justify-end">
            <div className="relative group w-60 focus-within:w-full max-w-md transition-all duration-300 ease-in-out">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-white transition-colors duration-300" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar usuario..."
                className="pl-10 pr-4 h-9 text-sm rounded-full bg-black/60 border border-gray-600 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-black/80"
              />
            </div>
          </form>

          {/* Menú escritorio */}
          <nav className="hidden md:flex gap-6 items-center">
            {menuItems.map(({ id, label }) => {
              const href = id === "/" ? "/" : `/${id}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={id}
                  href={href}
                  className={`relative text-sm font-medium transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:bg-gray-300 before:transition-all before:duration-300 ${
                    isActive
                      ? "text-gray-300 before:w-full"
                      : "text-white hover:text-gray-300 hover:before:w-full before:w-0"
                  }`}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Modal búsqueda móvil */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="relative w-full max-w-sm bg-black p-6 rounded-xl border border-gray-700">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-label="Cerrar modal">
              <X className="w-5 h-5" />
            </button>
            <form onSubmit={handleSearch}>
              <label htmlFor="search-input" className="sr-only">
                Buscar
              </label>
              <Input
                id="search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar usuario..."
                className="pl-4 pr-4 h-10 text-sm rounded-full bg-black/60 border border-gray-600 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-black/80"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}

      {/* Modal para crear post */}
      <CreatePostButton
        isOpen={createPostButton}
        onClose={() => setCreatePostButton(false)}
        onCreate={() => {
          setCreatePostButton(false);
          router.push("/crear-post");
        }}
      />
    </>
  );
};

export default Header;
