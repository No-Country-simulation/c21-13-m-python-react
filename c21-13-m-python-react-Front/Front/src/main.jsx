import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.jsx'
import './App.css'
import './index.css'

import Login from './pages/login'
import Sign from './pages/Sign'
import Home from './pages/Home'
import { Profile } from './pages/Profile';
import TodosLosCursos from './pages/TodosLosCursos.jsx';
import Admin from './pages/admin/Admin.jsx';
import  DatosC  from './components/DatosC.jsx';
import  CourseView  from './pages/CourseView.jsx';
import  Formulario  from './pages/inscripcion.jsx';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign",
    element: <Sign />,

  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/todosloscursos",
    element: <TodosLosCursos/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/formulario",
    element: <Formulario />,
  },
  {
    path: "/courseView/:courseId",
    element: <CourseView />,
  },
  {
    path: "/DatosC",
    element: <DatosC />,
  },
  {
    path: "/admin",
    element: <Admin/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
