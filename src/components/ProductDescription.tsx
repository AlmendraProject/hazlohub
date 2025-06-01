import { useState } from "react";

interface Props {
  description: string;
}

const ProductDescription = ({ description }: Props) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      <button
        className="text-blue-600 text-sm mt-1 underline"
        onClick={() => setShowFull(true)}>
        Ver más
      </button>

      {showFull && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white/90 backdrop-blur-md max-h-[80vh] w-full max-w-lg p-6 rounded-xl overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-black font-bold text-lg"
              onClick={() => setShowFull(false)}>
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2">Descripción completa</h3>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDescription;
