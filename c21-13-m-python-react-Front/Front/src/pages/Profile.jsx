
/* import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" */

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import * as Tabs from '@radix-ui/react-tabs';
import { Moon, Sun, User, Lock, GraduationCap, UserPlus } from "lucide-react"
import logo from '../assets/LogoLibro.svg'
import Header from "../components/Header";
import BackGCircles from "../components/BackGCircles";
import TabsTrigger from "../components/TabsTrigger";
import {Ojovisible} from '../icons/Ojovisible'
import {Ojotachado} from '../icons/Ojotachado'
import { useEffect, useState } from 'react';
import Footer from "../components/Footer";








const schemaDatos = Yup.object().shape({
    nombre: Yup.string()
        .min(3, "El nombre es demasiado corto")
        .max(40, "El nombre es demasiado largo")             
        .required('El nombre de usuario es requerido'),
    email: Yup.string()
    .email("El email es inválido")
    .required('El email es requerido'),
})


const storedUser = localStorage.getItem('username') || '';
const storedEmail = localStorage.getItem('email') || '';

const schemaPass = Yup.object().shape({
  current_password: Yup.string()      
      .required("Este campo es obligatorio"),      
  newPass: Yup.string()
      .min(8, "La contraseña es demasiado corta")
      .required("Este campo es obligatorio")
      .test(
        'no-contiene-usuario-email',
        'La contraseña no debe contener el nombre de usuario o el email',
        function (value) {
          return (
            !value.includes(storedUser) && 
            !value.includes(storedEmail)
          );
        }
      )
      .test(
        'no-enteramente-numerico',
        'La contraseña no puede ser enteramente numérica',
        value => !/^\d+$/.test(value)
      )
      .test(
        'no-comun',
        'La contraseña es demasiado común',
        value => !["12345678", "password", "123456789", "qwerty", "abcd1234", "asdf1234"].includes(value)
      ),
  RNewPass: Yup.string()
      .min(8, "La contraseña es demasiado corta")
      .oneOf([Yup.ref('newPass'), null], 'Las contraseñas no coinciden')
      .required("Este campo es obligatorio"), 
})


export const Profile = () => {
  

  
  /* Buscar en el localstorage si hay usuario loggeado y extraer su id, nombre de usuario e email*/
  const currentId = localStorage.getItem('id');
  const currentUsername = localStorage.getItem('username');
  const currentEmail = localStorage.getItem('email');
  // console.log('currentUsername LStorage',currentUsername)
  // console.log('currentEmail LStorage',currentEmail)
  // console.log('currentId LStorage',currentId)


/* para llenar los campos con la info del local storage cuando se carga la pagina */
  const [initialValuesForm, setInitialValuesForm] = useState({
    nombre: '',    
    email: ''        
  });
  
  useEffect(() => {
    setInitialValuesForm({nombre: currentUsername, email: currentEmail})
}, []);

/* ******************************************** */

  const [message, setMessage] = useState("");
  const [messagePass, setMessagePass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNPassword, setShowNPassword] = useState(false);
  const [showRNPassword, setShowRNPassword] = useState(false);
  const [userInscriptions, setUserInscriptions] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleNPasswordVisibility = () => {
    setShowNPassword(!showNPassword);
  };
  const toggleRNPasswordVisibility = () => {
    setShowRNPassword(!showRNPassword);
  };



    /* HANDLE SUBMIT PARA CAMBIAR USERNAME O EMAIL    
    YA ESTA FUNCIONANDO (podria hacerlo con async await)*/
    const urlUpdateUser = 'https://no-country-back-end-production.up.railway.app/api/users/update_user'
    const handleSubmitDatosP= async (values) => {
      // console.log('Formulario enviado:', values)  
      fetch(urlUpdateUser, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
              username: values.nombre,
              email: values.email,              
          }),
      })
      .then((res) => res.json())
      .then((data) => {
          // console.log('Actualización exitosa', data); 
          localStorage.setItem('username', values.nombre);
          localStorage.setItem('email', values.email);   
          localStorage.setItem('token', data.data.token.token_key);                                    
          // console.log('Token guardado en localStorage:', localStorage.getItem('token')); // Verifica si se guarda el token correctamente
          setMessage("¡Datos de usuario actualizados!");      
      })
      .catch(error => {
          // console.log('Error en la actualización:', error);
          setMessage("Error en la actualización"); 
      });
  };

    



/*  HANDLE SUBMIT DEL ACTUALIZAR CONTRASEÑA --> LISTO y FUNCIONANDO*/
const handleSubmitPass = async (values, { setSubmitting, setErrors }) => {
  try {
    const currentUsernameGuardado = localStorage.getItem('username');
    const currentEmailGuardado = localStorage.getItem('email');

    const response = await fetch(urlUpdateUser, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        username: currentUsernameGuardado,
        email: currentEmailGuardado,
        current_password: values.current_password,
        new_password: values.newPass
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && data.errors.current_password) {
        setErrors({ current_password: 'La contraseña actual es incorrecta' });
      } else {
        alert('Ocurrió un error. Inténtalo de nuevo.');
      }
    } else {
      // actualizacion de contraseña exitosa
      // console.log('Actualización exitosa', data);
      setMessagePass("¡Contraseña actualizada exitosamente!");  
      

      //Guardar el nuevo token en local storaage
      localStorage.setItem('token', data.data.token.token_key);
      //verifico que se guardó el token
      // console.log('Token guardado en localStorage:', localStorage.getItem('token'));
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión. Inténtalo más tarde.');
  } finally {
    setSubmitting(false); // Para habilitar de nuevo nuevamente el botón submit
  }
};


/* FETCH PARA TRAER EL LISTADO DE INSCRIPCIONES
DESPUES DANI LE AGREGA LA PALABRA INSCRIPTIONS A LA URL */
const urlGetAllInscriptions = 'https://no-country-back-end-production.up.railway.app/api/inscriptions/get_all/';

    const fetchAllInscriptions = () => {

        fetch(urlGetAllInscriptions, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log('Inscripciones obtenidas', data);
            const filteredIncriptions = data.filter((inscription) => 
              inscription.user == currentId);
            // console.log('Inscripciones del usuario loggeado (filteredInscriptions)', filteredIncriptions);
            setUserInscriptions((prevInscriptions) => {
              // console.log('Estado anterior:', prevInscriptions);
              // console.log('Nuevas inscripciones:', filteredIncriptions);
              return filteredIncriptions;
          });
            // console.log('userInscriptions dentro del fetch all inscriptions', userInscriptions)
            /* fetchCourses()  */           
        })
        .catch((error) => {
            console.error('Error en la actualización:', error);
        });
    };

    /* INSCRIPTIONS--> HAGO EL USEFFECT SIN EL FETCH DENTRO PARA QUE NO SE ME GENERE EL RENDERIZADO INFINITO */
    useEffect(() => {
        fetchAllInscriptions();
    }, []);


    useEffect(() => {
      // console.log('userInscriptions actualizado con useEffect:', userInscriptions);
  }, [userInscriptions]);


  /* USEFFECT PARA LLAMAR A FETCHCURSOS */
  useEffect(() => {
    if (userInscriptions.length > 0) {
        // console.log('Llamando a fetchCourses con userInscriptions actualizado:', userInscriptions);
        fetchCourses();
    }
}, [userInscriptions]);


    /* FETCH PARA TRAER EL LISTADO DE INSCRIPCIONES
DESPUES DANI LE AGREGA LA PALABRA INSCRIPTIONS A LA URL */
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
            /* console.log('Listado completo de Cursos obtenidos', data.data.courses); */
            // console.log('user inscriptions dentro del fetchcursos', userInscriptions)            
            const listaTotalCursos = data.data.courses
            const filteredCourses = listaTotalCursos.filter((course) =>
              userInscriptions.some((inscription) => inscription.course_id === course.id)
          );
            
            setUserCourses(filteredCourses);
            // console.log('filtered courses', filteredCourses)
            // console.log('userCourses', userCourses)
        })
        .catch((error) => {
            console.error('Error en la actualización:', error);
        });
    };

    useEffect(() => {
      // console.log('userCourses actualizado con useEffect:', userCourses);
  }, [userCourses]);



    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">          
          <BackGCircles/>
          
          <Header/>          
          
          <main className="flex-grow container mx-auto lg:px-28 md:px-4 py-8 relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
              Perfil de Usuario</h2>
            
            <Tabs.Root defaultValue="personal" className="">
                <div id="banner-blanco" className='bg-gray-200 rounded-lg mb-8'>
                    <Tabs.List className="px-4 flex text-black justify-between font-semibold">
                        <TabsTrigger value="personal" Icon={User} text="Datos Personales" />
                        <TabsTrigger value="password" Icon={Lock} text="Cambiar Contraseña" />
                        <TabsTrigger value="academic" Icon={GraduationCap} text="Resumen Académico" />
                        {/* <TabsTrigger value="instructor" Icon={UserPlus} text="Ser Instructor" />  */}     
                    </Tabs.List>
                </div>
                

                {/* Contenido de tab Datos Personales */}
                <Tabs.Content value="personal">
                    <div id="tarjetita gris" className="lg:px-20 md:px-8 px-5 py-5 bg-gray-800/50 border-none rounded-xl">
                        <h2 className='text-xl'>Datos Personales</h2>
                        <p className='text-xs font-normal mb-6'>Actualiza tu información personal aquí.</p>

                        <Formik 
                        initialValues={initialValuesForm}
                        enableReinitialize={true}
                        /* initialValues={{
                            nombre: '',
                            email: '',
                        }} */
                        onSubmit={handleSubmitDatosP}
                        validationSchema={schemaDatos}>
                        {({ isValid, dirty }) => (
                            <Form className="flex flex-col gap-4 text-black">
                                {/* INPUT NOMBRE */}
                                <label htmlFor="nombre" className="text-sm text-white">Nombre de usuario</label>
                                <Field placeholder="Tu nombre" className="bg-gray-700/50 w-full text-black m-0 -mt-2 py-3  md:py-1.5 pl-4 border border-grisclaro rounded-md text-sm shadow-down-dark-md" type="text" name="nombre" />
                                <ErrorMessage name="nombre" component="p" className='text-red-500'/>
                                {/* INPUT EMAIL */}
                                <label htmlFor="email" className="text-sm text-white">Correo electrónico</label>
                                <Field placeholder="tu@ejemplo.com" className="bg-gray-700/50 w-full text-black m-0 -mt-2 py-3  md:py-1.5 pl-4 border border-grisclaro rounded-md text-sm shadow-down-dark-md" type="email" name="email" />
                                <ErrorMessage name="email" component="p" className='text-red-500' />
                                {/* BOTON SUBMIT */}
                                <button type="submit" className="cursor-pointer mt-4 py-1.5 text-sm text-white w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 rounded-md" disabled={!isValid || !dirty}>
                                Guardar Cambios
                                </button>
                            </Form>
                            )}
                        </Formik>
                        {message && <p className="mt-4 text-center">{message}</p>}
                    </div>
                </Tabs.Content>


                {/* Contenido de Tab Contraseña */}
                <Tabs.Content value="password">
                  <div id="tarjetita gris" className="lg:px-20 md:px-8 px-5 py-5 bg-gray-800/50 border-none rounded-xl">
                        <h2 className='text-xl'>Cambiar contraseña</h2>
                        <p className='text-xs font-normal mb-6'>Actualiza tu contraseña aquí.</p>

                        <Formik 
                        initialValues={{
                            current_password: '',
                            newPass: '',
                            RNewPass: ''
                        }}
                        onSubmit={handleSubmitPass}
                        validationSchema={schemaPass}>
                        {({ isValid, dirty, isSubmitting}) => (
                            <Form className="flex flex-col gap-4 text-black">
                                {/* INPUT CONTRASEÑA ACTUAL */}
                                <label htmlFor="current_password" className="text-sm text-white -mb-2 ">Contraseña actual</label>
                                <div className="relative w-full">
                                    <Field className="bg-gray-700/50 w-full text-black py-3 md:py-1.5 pl-4 border border-grisclaro rounded-md text-sm shadow-down-dark-md" type={showPassword ? 'text' : 'password'} name="current_password" />
                                    <button
                                      type="button"
                                      onClick={togglePasswordVisibility}
                                      className="text-gray-500 absolute top-[-7px] right-0 flex items-center px-3 py-3"
                                    >
                                      {showPassword ? (
                                        <Ojovisible/>
                                      ) : <Ojotachado/>}
                                    </button>
                                    <ErrorMessage name="current_password" component="p" className='text-red-500'/>                                  
                                </div>
                                
                                {/* INPUT NUEVA CONTRASEÑA */}
                                <label htmlFor="newPass" className="text-sm text-white -mb-2">Nueva contraseña</label>
                                <div className="relative w-full">
                                    <Field className="bg-gray-700/50 w-full text-black m-0 py-3 md:py-1.5 pl-4 border border-grisclaro rounded-md text-sm shadow-down-dark-md" type={showNPassword ? 'text' : 'password'} name="newPass" />
                                    <button
                                      type="button"
                                      onClick={toggleNPasswordVisibility}
                                      className="text-gray-500 absolute top-[-7px] right-0 flex items-center px-3 py-3"
                                    >
                                      {showNPassword ? (
                                        <Ojovisible/>
                                      ) : <Ojotachado/>}
                                    </button>
                                    <ErrorMessage name="newPass" component="p" className='text-red-500'/>
                                </div>
                                
                                {/* INPUT REPETIR NUEVA CONTRASEÑA */}
                                <label htmlFor="RNewPass" className="text-sm text-white -mb-2">Repetir nueva contraseña</label>
                                <div className='relative w-full'>
                                    <Field className="bg-gray-700/50 w-full text-black m-0 -mt-2 py-3  md:py-1.5 pl-4 border border-grisclaro rounded-md text-sm shadow-down-dark-md" type={showRNPassword ? 'text' : 'password'} name="RNewPass" />
                                    <button
                                      type="button"
                                      onClick={toggleRNPasswordVisibility}
                                      className="text-gray-500 absolute top-[-11px] right-0 flex items-center px-3 py-3"
                                    >
                                      {showRNPassword ? (
                                        <Ojovisible/>
                                      ) : <Ojotachado/>}
                                    </button>
                                    <ErrorMessage name="RNewPass" component="p" className='text-red-500'/>
                                </div>
                                
                                {/* BOTON SUBMIT */}
                                <button type="submit" className="cursor-pointer mt-4 py-1.5 text-sm text-white w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 rounded-md" disabled={!isValid || !dirty}>
                                {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
                                </button>
                            </Form>
                            )}
                        </Formik>
                        {messagePass && <p className="mt-4 text-center">{messagePass}</p>}
                    </div>
                </Tabs.Content>



                <Tabs.Content value="academic">
                  <div id="tarjetita gris" className="lg:px-20 md:px-8 px-5 py-5 bg-gray-800/50 border-none rounded-xl">
                      <h2 className='text-xl'>Resumen Académico</h2>
                      <p className='text-xs font-normal mb-6'>Tu progreso en los cursos.</p>
                      <div className="mt-10">
                        <h3>Cursos en los que estás inscripto:</h3>
                        {userCourses.map((course, index) => (
                            <div key={index} className="p-5 pb-10 bg-gray-800/50  border-none rounded-xl">
                              <div className="">
                                <h2 className="text-base font-semibold mb-2">{course.title}</h2>
                                <p className='text-xs mb-2'>{course.description}</p>
                              </div>

                              <div className="py-2">
                                <p className="text-sm text-gray-400">Duración: {course.duration} semanas</p>
                                <p className="text-sm text-gray-400">Nivel: {course.level}</p>
                              </div>         
                              
                                <button className="cursor-pointer mt-4 py-1.5 px-10 text-sm text-white  bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 rounded-md">
                                  Ver Curso
                                </button>
                            </div>
                          ))}
                      </div>                        
                  </div>
                </Tabs.Content>


                {/* <Tabs.Content value="instructor">
                  <div id="tarjetita gris" className="lg:px-20 md:px-8 px-5 py-5 bg-gray-800/50 border-none rounded-xl">
                      <h2 className='text-xl'>Conviértete en Instructor</h2>
                      <p className='text-xs font-normal mb-6'>Comparte tu conocimiento con otros estudiantes.</p>
                      <div className="mt-10 pb-10">
                        <h3>Como instructor, podrás crear y publicar tus propios cursos en nuestra plataforma.</h3>                        
                      </div>
                      <button type="submit" className="cursor-pointer mt-4 py-1.5 text-sm text-white w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 rounded-md">
                                Solicitar Ser Instructor
                      </button>                      
                  </div>
                </Tabs.Content> */}
            </Tabs.Root>

        
          </main>
          
          <Footer/>
        </div>
      )
}


