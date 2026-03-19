import { useState } from "react"
export function ProductCard({ name, description, price, onAddCart}) {
    
    const [added, setAdded] = useState(false)

    const text = added ? ' ✅ Agregado' : 'Agregar al carrito'

    const handleClick = () => {
        setAdded(true)
        onAddCart()
    }
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-white">{name}</h2>
            <p className="text-gray-400 text-sm flex-1">{description}</p>
            <p className="text-cyan-400 font-bold text-lg">{price}</p>
            <button
                onClick={handleClick}
                disabled={added}
                className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold py-2 rounded-lg transition-colors">
                {text}
            </button>
        </div>
    )
}