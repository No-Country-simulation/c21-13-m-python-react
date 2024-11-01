import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { useState } from 'react';
import Header from "../components/Header"
import Footer from "../components/Footer"
import BackGCircles from '../components/BackGCircles'

// Esquema de validación con Yup
const schema = Yup.object().shape({

    email: Yup.string()
        .email("El email es inválido")
        .required("Este campo es obligatorio"),

    usuario: Yup.string()
        .min(3, "El nombre es demasiado corto")
        .max(20, "Máximo 20 caracteres")
        .required("Este campo es obligatorio"),
    password: Yup.string()
        .min(8, "La contraseña es demasiado corta")
        .required("Este campo es obligatorio")
        .test(
            'no-contiene-usuario-email',
            'La contraseña no debe contener el nombre de usuario o el email',
            function (value) {
                const { usuario, email } = this.parent;
                return !value.includes(usuario) && !value.includes(email);
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
    rPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('Este campo es requerido'),
});

function Sign() {
  // Estado para manejar el mensaje de respuesta
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
            
            <BackGCircles />
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
                            Registro de Usuario
                    </h2>
                    <Formik
                        initialValues={{
                            email: '',
                            usuario: '',
                            password: '',
                            rPassword: ''
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true);
                            try {
                                const response = await fetch(`https://no-country-back-end-production.up.railway.app/api/users/sign_up`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        email: values.email,
                                        username: values.usuario,
                                        password: values.password,
                                    }),
                                });

                                const data = await response.json();
                                if (response.ok) {
                                    setMessage("¡Registro exitoso!");
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
                                        placeholder="Correo Electrónico"
                                        className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                                        type="email"
                                        name="email"
                                    />
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />

                                    <Field
                                        placeholder="Nombre de Usuario"
                                        className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                                        type="text"
                                        name="usuario"
                                    />
                                    <ErrorMessage name="usuario" component="p" className="text-red-500 text-sm" />

                                    <Field
                                        placeholder="Contraseña"
                                        className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                                        type="password"
                                        name="password"
                                    />
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />

                                    <Field
                                        placeholder="Repetir Contraseña"
                                        className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                                        type="password"
                                        name="rPassword"
                                    />
                                    <ErrorMessage name="rPassword" component="p" className="text-red-500 text-sm" />

                                    <button
                                        type="submit"
                                        className="cursor-pointer w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 transition-all duration-300 h-10 rounded"
                                        disabled={!isValid || !dirty || isSubmitting}
                                    >
                                        {isSubmitting ? "Registrando..." : "Registrarme"}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        {message && <p className="mt-4 text-center">{message}</p>}

                        <div className="flex flex-col items-center mt-6">
                            <p className="text-center text-sm text-gray-400">
                                ¿Ya tienes cuenta?{" "}
                            </p>
                            <a
                                href="/login"
                                className="bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text hover:underline"
                            >
                                Iniciar sesión
                            </a>
                        </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Sign;