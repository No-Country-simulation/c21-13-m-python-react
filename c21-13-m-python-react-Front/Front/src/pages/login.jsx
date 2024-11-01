import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from 'react';
import BackGCircles from '../components/BackGCircles';
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom'

const schema = Yup.object().shape({
    username: Yup.string()
        .min(3, "El nombre de usuario es demasiado corto")
        .max(20, "Máximo 20 caracteres")
        .required("Este campo es obligatorio"),
    password: Yup.string()
        .min(8, "La contraseña es demasiado corta")
        .required("Este campo es obligatorio"),
});

function Login() {
    const navigate = useNavigate()
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
            <BackGCircles />

            <Header/>

            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
                            Iniciar sesión
                    </h2>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true);
                            try {
                                const response = await fetch(`https://no-country-back-end-production.up.railway.app/api/users/sign_in`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        username: values.username,
                                        password: values.password,
                                    }),
                                });

                                const data = await response.json();
                                if (response.ok) {
                                    localStorage.setItem('token', data.data.token.token_key);                                    
                                    // Verifica si se guarda correctamenteconsole.log('Token guardado en localStorage:', localStorage.getItem('token'));
                                    localStorage.setItem('id', data.data.user.id);
                                    localStorage.setItem('username', data.data.user.username);
                                    localStorage.setItem('email', data.data.user.email);
                                    setMessage("¡Inicio de sesión exitoso!");
                                    navigate('/todosloscursos')
                                } else {
                                    setMessage(`Error: ${data.message}`);
                                }
                                } catch (error) {
                                    setMessage("Error de conexión con el servidor");
                                }
                                setSubmitting(false);
                        }}
                            validationSchema={schema}
                        >
                            {({ isValid, dirty, isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <Field
                                        placeholder="Nombre de Usuario"
                                        className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                                        type="text"
                                        name="username"
                                    />
                                    <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />

                                    <Field
                                        placeholder="Contraseña"
                                        className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                                        type="password"
                                        name="password"
                                    />
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />

                                    <button
                                        type="submit"
                                        className="cursor-pointer w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 transition-all duration-300 h-10 rounded"
                                        disabled={!isValid || !dirty || isSubmitting}
                                    >
                                        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        {message && <p className="mt-4 text-center">{message}</p>}

                        <div className="flex flex-col items-center mt-6">
                            <p className="text-center text-sm text-gray-400">
                                ¿No tienes una cuenta?{" "}
                            </p>
                            <a
                                href="/sign"
                                className="bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text hover:underline"
                            >
                                Regístrate
                            </a>
                        </div>
                </div>
            </main>
        </div>
    );
}

export default Login;
