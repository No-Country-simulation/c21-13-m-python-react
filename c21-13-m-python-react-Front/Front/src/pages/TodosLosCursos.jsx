import { Search } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/Header"
import BackGCircles from "../components/BackGCircles";
import Footer from "../components/Footer";

const TodosLosCursos = () => {
    const navigate = useNavigate();

    const handleViewCourse = (courseId) => {
      navigate(`/courseView/${courseId}`);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [allCourses, setAllCourses] = useState([]);

    // Actualizo el estado del input de búsqueda
  const handleSearchChange = (event) => {
    setSelectedValue('all')
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Actualizo el estado del selector de temas
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setSearchTerm(''); // Limpiar la búsqueda al seleccionar un tema
  };

  const filteredCourses = allCourses.filter(course => {
    const temaValido = selectedValue === '' || selectedValue === 'all' || 
                      course.category === selectedValue;  
    const tituloValido = course.title.toLowerCase().includes(searchTerm.toLowerCase());    
  return temaValido && tituloValido; //porque tienen que ser las 2 true para que filtre tanto por tema como por titulo
});

const urlGetAllCourses = 'https://no-country-back-end-production.up.railway.app/api/courses/get_all'

useEffect(() => {
  fetch(urlGetAllCourses, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        /* Authorization: `Token ${localStorage.getItem('token')}` */
    }
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log('Cursos obtenidos', data); 
        setAllCourses(data.data.courses)
            
    })
    .catch(error => {
        // console.log('Error en la actualización:', error);
    });
}, []); 

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
      <BackGCircles/>
      
      <Header/>
      
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
          Explora Nuestros Cursos
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">            
                <input 
                type="search" 
                placeholder="Buscar cursos..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-700/50 pl-10 pr-4 py-2 rounded-full w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="w-full md:w-[180px] relative">
                <select
                    className="w-full bg-gray-700/50 text-white p-2 rounded-md focus:outline-none"
                    value={selectedValue}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>
                    Filtrar por tema
                    </option>
                    <option value="all">Todos los temas</option>
                    <option value="react">React</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="design">Diseño UX/UI</option>
                    <option value="node">Node.js</option>
                    <option value="ia">IA</option>
                    <option value="machineLearning">Machine Learning</option>
                    <option value="dataCience">Ciencia de Datos</option>
                </select>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredCourses.map((course, index) => (
            <div key={index} className="p-5 bg-gray-800/50  border-none rounded-xl">
              <div className="">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className='text-xs mb-6'>{course.description}</p>
              </div>

              <div className="py-6">
                <p className="text-sm text-gray-400">Duración: {course.duration} semanas</p>
                <p className="text-sm text-gray-400">Nivel: {course.level}</p>
              </div>         
              
              <button
            onClick={() => handleViewCourse(course.id)} // Llama a handleViewCourse solo cuando se hace clic
            className="cursor-pointer mt-4 py-1.5 text-sm text-white w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 rounded-md"
          >
            Ver Curso
          </button>
            </div>
          ))}
        </div>        
      </main>
      
      <Footer/>
    </div>
  )
}

export default TodosLosCursos
