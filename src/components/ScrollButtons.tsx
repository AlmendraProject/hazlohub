"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollButtonsProps {
  scrollToProduct: (direction: "up" | "down") => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollButtons({
  scrollToProduct,
  containerRef,
}: ScrollButtonsProps) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      setAtTop(scrollTop === 0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Ejecutar al montar
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, [containerRef]);

  return (
    <div className="flex flex-col gap-2">
      {atTop ? (
        <button
          onClick={() => scrollToProduct("down")}
          className="bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black">
          <ChevronDown size={20} />
        </button>
      ) : (
        <>
          <button
            onClick={() => scrollToProduct("up")}
            className="bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black">
            <ChevronUp size={20} />
          </button>
          <button
            onClick={() => scrollToProduct("down")}
            className="bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black">
            <ChevronDown size={20} />
          </button>
        </>
      )}
    </div>
  );
}
