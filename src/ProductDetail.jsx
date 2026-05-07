import { useState } from 'react'

export function ProductDetail({ product, onBack, onAddCart }) {
  const images = product.images?.length > 0
    ? product.images
    : [product.image]

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white text-sm mb-8 transition-colors"
      >
        ← Volver a productos
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

        {/* Imagen principal */}
        <img
          src={images[selectedIndex]}
          alt={product.name}
          className="w-full h-72 object-cover transition-all duration-300"
        />

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="flex gap-3 px-8 pt-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-cyan-500'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Vista ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-8 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-white">{product.name}</h2>
          <p className="text-gray-400 leading-relaxed">{product.description}</p>
          <p className="text-cyan-400 font-bold text-2xl">{product.price}</p>
          <button
            onClick={onAddCart}
            className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-semibold py-3 rounded-xl transition-all"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}