import { useState } from "react"

export function ProductCard({ name, description, price, image, onAddCart, onViewDetail }) {
    // Creacion de Hooks
    const [added, setAdded] = useState(false)
    // condicionamos el texto a mostrar.
    const text = added ? '✅ Agregado' : 'Agregar al carrito'
    // Instanciamos un método que actualiza un estado y ejecuta un método del componente padre.
    const handleClick = () => {
        setAdded(true)
        onAddCart()
    }
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
            <img src={image} alt={name} className="w-full h-40 object-cover" />
            <div className="p-5 flex flex-col gap-3 flex-1">
                <h2 className="text-lg font-semibold text-white">{name}</h2>
                <p className="text-gray-400 text-sm flex-1">{description}</p>
                <p className="text-cyan-400 font-bold text-lg">{price}</p>
                <button onClick={() => onViewDetail()} className="w-full border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 py-2 rounded-lg transition-colors text-sm">
                    Ver detalle →
                </button>
                <button onClick={handleClick} disabled={added} className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-950 font-semibold py-2 rounded-lg transition-colors">
                    {text}
                </button>
            </div>
        </div>
    )
}