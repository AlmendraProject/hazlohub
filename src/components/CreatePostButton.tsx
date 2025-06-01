"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface ImageFile {
  file: File;
  url: string;
}

const CreatePostButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [content, setContent] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Manejar la selección de imágenes
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const newImages = files.map((file: File) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  // Eliminar una imagen de la selección
  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].url); // Liberar memoria
      return newImages;
    });
  };

  // Mover imagen hacia arriba
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setSelectedImages((prev) => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [
        newImages[index],
        newImages[index - 1],
      ];
      return newImages;
    });
  };

  // Mover imagen hacia abajo
  const moveImageDown = (index: number) => {
    if (index === selectedImages.length - 1) return;
    setSelectedImages((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [
        newImages[index + 1],
        newImages[index],
      ];
      return newImages;
    });
  };

  // Manejar el envío de la publicación
  const handleSubmit = async () => {
    if (!content || !nombre || !titulo || selectedImages.length === 0) {
      setError(
        "Por favor, completa todos los campos y selecciona al menos una imagen."
      );
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("nombre", nombre);
    formData.append("titulo", titulo);
    selectedImages.forEach((image) => formData.append("file", image.file));

    try {
      const response = await fetch("/v1/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear la publicación");
      }

      const result = await response.json();
      console.log("Publicación creada:", result);
      setOpen(false);
      setSelectedImages([]);
      setContent("");
      setNombre("");
      setTitulo("");
      setError(null);
    } catch (error: any) {
      setError("Error al crear la publicación: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full p-4 h-auto w-auto"
          size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full h-[90vh] sm:h-auto overflow-auto">
        <DialogHeader>
          <DialogTitle>Crear publicación</DialogTitle>
        </DialogHeader>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Input
          placeholder="Nombre"
          className="mb-4"
          value={nombre}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNombre(e.target.value)
          }
        />

        <Input
          placeholder="Título"
          className="mb-4"
          value={titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitulo(e.target.value)
          }
        />

        <Textarea
          placeholder="¿Qué estás pensando?"
          className="min-h-[150px] mb-4"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {selectedImages.map((image: ImageFile, index: number) => (
              <div key={index} className="relative flex flex-col items-center">
                <img
                  src={image.url}
                  alt={`Vista previa ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveImageUp(index)}
                    disabled={index === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveImageDown(index)}
                    disabled={index === selectedImages.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="mt-4">
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
