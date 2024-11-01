import { BookOpen, Users, Award, Star, Clock } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackGCircles from '../components/BackGCircles'

export default function Home() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative">
            <BackGCircles />

            <Header />
            
            <main className="flex-grow relative z-10">
                <section className="py-20 px-4 text-center">
                <div className="container mx-auto">
                    <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
                    Transforma tu Futuro con Aprendizaje en Línea
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
                    Descubre una nueva forma de aprender con cursos en línea diseñados para impulsar tu carrera y expandir tus horizontes. Únete a miles de estudiantes que ya están cambiando sus vidas.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 text-white text-lg px-8 py-3 rounded-full">
                        Comienza Gratis
                    </button>
                    <button onClick={() => navigate('/todosloscursos')} className="text-white border-white">
                        Explorar Cursos
                    </button>
                    </div>
                </div>
                </section>

                <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold mb-12 text-center">¿Por qué elegir CursosOnline?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: BookOpen, title: "Cursos de Calidad", description: "Contenido creado por expertos de la industria" },
                        { icon: Users, title: "Comunidad Activa", description: "Aprende y crece junto a estudiantes de todo el mundo" },
                        { icon: Award, title: "Certificaciones", description: "Obtén certificados reconocidos por empleadores" },
                        { icon: Clock, title: "Aprendizaje Flexible", description: "Estudia a tu propio ritmo, cuando y donde quieras" }
                    ].map((feature, index) => (
                        <article key={index} className="bg-gray-700/50 border-none rounded-lg p-4">
                        <div>
                            <feature.icon className="w-12 h-12 mb-4 text-[#9333ea]" />
                            <span className="text-xl">{feature.title}</span>
                        </div>
                        <div>
                            <span className="text-gray-300">
                            {feature.description}
                            </span>
                        </div>
                        </article>
                    ))}
                    </div>
                </div>
                </section>

                <section className="py-20">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold mb-12 text-center">Nuestros Cursos Más Populares</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Desarrollo Web Full Stack", duration: "12 semanas", level: "Intermedio", rating: 4.9 },
                        { title: "Ciencia de Datos y Machine Learning", duration: "16 semanas", level: "Avanzado", rating: 4.8 },
                        { title: "Diseño UX/UI Profesional", duration: "10 semanas", level: "Todos los niveles", rating: 4.7 },
                        { title: "Marketing Digital y Growth Hacking", duration: "8 semanas", level: "Principiante", rating: 4.9 },
                        { title: "Desarrollo de Apps Móviles", duration: "14 semanas", level: "Intermedio", rating: 4.8 },
                        { title: "Blockchain y Criptomonedas", duration: "6 semanas", level: "Avanzado", rating: 4.6 }
                    ].map((course, index) => (
                        <article key={index} className="bg-gray-800 border-none rounded-lg p-4">
                        <div>
                            <span className="text-xl">{course.title}</span>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">{course.duration}</span>
                            <span className="text-gray-400">{course.level}</span>
                            </div>
                            <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                            <span>{course.rating}</span>
                            </div>
                        </div>
                        </article>
                    ))}
                    </div>
                    <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 text-white text-lg px-8 py-3 rounded-full">
                        Ver Todos los Cursos
                    </button>
                    </div>
                </div>
                </section>

                <section className="py-20">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold mb-12 text-center">Lo que Dicen Nuestros Estudiantes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: "María G.", role: "Desarrolladora Web", comment: "Los cursos de CursosOnline me  ayudaron a cambiar de carrera y conseguir mi trabajo soñado en tech." },
                        { name: "Carlos R.", role: "Data Scientist", comment: "La calidad del contenido y el apoyo de la comunidad son incomparables. Totalmente recomendado." },
                        { name: "Laura M.", role: "UX Designer", comment: "Gracias a CursosOnline, pude actualizar mis habilidades y conseguir clientes internacionales." },
                        { name: "Javier P.", role: "Marketing Manager", comment: "Los cursos de marketing digital me han permitido llevar mi negocio al siguiente nivel." },
                        { name: "Ana S.", role: "Mobile Developer", comment: "Aprendí a desarrollar apps desde cero. Ahora tengo mi propia startup de tecnología." },
                        { name: "Diego L.", role: "Blockchain Consultant", comment: "El curso de blockchain me abrió las puertas a un mundo de oportunidades en fintech." }
                    ].map((testimonial, index) => (
                        <article key={index} className="bg-gray-800 border-none rounded-lg p-4">
                            <div>
                                <span className="text-lg">{testimonial.name}</span>
                                <span>{testimonial.role}</span>
                            </div>
                            <div>
                                <p className="text-gray-300">{testimonial.comment}</p>
                            </div>
                        </article>
                    ))}
                    </div>
                </div>
                </section>

                <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-6">¿Listo para Transformar tu Carrera?</h3>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
                    Únete a nuestra comunidad de más de 100,000 estudiantes que ya están cambiando sus vidas a través del aprendizaje en línea.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="/sign">
                        <button className="bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 text-white text-lg px-8 py-3 rounded-full">
                            Comenzar Ahora
                        </button>
                    </a>
                    </div>
                </div>
                </section>
            </main>
            
            <Footer />
        </div>
    )
}