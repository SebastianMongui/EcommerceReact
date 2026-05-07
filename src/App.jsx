/**
 * Realizamos las importaciones de los componentes y recursos a usar.
 */
import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ProductCard } from "./ProductCard"
import { ProductDetail } from './ProductDetail'
import { ContactForm } from './ContactForm'
import { ProductFilters } from './ProductFilter'
import { CheckoutForm } from './CheckoutForm'
import { Comparator } from './Comparator'
import products from './data/products.json'

// FUNCION PRINCIPAL.
export default function App() {
  // Uso de Hooks (Estados).
  const [cartItems, setCartItems] = useLocalStorage('techstore-cart', [])
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  /**
   * Uso de UseEffect para ajustar el nombre de la pagina.
   */
  useEffect(() => {
    const titles = {
      home: 'TechStore — Inicio',
      store: 'TechStore — Tienda',
      detail: selectedProduct ? `TechStore — ${selectedProduct.name}` : 'TechStore',
      contact: 'TechStore — Contacto',
      checkout: 'TechStore — Checkout',
      comparator: 'TechStore — Comparar productos',
    }
    document.title = titles[currentPage] ?? 'TechStore'
  }, [currentPage, selectedProduct])

  const handleAddCart = (product) => {
    setCartItems((prev) => [...prev, product])
  }

  const handleViewDetail = (product) => {
    setSelectedProduct(product)
    setCurrentPage('detail')
  }

  const handleBack = () => {
    setSelectedProduct(null)
    setCurrentPage('store')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-cyan-400 cursor-pointer">
          TechStore
        </h1>
        <nav className="flex items-center gap-6">
          <button onClick={() => setCurrentPage('home')} className={`text-sm transition-colors ${currentPage === 'home' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Inicio
          </button>
          <button onClick={() => setCurrentPage('store')} className={`text-sm transition-colors ${currentPage === 'store' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Tienda
          </button>
          <button onClick={() => setCurrentPage('contact')} className={`text-sm transition-colors ${currentPage === 'contact' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Contacto
          </button>
          <button onClick={() => setCurrentPage('checkout')} className="text-gray-300 text-sm hover:text-cyan-400 transition-colors">
            🛒 {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''}
          </button>
          <button
            onClick={() => setCurrentPage('comparator')}
            className={`text-sm transition-colors ${currentPage === 'comparator' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            Comparar
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
            <span className="bg-gray-800 text-cyan-400 text-xs font-medium px-4 py-2 rounded-full">
              ⚡ Tecnología premium en Colombia
            </span>
            <h2 className="text-5xl font-bold leading-tight max-w-xl">
              Tecnología que <span className="text-cyan-400">transforma</span> tu vida
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Selección de tecnología de calidad. Envío gratis desde $200.000.
            </p>
            <button onClick={() => setCurrentPage('store')} className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-semibold px-8 py-3 rounded-xl transition-all">
              Ver productos →
            </button>
            <div className="grid grid-cols-3 gap-8 mt-8 border-t border-gray-800 pt-8 w-full max-w-md">
              <div>
                <p className="text-2xl font-bold text-white">12K+</p>
                <p className="text-gray-500 text-sm">Clientes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">600+</p>
                <p className="text-gray-500 text-sm">Productos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.9★</p>
                <p className="text-gray-500 text-sm">Valoración</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'store' && (
    <div className="max-w-6xl mx-auto px-6 py-10">
    <h2 className="text-xl font-semibold mb-6">Productos</h2>

    <ProductFilters
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
    />

    <div className="flex gap-6">

      {/* Lista de productos — zona de arrastre */}
      <div className="flex-1">
        {(() => {
          const filtered = activeFilter === 'all'
            ? products
            : products.filter((p) => p.category === activeFilter)

          return filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('productId', product.id)}
                  className="cursor-grab active:cursor-grabbing active:opacity-60 transition-opacity"
                >
                  <ProductCard
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onAddCart={() => handleAddCart(product)}
                    onViewDetail={() => handleViewDetail(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-lg">No hay productos en esta categoría.</p>
            </div>
          )
        })()}
      </div>

      {/* Zona de soltar — carrito visual */}
      <div
        className="w-72 shrink-0"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const id = parseInt(e.dataTransfer.getData('productId'))
          const product = products.find((p) => p.id === id)
          if (product) handleAddCart(product)
        }}
      >
        <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl p-4 min-h-64 sticky top-4">
          <p className="text-gray-400 text-sm font-medium mb-4 text-center">
            🛒 Suelta aquí para agregar
          </p>
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-xs text-center mt-8">
              Tu carrito está vacío
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                    <p className="text-cyan-400 text-xs">{item.price}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setCurrentPage('checkout')}
                className="mt-2 w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold py-2 rounded-lg text-sm transition-all"
              >
                Comprar →
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  </div>
)}

        {currentPage === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBack}
            onAddCart={() => handleAddCart(selectedProduct)}
          />
        )}

        {currentPage === 'contact' && (
          <div className="flex flex-col items-center py-10 px-6">
            <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        )}

        {currentPage === 'checkout' && (
          <div className="flex flex-col items-center py-10 px-6">
            <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <CheckoutForm
                cartItems={cartItems}
                onSuccess={() => {
                  setCartItems([])
                  setCurrentPage('home')
                }}
              />
            </div>
          </div>
        )}

        {currentPage === 'comparator' && (
          <div className="max-w-4xl mx-auto px-6 py-10">
            <Comparator products={products} />
          </div>
        )}
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cyan-400 font-bold text-lg">TechStore</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('home')} className="text-gray-500 hover:text-white text-sm transition-colors">Inicio</button>
            <button onClick={() => setCurrentPage('store')} className="text-gray-500 hover:text-white text-sm transition-colors">Tienda</button>
            <button onClick={() => setCurrentPage('contact')} className="text-gray-500 hover:text-white text-sm transition-colors">Contacto</button>
          </div>
          <p className="text-gray-600 text-xs">© 2025 TechStore. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}