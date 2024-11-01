import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function CourseEditModal({ isOpenModalCourse, onClose, onSave, initialCourse }) {
  const [course, setCourse] = useState(initialCourse || { title: '', duration: '' })

  // Sincroniza el estado del usuario cada vez que el modal se abre o cambia el usuario inicial
  useEffect(() => {
    if (isOpenModalCourse && initialCourse) {
      setCourse(initialCourse)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModalCourse])

  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name') // Verificamos que el name venga correctamente
    const value = e.target.value
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(course)
    /* onClose() */
  }

  if (!isOpenModalCourse) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="sm:max-w-[425px] w-full bg-gray-800 text-white p-6 rounded-md relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Editar Curso</h2>
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
              <label htmlFor="title" className="text-right">
                Nombre
              </label>
              <input
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="duration" className="text-right">
                Duración
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={course.duration}
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