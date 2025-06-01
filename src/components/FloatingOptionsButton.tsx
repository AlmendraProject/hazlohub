"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Book,
  Briefcase,
  Building2,
  Calendar,
  Compass,
  HelpCircle,
  MessageSquare,
  MoreVertical,
  Settings,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

const FloatingOptionsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const additionalOptions = [
    { icon: Book, label: "Cursos" },
    { icon: Calendar, label: "Eventos" },
    { icon: MessageSquare, label: "Mensajes" },
    { icon: Settings, label: "Configuración" },
    { icon: HelpCircle, label: "Ayuda" },
    { icon: Star, label: "Favoritos" },
  ];

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
      <Button
        variant="ghost"
        className="w-full justify-start space-x-2 px-2 py-1 h-auto">
        <Briefcase className="w-4 h-4" />
        <span className="text-sm hidden md:inline">Trabajo</span>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start space-x-2 px-2 py-1 h-auto">
        <Users className="w-4 h-4" />
        <span className="text-sm hidden md:inline">Perfiles</span>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start space-x-2 px-2 py-1 h-auto">
        <Building2 className="w-4 h-4" />
        <span className="text-sm hidden md:inline">Empresas</span>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start space-x-2 px-2 py-1 h-auto">
        <Compass className="w-4 h-4" />
        <span className="text-sm hidden md:inline">Explorar</span>
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start space-x-2 px-2 py-1 h-auto">
            <MoreVertical className="w-4 h-4" />
            <span className="text-sm hidden md:inline">Más</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col gap-2">
            {additionalOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start space-x-2 px-2 py-1 h-auto"
                onClick={() => setIsModalOpen(false)}>
                <option.icon className="w-4 h-4" />
                <span className="text-sm">{option.label}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingOptionsButton;
