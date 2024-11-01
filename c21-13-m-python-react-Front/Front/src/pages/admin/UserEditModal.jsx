import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function UserEditModal({ isOpen, onClose, onSave, initialUser }) {
  const [user, setUser] = useState(initialUser || { username: '', email: '' })

  // Sincroniza el estado del usuario cada vez que el modal se abre o cambia el usuario inicial
  useEffect(() => {
    if (isOpen && initialUser) {
      setUser(initialUser)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name') // Verificamos que el name venga correctamente
    const value = e.target.value
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(user)
    /* onClose() */
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="sm:max-w-[425px] w-full bg-gray-800 text-white p-6 rounded-md relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Editar Usuario</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 absolute top-4 right-4"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Nombre
              </label>
              <input
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 text-white px-4 py-2 rounded"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}