import { useState, useEffect } from 'react'

export function CheckoutForm({ cartItems, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    instrucciones: '',
    factura: false,
    terminos: false,
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const [ciudades, setCiudades] = useState([])
  const [loadingCiudades, setLoadingCiudades] = useState(true)

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await fetch('https://69d83ed90576c93882593ed1.mockapi.io/productos')
        if (!response.ok) throw new Error('Error al cargar ciudades')
        const data = await response.json()
        setCiudades(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingCiudades(false)
      }
    }

    fetchCiudades()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres'
    }
    if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener exactamente 10 dígitos'
    }
    if (!formData.ciudad) {
      newErrors.ciudad = 'Selecciona una ciudad'
    }
    if (formData.direccion.trim().length < 5) {
      newErrors.direccion = 'Ingresa una dirección válida'
    }
    if (!formData.terminos) {
      newErrors.terminos = 'Debes aceptar los términos para continuar'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const foundErrors = validate()
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <span className="text-5xl">🎉</span>
        <h3 className="text-xl font-semibold text-white">¡Pedido confirmado!</h3>
        <p className="text-gray-400 text-sm">
          Gracias <span className="text-cyan-400">{formData.nombre}</span>, tu pedido llegará a {formData.ciudad}.
        </p>
        <div className="mt-4 bg-gray-800 rounded-xl p-4 w-full text-left">
          <p className="text-gray-500 text-xs mb-2">Resumen del pedido:</p>
          {cartItems.map((item) => (
            <p key={item.id} className="text-white text-sm">• {item.name} — {item.price}</p>
          ))}
        </div>
        <button
          onClick={onSuccess}
          className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold px-6 py-2 rounded-lg transition-all"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <span className="text-4xl">🛒</span>
        <h3 className="text-lg font-semibold text-white">Tu carrito está vacío</h3>
        <p className="text-gray-400 text-sm">Agrega productos antes de hacer checkout.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">Finalizar compra</h2>
      <p className="text-gray-400 text-sm mb-6">
        {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''} en tu carrito
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Nombre completo <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className="bg-gray-800 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
          />
          {errors.nombre && <p className="text-red-400 text-xs">{errors.nombre}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Teléfono <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="3001234567"
            className="bg-gray-800 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
          />
          {errors.telefono && <p className="text-red-400 text-xs">{errors.telefono}</p>}
        </div>

        {/* SELECT — Ciudades desde MockAPI */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Ciudad <span className="text-red-400">*</span>
          </label>
          <select
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            disabled={loadingCiudades}
            className="bg-gray-800 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white outline-none transition-colors disabled:opacity-50"
          >
            <option value="">
              {loadingCiudades ? 'Cargando ciudades...' : 'Selecciona tu ciudad'}
            </option>
            
            {ciudades.map((ciudad) => (
                <option key={ciudad.numciudad} value={ciudad.ciudad}>
                    {ciudad.ciudad}
                </option>
            ))}
          </select>
          {errors.ciudad && <p className="text-red-400 text-xs">{errors.ciudad}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Dirección <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Calle 123 # 45-67"
            className="bg-gray-800 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
          />
          {errors.direccion && <p className="text-red-400 text-xs">{errors.direccion}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Instrucciones de entrega
          </label>
          <textarea
            name="instrucciones"
            value={formData.instrucciones}
            onChange={handleChange}
            placeholder="Ej: Dejar con el portero, llamar antes de llegar..."
            rows={3}
            className="bg-gray-800 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="factura"
              checked={formData.factura}
              onChange={handleChange}
              className="w-4 h-4 accent-cyan-500"
            />
            <span className="text-gray-300 text-sm">Quiero factura electrónica</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
              className="w-4 h-4 accent-cyan-500"
            />
            <span className="text-gray-300 text-sm">
              Acepto los <span className="text-cyan-400">términos y condiciones</span> <span className="text-red-400">*</span>
            </span>
          </label>
          {errors.terminos && <p className="text-red-400 text-xs">{errors.terminos}</p>}
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-semibold py-3 rounded-lg transition-all mt-2"
        >
          Confirmar pedido →
        </button>

      </form>
    </div>
  )
}