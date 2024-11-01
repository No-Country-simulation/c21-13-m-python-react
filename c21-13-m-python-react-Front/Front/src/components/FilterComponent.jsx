import React, { useState, useEffect } from "react";

const FilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Aquí se almacenan los cursos
  const [filteredData, setFilteredData] = useState([]); // Aquí se almacenan los resultados filtrados

  // Función para obtener los datos desde la API
  const fetchCourses = async () => {
    try {
      const response = await fetch("https://api.example.com/courses"); // Cambia esta URL por la de tu API
      const result = await response.json();
      setData(result); // Guardamos los cursos en el estado
      setFilteredData(result); // Inicializamos el estado filtrado con todos los cursos
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Obtenemos los cursos al cargar el componente
  }, []);

  // Filtrar en tiempo real mientras el usuario escribe
  useEffect(() => {
    const filtered = data.filter((course) => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered); // Actualizamos el estado con los cursos filtrados
  }, [searchTerm, data]); // Este efecto se ejecuta cada vez que cambia el término de búsqueda o los datos

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      {/* Columna de Filtros */}
      <div className="lg:w-1/3 p-4 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Filtrar Cursos</h2>
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // El filtrado se actualiza mientras escribes
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
      </div>

      {/* Columna de Resultados */}
      <div className="lg:w-2/3 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Resultados</h2>
        <div className="grid grid-cols-1 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((course) => (
              <div key={course.id} className="p-4 border border-gray-300 rounded-md">
                {course.name}
              </div>
            ))
          ) : (
            <p>No se encontraron cursos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
