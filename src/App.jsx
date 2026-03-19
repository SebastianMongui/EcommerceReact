import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ProductCard } from "./ProductCard"
import { ContactForm } from './ContactForm'
import products from './data/products.json'

function App() {

  const [cartItems, setCartItems] = useState([])
  
  const [currentPage, setCurrentPage] = useState('store')

  const handleAddCart = (product) => {
    setCartItems((prev) => [...prev, product])
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => setCurrentPage('store')}
          className="text-2xl font-bold text-cyan-400 cursor-pointer"
        >
          TechStore
        </h1>
        <nav className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage('store')}
            className={`text-sm transition-colors ${currentPage === 'store' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            Tienda
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className={`text-sm transition-colors ${currentPage === 'contact' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            Contacto
          </button>
          <span className="text-gray-300 text-sm">
            🛒 {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''}
          </span>
        </nav>
      </header>

      {/* Contenido según la página activa */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {currentPage === 'store' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  onAddCart={() => handleAddCart(product)}
                />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="flex flex-col items-center py-10">
            <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-2">Contáctanos</h2>
              <ContactForm />
            </div>
          </div>
        )}
      </main>

    </div>
  )
}

export default App
