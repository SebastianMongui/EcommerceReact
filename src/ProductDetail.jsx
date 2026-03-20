export function ProductDetail({ product, onBack, onAddCart }) {
    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            {/* en el onclick pasamos un prop que en realidad es una funcion. */}
            <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-8 transition-colors">
                ← Volver a productos
            </button>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-8 flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                    <p className="text-gray-400 leading-relaxed">{product.description}</p>
                    <p className="text-cyan-400 font-bold text-2xl">{product.price}</p>
                    <button onClick={onAddCart} className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-semibold py-3 rounded-xl transition-all">
                        Agregar al carrito
                    </button>
                </div>
            </div>

        </div>
    )
}