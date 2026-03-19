// src/ContactForm.jsx
import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres'
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo no es válido'
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
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
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <span className="text-5xl">✅</span>
        <h3 className="text-xl font-semibold text-white">¡Mensaje enviado!</h3>
        <p className="text-gray-400 text-sm">Te contactaremos pronto.</p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', message: '' })
          }}
          className="mt-4 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg">
      <p className="text-gray-400 text-sm mb-8">
        ¿Tienes alguna pregunta? Escríbenos y te respondemos pronto.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Nombre <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className="bg-gray-900 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
          />
          {errors.name && (
            <p className="text-red-400 text-xs">{errors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Correo <span className="text-red-400">*</span>
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className="bg-gray-900 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Mensaje <span className="text-red-400">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="¿En qué te podemos ayudar?"
            rows={5}
            className="bg-gray-900 border border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors resize-none"
          />
          <div className="flex justify-between items-center">
            {errors.message
              ? <p className="text-red-400 text-xs">{errors.message}</p>
              : <span />
            }
            <p className={`text-xs ml-auto ${formData.message.length >= 10 ? 'text-cyan-400' : 'text-gray-600'}`}>
              {formData.message.length}/10 min.
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-semibold py-3 rounded-lg transition-all"
        >
          Enviar mensaje →
        </button>

      </form>
    </div>
  )
}