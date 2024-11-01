
import Header from "../../components/Header";
import BackGCircles from "../../components/BackGCircles";
import TabsTrigger from "../../components/TabsTrigger";
import * as Tabs from '@radix-ui/react-tabs';
import Footer from "../../components/Footer";
import { Moon, Sun, Search, Edit, Trash2, Eye, Users, BookOpen, CreditCard, Settings, SettingsIcon, MoonIcon } from "lucide-react"
import { useState, useEffect } from 'react';
import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";
import UserEditModal from './UserEditModal';
import CourseEditModal from "./CourseEditModal";





    /* const pagos = [{ 
        id: "#PAY1234", 
        email: "juanperez86@gmail.com", 
        course: "React Básico", 
        date: "12/10/2024", 
        method: "Tarjeta de Crédito", 
        amount: "USD 50", 
        status: "Completado" },

    { id: "#PAY5678", 
        email: "anita.lo@gmail.com", 
        course: "JavaScript Avanzado", 
        date: "10/10/2024", 
        method: "PayPal", 
        amount: "USD 75", 
        status: "Pendiente" },
        
    { id: "#PAY9101", 
        email: "zambrano.diego@gmail.com", 
        course: "CSS Avanzado", 
        date: "08/10/2024", 
        method: "Transferencia", 
        amount: "USD 40", 
        status: "Fallido" }
    ] */


const Admin = () => {

    const [activeTab, setActiveTab] = useState("usuarios")
    const [searchTerm, setSearchTerm] = useState('');

    /* PARA EL MODAL */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCOpen, setIsModalCOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    /* ESTOS ERAN PARA LOS DATOS HARDCODEADOS, YA NO LOS USO */
    // const [users, setUsers] = useState(initialUsers);
    // const [courses, setCourses] = useState(initialCourses);

    /* ESTOS SON PARA LOS DATOS DEL FETCH QUE TRAEN DE BASE DE DATOS
    FUNCIONAN*/
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [payments, setPayments] = useState([]);


    

    /* FUNCION PARA BUSQUEDA LUPA */
    // Actualiza el estado del input de búsqueda
    const handleSearchChange = (event) => {    
        const inputValue = event.target.value;        
        // Verificar si el valor ingresado es un número
        if (isNaN(inputValue)) {
            setSearchTerm(inputValue.toLowerCase());
        } else {
            // Si es un número, puedes decidir qué hacer, por ejemplo, dejar el valor como está
            setSearchTerm(inputValue);
        }
    };



    /* FETCH PARA TRAER LISTADO DE USUARIOS */
    const urlGetAllUsers = 'https://no-country-back-end-production.up.railway.app/api/users/all_users';

const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('token'); // Asegurarse de usar el token más reciente
        // console.log('Token usado en fetchUsers:', token);

        const res = await fetch(urlGetAllUsers, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Error al obtener usuarios: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        // console.log('Listado de Usuarios obtenidos:', data);

        setUsers(data.data.users); // Actualizar estado con los usuarios
    } catch (error) {
        console.error('Error en la actualización del listado de usuarios:', error.message);
    }
};

    

    /* USUARIOS --> HAGO EL USEFFECT SIN EL FETCH DENTRO PARA QUE NO SE ME GENERE EL RENDERIZADO INFINITO */
    useEffect(() => {
        fetchUsers();
    }, []);


/* ****************************************************** */
/* CURSOS Y SUS FUNCIONES */
    /* OBTENER TODOS LOS CURSOS */
    const urlGetAllCourses = 'https://no-country-back-end-production.up.railway.app/api/courses/get_all';

    const fetchCourses = () => {
        fetch(urlGetAllCourses, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log('Cursos obtenidos', data);
            setCourses(data.data.courses);
        })
        .catch((error) => {
            console.error('Error en la actualización:', error);
        });
    };

    /* CURSOS--> HAGO EL USEFFECT SIN EL FETCH DENTRO PARA QUE NO SE ME GENERE EL RENDERIZADO INFINITO */
    useEffect(() => {
        fetchCourses();
    }, []);


/* ************************************************************* */
     /* OBTENER TODOS LOS PAGOS */
     const urlGetAllPayments = 'https://no-country-back-end-production.up.railway.app/api/payments/get_all';

     const fetchPayments = () => {
         fetch(urlGetAllPayments, {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
                 Accept: "application/json",
                 Authorization: `Token ${localStorage.getItem('token')}`,
             },
         })
         .then((res) => res.json())
         .then((data) => {
            /* DEL ID NECESITO SABER SI AL FINAL VA A VENIR UN NUMERO O UN STRING */
            const parsedPayments = data.data.payments.map((payment) => ({
                ...payment,
                date: new Date(payment.payment_date).toLocaleDateString('es-AR'), // Convierto a string y DD/MM/YYYY
                amount: payment.amount.toString(), // Aca lo converti a string para que me funcione la lupa
            }));
            // console.log('Pagos obtenidos', parsedPayments);
            setPayments(parsedPayments);
        })
         .catch((error) => {
             console.error('Error en la actualización:', error);
         });
     };
 
     /* PAGOS--> HAGO EL USEFFECT SIN EL FETCH DENTRO PARA QUE NO SE ME GENERE EL RENDERIZADO INFINITO */
     useEffect(() => {
         fetchPayments();
     }, []);





    /* FUNCIONA */
  const usersSearch = searchTerm?
    users.filter(user => user.username.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm) ): users

    /* FUNCIONA */
  const coursesSearch = searchTerm?
    courses.filter(curso => curso.title.toLowerCase().includes(searchTerm) || curso.duration === Number(searchTerm) ): courses
    

    /* EL ID NECESITO SABER SI AL FINAL VA A VENIR UN NUMERO O UN STRING */
  const paymentsSearch = searchTerm?
    payments.filter(pay => pay.id.toLowerCase().includes(searchTerm) || pay.user.email.toLowerCase().includes(searchTerm) || pay.course.title.toLowerCase().includes(searchTerm) || pay.date.includes(searchTerm) || pay.payment_method.toLowerCase().includes(searchTerm) || pay.amount.startsWith(searchTerm)): payments
    

    // Placeholder dinámico según la pestaña activa
    const placeholders = {
        usuarios: "Buscar usuarios...",
        cursos: "Buscar cursos...",
        pagos: "Buscar pagos...",
        configuracion: "Buscar configuraciones..."
    };


    /* FUNCIONES DEL MODAL USER */
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        // console.log('user', user)
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setSelectedCourse(null);
      };
    


        /* UPDATE USER */
        const handleSaveUser = async (updatedUser) => {
            const urlUpdateUser = `https://no-country-back-end-production.up.railway.app/api/users/update_user/${updatedUser.id}`;
        
            try {
                const res = await fetch(urlUpdateUser, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        username: updatedUser.username,
                        email: updatedUser.email,
                    }),
                });
        
                if (!res.ok) throw new Error(`Error al actualizar el usuario: ${res.status}`);
        
                const data = await res.json();
                // console.log("Usuario actualizado exitosamente:", data);
        
                // Guardar el nuevo token --> NO GUARDO ESTE TOKEN PORQUE ES DEL USUARIO QUE SE EDITÓ, NO EL USUARIO LOGEADO
                /* localStorage.setItem('token', data.data.token.token_key);
                console.log('Nuevo token guardado:', localStorage.getItem('token')); */
        
                await new Promise(resolve => setTimeout(resolve, 100)); // Pequeño delay
        
                await fetchUsers(); // Asegurarse que el listado esté actualizado
                closeModal(); // Cerrar modal
            } catch (error) {
                console.error("Error en la actualización del usuario:", error.message);
            }
        };



        /* FUNCION DELETE USER*/    
        const deleteUser = async (userToDelete) => {
            // console.log("ID del usuario a eliminar:", userToDelete.id);
        
            const urlDeleteUser = `https://no-country-back-end-production.up.railway.app/api/users/delete_user/${userToDelete.id}`;
        
            try {
                const token = localStorage.getItem('token'); // Usar siempre el token más reciente
                // console.log('Token usado en deleteUser:', token);
        
                const res = await fetch(urlDeleteUser, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`,
                        Accept: "application/json",
                    },
                });
        
                if (!res.ok) {
                    throw new Error(`Error al eliminar el usuario: ${res.status} ${res.statusText}`);
                }
        
                // console.log("Usuario eliminado exitosamente");
        
                // Asegura que el token más reciente se use en fetchUsers()
                await fetchUsers(); 
            } catch (error) {
                console.error("Error en la eliminación:", error.message);
            }
        };

/* ********************************************************* */
    /* FUNCIONES MODAL CURSOS */
    const openCourseModal = (course) => {
        setSelectedCourse(course);
        setIsModalCOpen(true);
        // console.log('course', course)
      };

      const closeCourseModal = () => {
        setIsModalCOpen(false);
        setSelectedUser(null);
        setSelectedCourse(null);
      };



  


    /* FUNCION UPDATE COURSE CON DATOS CON FETCH*/
    /* AL EFECTIVIZARSE LA ACTUALIZACION NO NECESITO ENVIAR UN NUEVO TOKEN */
    const handleSaveCourse = (updatedCourse) => {
        const token = localStorage.getItem('token'); // Asegurar que leemos el token más reciente
        // console.log("Token al iniciar handleSaveCourse:", token); // Verificar si es el esperado
    
        const urlUpdateCourse = `https://no-country-back-end-production.up.railway.app/api/courses/update/${updatedCourse.id}`;
    
        fetch(urlUpdateCourse, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${token}`, // Usar el token leído justo ahora
            },
            body: JSON.stringify({
                title: updatedCourse.title,
                duration: updatedCourse.duration,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error al actualizar el curso: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // console.log("Curso actualizado exitosamente:", data);
            fetchCourses(); // Refrescar los cursos
            closeCourseModal();
        })
        .catch((error) => {
            console.error("Error en la actualización:", error.message);
        });
    };


    /* FUNCION DELETE COURSE CON DATOS CON FETCH*/    
    const deleteCourse = (courseToDelete) => {
        const urlDeleteCourse = `https://no-country-back-end-production.up.railway.app/api/courses/delete/${courseToDelete.id}`;

        // console.log('id del curso a eliminar', courseToDelete.id)
    
        fetch(urlDeleteCourse, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error al eliminar el curso: ${res.status}`);
            }
    
            // console.log("Curso eliminado exitosamente.");
            // Actualizar el estado eliminando el curso
            fetchCourses(); // Volver a obtener los cursos después de eliminar
        })
        .catch((error) => {
            console.error("Error en la eliminación:", error.message);
        });
    };

    



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">          
          <BackGCircles/>
          
          <Header/>          
          
          <main className="flex-grow container mx-auto lg:px-28 md:px-4 py-8 relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
            Panel de Administración</h2>
            
            <Tabs.Root defaultValue="usuarios" className="">
                <div id="banner-blanco" className='bg-gray-200 rounded-lg mb-8'>
                    <Tabs.List className="px-4 flex text-black justify-between font-semibold">
                        <TabsTrigger value="usuarios" Icon={Users} onClick={() => {setActiveTab("usuarios"); setSearchTerm('')}} text="Usuarios" />
                        <TabsTrigger value="cursos" Icon={BookOpen} onClick={() => {setActiveTab("cursos"); setSearchTerm('')}}text="Cursos" />
                        <TabsTrigger value="pagos" Icon={CreditCard} onClick={() => {setActiveTab("pagos"); setSearchTerm('')}} text="Pagos" />
                        <TabsTrigger value="configuracion" Icon={Settings} onClick={() => setActiveTab("configuracion")}  text="Configuracion" />      
                    </Tabs.List>
                </div>
                

                {/* LUPITA DE CADA PESTAÑA */}
                <div className="mb-8">
                    <div className="relative">
                    <input 
                        type="search" 
                        placeholder={placeholders[activeTab]}
                        value={searchTerm}
                        onChange={handleSearchChange} 
                        className="bg-gray-700/50 pl-10 pr-4 py-2 rounded-full w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>


                {/* CONTENIDO DE TAB USUARIOS */}
                <Tabs.Content value="usuarios">
                    <div id="tarjetita gris" className="p-5 bg-gray-800/50 border-none rounded-xl">
                        <h2 className='text-xl pb-6'>Lista de Usuarios</h2>                        

                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                <th className="border border-gray-300 p-2 text-center">Nombre de Usuario</th>
                                <th className="border border-gray-300 p-2 text-center">Email</th>
                                <th className="border border-gray-300 p-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersSearch.map((user) => (
                                <tr key={user.id} className="border-t">
                                    <td className="border border-gray-300 p-2 text-center">{user.username}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {user.email}
                                    </td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                    <button onClick={() => openModal(user)}
                                    className="p-2 hover:bg-gray-200 hover:text-blue-900 rounded-full">
                                        <EditIcon/>
                                    </button>
                                    <button onClick={()=> deleteUser(user)} className="p-2 hover:bg-gray-200  hover:text-blue-900 rounded-full">
                                        <TrashIcon/>
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Tabs.Content>





                {/* CONTENIDO DE TAB CURSOS */}
                <Tabs.Content value="cursos">
                    <div id="tarjetita gris" className="p-5 bg-gray-800/50 border-none rounded-xl">
                        <h2 className='text-xl pb-6'>Lista de Cursos</h2>                        

                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                <th className="border border-gray-300 p-2 text-center">Nombre del curso</th>
                                <th className="border border-gray-300 p-2 text-center">Duración</th>
                                <th className="border border-gray-300 p-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesSearch.map((course, index) => (
                                <tr key={index} className="border-t">
                                    <td className="border border-gray-300 p-2 text-center">{course.title}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {course.duration} semanas
                                    </td>
                                    <td className="border px-4 py-2 flex justify-center space-x-2">
                                    <button onClick={() => openCourseModal(course)} className="p-2 hover:bg-gray-200 hover:text-blue-900 rounded-full">
                                        <EditIcon/>
                                    </button>
                                    <button onClick={() => deleteCourse(course)} className="p-2 hover:bg-gray-200  hover:text-blue-900 rounded-full">
                                        <TrashIcon/>
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Tabs.Content>


                {/* CONTENIDO DE TAB PAGOS */}
                <Tabs.Content value="pagos">
                    <div id="tarjetita gris" className="p-5 bg-gray-800/50 border-none rounded-xl">
                        <h2 className='text-xl pb-6'>Registro de Pagos</h2>                        

                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                <th className="border px-4 py-2">ID de Pago </th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Curso</th>
                                <th className="border px-4 py-2">Fecha</th>
                                <th className="border px-4 py-2">Método de Pago</th>
                                <th className="border px-4 py-2">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentsSearch.map((payment, index) => (
                                <tr key={index} className="border-t">
                                    <td className="border border-gray-300 p-2 text-center">{payment.ident}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {payment.user.email}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {payment.course.title}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {payment.date}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {payment.payment_method}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                    {payment.amount} USD
                                    </td>
                                    
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Tabs.Content>


                <Tabs.Content value="configuracion">
                    <div id="tarjetita gris" className="p-5 bg-gray-800/50 border-none rounded-xl">
                        <h2 className='text-xl'>Configuración</h2>
                        <p className='text-xs font-normal mb-6'>Aquí van las opciones de configuración.</p>
                  </div>
                </Tabs.Content>
            </Tabs.Root>

        
          </main>
        <UserEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveUser}
        initialUser={selectedUser}
        />
        <CourseEditModal
        isOpenModalCourse={isModalCOpen}
        onClose={closeCourseModal}
        onSave={handleSaveCourse}
        initialCourse={selectedCourse}
        />
          <Footer/>
        </div>
      
  )
}

export default Admin
