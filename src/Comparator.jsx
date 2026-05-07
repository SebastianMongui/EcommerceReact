import { useState } from 'react'

export function Comparator({ products }) {
  const [selectedA, setSelectedA] = useState('')
  const [selectedB, setSelectedB] = useState('')

  const productA = products.find((p) => p.id === parseInt(selectedA))
  const productB = products.find((p) => p.id === parseInt(selectedB))

  const fields = [
    { label: 'Nombre',     key: 'name' },
    { label: 'Categoría',  key: 'category' },
    { label: 'Precio',     key: 'price' },
    { label: 'Descripción',key: 'description' },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">Comparar productos</h2>
      <p className="text-gray-400 text-sm mb-8">Selecciona dos productos para comparar</p>

      {/* Selectores */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <select
          value={selectedA}
          onChange={(e) => setSelectedA(e.target.value)}
          className="bg-gray-900 border border-gray-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
        >
          <option value="">Producto A</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          value={selectedB}
          onChange={(e) => setSelectedB(e.target.value)}
          className="bg-gray-900 border border-gray-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
        >
          <option value="">Producto B</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Tabla comparativa */}
      {productA && productB ? (
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          {/* Imágenes */}
          <div className="grid grid-cols-3 bg-gray-900">
            <div />
            <div className="p-4 flex flex-col items-center gap-2 border-l border-gray-800">
              <img src={productA.image} alt={productA.name} className="w-20 h-20 object-cover rounded-lg" />
            </div>
            <div className="p-4 flex flex-col items-center gap-2 border-l border-gray-800">
              <img src={productB.image} alt={productB.name} className="w-20 h-20 object-cover rounded-lg" />
            </div>
          </div>

          {/* Filas de comparación */}
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-3 border-t border-gray-800">
              <div className="px-4 py-3 bg-gray-900 text-gray-500 text-sm font-medium">
                {field.label}
              </div>
              <div className="px-4 py-3 text-white text-sm border-l border-gray-800">
                {productA[field.key]}
              </div>
              <div className="px-4 py-3 text-white text-sm border-l border-gray-800">
                {productB[field.key]}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-800 rounded-xl">
          <p className="text-4xl mb-3">⚖️</p>
          <p className="text-gray-500 text-sm">Selecciona dos productos para ver la comparación</p>
        </div>
      )}
    </div>
  )
}