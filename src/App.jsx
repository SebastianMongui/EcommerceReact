// Importacion de Componentes y datos.
import { useState } from 'react'
import { ProductCard } from "./ProductCard"
import { ProductDetail } from './ProductDetail'
import { ContactForm } from './ContactForm'
import products from './data/products.json'

export default function App() {
  // Creacion de Hooks
  const [cartItems, setCartItems] = useState([]) // Creado para manejar el carrito de compras.
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null) // Usado para tener la informacion del producto a mostrar.
  // Este metodo realiza una actualizacion inteligente al valor de cartItems.
  const handleAddCart = (product) => {
    setCartItems((prev) => [...prev, product])
  }
  // Metodo creado para actualizar el valor del hook selectedProduct y al mismo tiempo el de currentPage (para actualizar el DOM)
  const handleViewDetail = (product) => {
    setSelectedProduct(product)
    setCurrentPage('detail') // Actualizamos el hook currentPage y asi llamamos a otro componente.
  }
  // Metodo usado para dejar en null un estado y forzar la actualizacion del DOM.
  const handleBack = () => {
    setSelectedProduct(null)
    setCurrentPage('store')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header*/}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        {/*/ Se hace una actualizacion al estado de currentPage */}
        <h1 onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-cyan-400 cursor-pointer">
          TechStore
        </h1>
        <nav className="flex items-center gap-6">
          {/* Nuevamente la actualizacion a currentPage, condicionamos los estilos dependiendo del estado de la misma*/}
          <button onClick={() => setCurrentPage('home')} className={`text-sm transition-colors ${currentPage === 'home' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Inicio
          </button>
          <button onClick={() => setCurrentPage('store')} className={`text-sm transition-colors ${currentPage === 'store' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Tienda
          </button>
          <button onClick={() => setCurrentPage('contact')} className={`text-sm transition-colors ${currentPage === 'contact' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            Contacto
          </button>
          <span className="text-gray-300 text-sm">
            {/* Uso de .lenght para contar los productos y manejar la forma en que se muestra. */}
            🛒 {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''}
          </span>
        </nav>
      </header>

      <main className="flex-1">
        {/* En este bloque comparamos el valor actual de currentPage para el manejo visual y la creacion/llamado de componentes  */}
        {/* Home */}
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
            {/* Creacion de botones para cambiar el estado del hook y manejar la vista actual. */}
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
        {/* Recorremos el arreglo del producto importado y por cada uno llamamos el componente ProductCard
            onAddCart y onViewDetail son prop y les enviamos funciones declarades aca.
        */}
        {/* Tienda */}
        {currentPage === 'store' && (
          <div className="max-w-5xl mx-auto px-6 py-10">
            <h2 className="text-xl font-semibold mb-6">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  onAddCart={() => handleAddCart(product)}
                  onViewDetail={() => handleViewDetail(product)}
                />
              ))}
            </div>
          </div>
        )}
        {/* Creamos un nuevo componente a partir del valor de currentPage y del selectedProduct
            Pasamos como props dos funciones
            */}
        {/* Detalle del producto */}
        {currentPage === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBack}
            onAddCart={() => handleAddCart(selectedProduct)}
          />
        )}

        {/* Contacto */}
        {currentPage === 'contact' && (
          <div className="flex flex-col items-center py-10 px-6">
            <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
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