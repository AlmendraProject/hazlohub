// components/BottomNavMobile.tsx
"use client";

import { Bell, Briefcase, Circle, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "inicio", icon: <Circle className="w-5 h-5" />, href: "/" },
  { id: "empleos", icon: <Briefcase className="w-5 h-5" />, href: "/empleos" },
  { id: "chat", icon: <MessageCircle className="w-5 h-5" />, href: "/chat" },
  {
    id: "notificaciones",
    icon: <Bell className="w-5 h-5" />,
    href: "/notificaciones",
  },
  { id: "perfil", icon: <User className="w-5 h-5" />, href: "/perfil" },
];

const BottomNavMobile = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-gray-700 md:hidden z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map(({ id, icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={id}
              href={href}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}>
              {icon}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavMobile;
