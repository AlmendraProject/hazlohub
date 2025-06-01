"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProductDescription from "./ProductDescription";
import ScrollButtons from "./ScrollButtons";

// Define the shape of a single product
type Product = {
  id: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  images: {
    url: string;
  }[];
};

// Define the shape of the API response
interface ApiResponse {
  posts: Product[];
}

const ImageCarouselWeb = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productIndex, setProductIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const productContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/v1/api/posts", {
          cache: "no-store",
        });
        // Type the response data
        const data: ApiResponse = await res.json();
        setProducts(data.posts || []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollToProduct = (direction: "up" | "down") => {
    if (!productContainerRef.current) return;
    const height = productContainerRef.current.clientHeight;
    const offset = direction === "up" ? -height : height;
    productContainerRef.current.scrollBy({ top: offset, behavior: "smooth" });
  };

  const handleProductScroll = () => {
    if (!productContainerRef.current) return;
    const scrollTop = productContainerRef.current.scrollTop;
    const height = productContainerRef.current.clientHeight;
    const index = Math.round(scrollTop / height);
    setProductIndex(index);
    setImageIndex(0);
  };

  const handleImageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / width);
    setImageIndex(index);
  };

  return (
    <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute right-4 z-20 flex flex-col gap-2">
        <ScrollButtons
          containerRef={productContainerRef}
          scrollToProduct={scrollToProduct}
        />
      </div>
      <div
        ref={productContainerRef}
        onScroll={handleProductScroll}
        className="flex flex-col w-full max-w-3xl h-full overflow-y-auto snap-y snap-mandatory scroll-smooth rounded-xl shadow-lg">
        {products.map((product, pIndex) => (
          <div
            key={product.id}
            className="relative w-full flex-shrink-0 h-full snap-center p-4">
            <div
              onScroll={handleImageScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth h-3/4 rounded-xl">
              {product.images.map((img, iIndex) => (
                <div
                  key={iIndex}
                  className="flex-shrink-0 w-full h-full snap-center relative">
                  <Image
                    src={img.url}
                    alt={`${product.nombre} ${iIndex + 1}`}
                    fill // Use `fill` for better responsive images
                    className="object-cover rounded-xl"
                  />
                  {pIndex === productIndex && imageIndex === iIndex && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded">
                      {iIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-left flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold uppercase">
                {product.nombre[0]}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{product.titulo}</h2>
                <ProductDescription description={product.descripcion} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {products.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              productIndex === index ? "bg-white" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarouselWeb;
