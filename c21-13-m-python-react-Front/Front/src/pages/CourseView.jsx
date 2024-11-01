import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import BackGCircles from '../components/BackGCircles';
import cursoVideo from '../assets/curso.mp4';
export default function CourseView() {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`https://no-country-back-end-production.up.railway.app/api/courses/get_all`);
        const data = await response.json();

        const courses = Array.isArray(data) ? data : data.data?.courses || [];
        const selectedCourse = courses.find(courseKey => courseKey.id === parseInt(courseId));
        
        setCourse(selectedCourse || null);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }

    fetchCourses();
  }, [courseId]);

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden`}>
      <BackGCircles />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            {course ? course.title : "Cargando..."}
          </h2>
          
          <div className="bg-gray-800/50 backdrop-blur-md border-none mb-8 p-6 rounded-lg flex flex-col">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4 w-[828px] h-[416px]">
              <video controls width="max-width">
                  <source src={cursoVideo} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
              </video>
            </div>
            <h3 className="text-xl font-semibold mb-2 inline">Descripción del Curso</h3>
            <p className="text-gray-300 mb-4 inline">
              {course ? course.description : "Cargando descripción del curso..."}
            </p>
          </div>
          
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4">
              <button className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
                <PlayIcon className="h-5 w-5" />
                <span>Contenido</span>
              </button>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md border-none p-6 rounded-lg mt-4">
              <h4 className="font-semibold">Módulo 1: Introducción a React</h4>
              <ul className="ml-4 mt-2 space-y-2">
                <li className="flex items-center">
                  <PlayIcon className="h-5 w-5 text-green-500" />
                  <span>1 Java Avanzado</span>
                </li>
                <li className="flex items-center">
                  <PlayIcon className="h-5 w-5 text-green-500" />
                  <span>2 Java Avanzado</span>
                </li>
                <li className="flex items-center">
                <PlayIcon className="h-5 w-5 text-green-500" />
                  <span>3 Java Avanzado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800/50 backdrop-blur-sm text-center p-4 relative z-10">
        <p className="text-sm text-gray-400">© 2024 CursosOnline. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
