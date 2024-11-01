import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import BackGCircles from '../components/BackGCircles'

export default function Formulario() {
  const [metodoPago, setMetodoPago] = useState('');
  const navigate = useNavigate();

    const handleViewCourse = (courseId) => {
      navigate(`/courseView/${courseId}`);
    };

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden`}>
        
        <Header />
        <BackGCircles />

      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md p-8 rounded-lg shadow-lg mt-[3rem]">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">Inscripción a Materia</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-purple-200">
              Nombre completo
            </label>
            <input
              value="alvaro.amestoy"
              type="text"
              id="nombre"
              name="nombre"
              className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
              placeholder="Juan Pérez"
            />
          </div>
          <div>
            <label htmlFor="materia" className="block text-sm font-medium text-purple-200">
            Materia
              <select name="" id="" className="pl-4 bg-gray-700/50 w-full border h-10 rounded text-[white]">
                <option value="">Java Advanced
                </option>
                <option value="">
                Python para Ciencia de Datos
                </option>
                <option value="">
                Introducción a React
                </option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="metodoPago" className="block text-sm font-medium text-purple-200">
              Método de pago
            </label>
            <select
              id="metodoPago"
              name="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
            >
              <option value="">Seleccione un método</option>
              <option value="debito">Débito</option>
              <option value="credito">Crédito</option>
            </select>
          </div>
          {metodoPago === 'debito' && (
            <div>
              <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-purple-200">
                Número de tarjeta
              </label>
              <input
                type="text"
                id="numeroTarjeta"
                name="numeroTarjeta"
                className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                placeholder="1234 5678 9012 3456"
              />
            </div>
          )}
          {metodoPago === 'credito' && (
            <>
              <div>
                <label htmlFor="numeroTarjetaCredito" className="block text-sm font-medium text-purple-200">
                  Número de tarjeta de crédito
                </label>
                <input
                  type="text"
                  id="numeroTarjetaCredito"
                  name="numeroTarjetaCredito"
                  className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label htmlFor="fechaVencimiento" className="block text-sm font-medium text-purple-200">
                  Fecha de vencimiento
                </label>
                <input
                  type="text"
                  id="fechaVencimiento"
                  name="fechaVencimiento"
                  className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                  placeholder="MM/AA"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 transition-all duration-300 h-10 rounded"
            onClick={() => handleViewCourse(29)} 
          >
            Inscribirse
          </button>
        </form>
      </div>
    </div>
  );
}
