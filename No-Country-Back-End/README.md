## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
  - [Usuarios](#usuarios)
  - [Cursos](#cursos)
  - [Pagos](#pagos)

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- Python (versión 3.12.2)
- PostgreSQL (versión 16)
- pip (administrador de paquetes de Python)

### Pasos de Instalación

1. **Clona este repositorio:**

```bash
git clone https://github.com/Daniheto/No-Country-Back-End.git
```

2. **Crear el entorno virtual:**

Utiliza `virtualenv` o otro gestor de entornos virtuales

```bash
pip install virtualenv
python -m virtualenv venv
```

3. **Instalar las dependencias:**

```bash
cd No-Country-Back-End
pip install -r requirements.txt
```

4. **Configurar variables de entorno:**

- Crea una base de datos PostgreSQL en tu entorno.
- Crea un archivo `.env` en la ruta raiz de tu proyecto y crea las variables de entorno con los datos correpodientes:
  - `ENGINE` -> Tipo de base de datos
  - `NAME` -> Nombre de la base de datos
  - `USER` -> Usuario de la base de datos
  - `PASSWORD` -> Contraseña de la base de datos
  - `HOST` -> Host de la base de datos
  - `PORT` -> Puerto de la base de datos
- En el archivo `.env` crea una nueva variable para la conexion del host del fronted:
  - `HOST_FRONTEND` -> URL del frontend

5. **Crea las migraciones:**

```bash
python manage.py makemigrations --settings=config.settings.development
python manage.py migrate --settings=config.settings.development
```

6. **Ejecutar el servidor:**

```bash
python manage.py runserver --settings=config.settings.development
```

¡Listo! El proyecto ahora debería estar en funcionamiento en tu entorno local. Puedes acceder a él desde tu navegador web visitando `http://localhost:8000`.

## Endpoints

### Usuarios

| Nombre                                                                                   | Método   | Url                                    | Descripción                                                                   |
| :--------------------------------------------------------------------------------------- | :------- | :------------------------------------- | :---------------------------------------------------------------------------- |
| [Registro de Usuarios](#registro-de-usuario)                                             | `POST`   | `/api/users/sign_up`                   | Registro de usuarios.                                                         |
| [Inicio de Sesión de Usuarios](#inicio-de-sesión-de-usuario)                             | `POST`   | `/api/users/sign_in`                   | Inicio de sesión de los usuarios.                                             |
| [Cierre de Sesión de Usuarios](#cierre-de-sesión-de-usuario)                             | `POST`   | `/api/users/sign_out`                  | Cerrar sesión de un usuario autenticado.                                      |
| [Actualización del Usuarios](#actualización-del-usuario)                                 | `PUT`    | `/api/users/update_user`               | Actualizar la información del perfil del usuario.                             |
| [Eliminación del Usuarios](#eliminación-del-usuario)                                     | `DELETE` | `/api/users/delete_user`               | Eliminar el usuario actual.                                                   |
| [Obtener Todos los Usuarios](#obtención-de-todos-los-usuarios)                           | `GET`    | `/api/users/all_users`                 | Obtiene todos los usuarios.                                                   |
| [Actualización del Usuarios por Administrador](#actualización-del-usuario-administrador) | `PUT`    | `/api/users/update_user/<int:user_id>` | Actualizar la información del perfil del usuario por parte del administrador. |
| [Eliminación del Usuarios por Administrador](#eliminación-del-usuario-administrador)     | `DELETE` | `/api/users/delete_user/<int:user_id>` | Eliminar el usuario por parte del administrador.                              |

#### Registro de usuario

##### Método HTTP

```http
POST /api/users/sign_up
```

##### Parámetros

| Parámetro  | Tipo     | Descripción                                   |
| :--------- | :------- | :-------------------------------------------- |
| `username` | `string` | **Requerido**. Nombre del usuario             |
| `email`    | `string` | **Requerido**. Correo electrónico del usuario |
| `password` | `string` | **Requerido**. Contraseña del usuario         |

##### Ejemplo de solicitud

```http
Content-Type: application/json

{
    "username": "testUsername",
    "email": "test@email.com",
    "password": "testPassword"
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "status": "success",
    "message": "User registered successfully.",
    "data": {
        "token": {
            "token_key": "b14407b771de4372bb3fd864a7d4b12884b8db09"
        },
        "user": {
            "id": 1,
            "username": "testUsername",
            "email": "test@email.com",
            "date_joined": "2024-10-14T00:12:52.125524Z"
        }
    }
}
```

#### Inicio de sesión de usuario

##### Método HTTP

```http
POST /api/users/sign_in
```

##### Parámetros

| Parámetro  | Tipo     | Descripción                           |
| :--------- | :------- | :------------------------------------ |
| `username` | `string` | **Requerido**. Nombre del usuario     |
| `password` | `string` | **Requerido**. Contraseña del usuario |

##### Ejemplo de solicitud

```http
Content-Type: application/json

{
    "username": "testUsername",
    "password": "testPassword"
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "status": "success",
    "message": "User logged in successfully.",
    "data": {
        "token": {
            "token_key": "b14407b771de4372bb3fd864a7d4b12884b8db09",
            "token_expiration": "2024-10-17T23:50:09.865811+00:00"
        },
        "user": {
            "id": 1,
            "username": "testUsername",
            "email": "test@email.com",
            "date_joined": "2024-10-14T00:12:52.125524Z"
        }
    }
}
```

#### Cierre de sesión de usuario

##### Método HTTP

```http
POST /api/users/sign_out
```

##### Parámetros

| Parámetro | Tipo     | Descripción                           |
| :-------- | :------- | :------------------------------------ |
| `Token`   | `string` | **Requerido**. Token de autenticación |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "User logged out successfully."
}
```

#### Actualización del usuario

##### Método HTTP

```http
PUT /api/users/update_user
```

##### Parámetros

| Parámetro          | Tipo     | Descripción                                                             |
| :----------------- | :------- | :---------------------------------------------------------------------- |
| `Token`            | `string` | **Requerido**. Token de autenticación                                   |
| `username`         | `string` | **Requerido**. Nombre del usuario                                       |
| `email`            | `string` | **Requerido**. Correo electrónico del usuario                           |
| `current_password` | `string` | **Requerido si se cambia la contraseña**. Contraseña actual del usuario |
| `new_password`     | `string` | Nueva contraseña del usuario                                            |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>

{
    "username": "newUsername",
    "email": "new@email.com",
    "current_password": "currentPassword",
    "new_password": "newPassword"
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "User profile updated successfully.",
    "data": {
        "token": {
            "token_key": "56df34f5356f23863572fe1610539f4240aa466a",
            "token_expiration": "2024-10-20T15:18:45.410372+00:00"
        },
        "users": {
            "id": 1,
            "username": "newUsername",
            "email": "new@email.com",
            "date_joined": "2024-10-17T15:14:16.668058Z"
        }
    }
}
```

#### Eliminación del usuario

##### Método HTTP

```http
DELETE /api/users/delete_user
```

##### Parámetros

| Parámetro | Tipo     | Descripción                           |
| :-------- | :------- | :------------------------------------ |
| `Token`   | `string` | **Requerido**. Token de autenticación |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "User deleted successfully."
}
```

#### Obtención de todos los usuarios

##### Método HTTP

```http
GET /api/users/all_users
```

##### Parámetros

| Parámetro | Tipo     | Descripción                           |
| :-------- | :------- | :------------------------------------ |
| `Token`   | `string` | **Requerido**. Token de autenticación |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "users successfully obtained",
    "data": {
        "users": [
            {
                "id": 1,
                "username": "testUsername",
                "email": "test@email.com",
                "date_joined": "2024-10-17T15:14:16.668058Z"
            },
            {
                "id": 2,
                "username": "otherUsername",
                "email": "other@email.com",
                "date_joined": "2024-10-18T19:14:16.668058Z"
            },
            ...
        ]
    }
}
```

#### Actualización del usuario

##### Método HTTP

```http
PUT /api/users/update_user/<int:user_id>
```

##### Parámetros

| Parámetro  | Tipo     | Descripción                                   |
| :--------- | :------- | :-------------------------------------------- |
| `Token`    | `string` | **Requerido**. Token de autenticación         |
| `user_id`  | `int`    | **Requerido**. ID del usuario a eliminar      |
| `username` | `string` | **Requerido**. Nombre del usuario             |
| `email`    | `string` | **Requerido**. Correo electrónico del usuario |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>

{
    "username": "newUsername",
    "email": "new@email.com",
    "current_password": "currentPassword",
    "new_password": "newPassword"
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "User profile updated successfully.",
    "data": {
        "token": {
            "token_key": "56df34f5356f23863572fe1610539f4240aa466a",
            "token_expiration": "2024-10-20T15:18:45.410372+00:00"
        },
        "users": {
            "id": 1,
            "username": "newUsername",
            "email": "new@email.com",
            "date_joined": "2024-10-17T15:14:16.668058Z"
        }
    }
}
```

#### Eliminación del usuario

##### Método HTTP

```http
DELETE /api/users/delete_user/<int:user_id>
```

##### Parámetros

| Parámetro | Tipo     | Descripción                              |
| :-------- | :------- | :--------------------------------------- |
| `Token`   | `string` | **Requerido**. Token de autenticación    |
| `user_id` | `int`    | **Requerido**. ID del usuario a eliminar |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "User deleted successfully."
}
```

### Cursos

| Nombre                                                | Método   | Url                                   | Descripción                        |
| :---------------------------------------------------- | :------- | :------------------------------------ | :--------------------------------- |
| [Crear un curso](#crear-un-curso)                     | `POST`   | `/api/courses/create`                 | Crea nuevos cursos.                |
| [Obtener todos los cursos](#obtener-todos-los-cursos) | `GET`    | `/api/courses/get_all`                | Obtiene todos los cursos.          |
| [Obtener un curso por id](#obtener-un-curso-id)       | `GET`    | `/api/courses/get/<int:course_id>`    | Obtiene un curso mediante su id.   |
| [Actualizar un curso](#actualizar-un-curso)           | `PUT`    | `/api/courses/update/<int:course_id>` | Actualiza un curso mediante su ID. |
| [Eliminar un curso](#eliminar-un-curso)               | `DELETE` | `/api/courses/delete/<int:course_id>` | Elimina un curso mediante su ID.   |

#### Crear un curso

##### Método HTTP

```http
POST /api/courses/create
```

##### Parámetros

| Parámetro     | Tipo      | Descripción                       |
| :------------ | :-------- | :-------------------------------- |
| `token`       | `string`  | **Requerido**. Token del usuario  |
| `title`       | `string`  | **Requerido**. Titulo del curso   |
| `description` | `string`  | Descripcion del curso             |
| `price`       | `decimal` | Precio del curso                  |
| `category`    | `string`  | Categoria del curso               |
| `level`       | `string`  | **Requerido**. Nivel del curso    |
| `status`      | `string`  | Estado del curso                  |
| `duraction`   | `int`     | **Requerido**. Duración del curso |

> **NOTA**: El parámetro `level` solo acepta los siguientes valores:
>
> - **beginner**: Indica un nivel inicial de habilidad.
> - **intermediate**: Indica un nivel intermedio de habilidad.
> - **advanced**: Indica un nivel avanzado de habilidad.

> **NOTA**: El parámetro `status` solo acepta los siguientes valores:
>
> - **draft**: El documento está en estado de borrador.
> - **review**: El documento está en revisión.
> - **approved**: El documento ha sido aprobado.
> - **rejected**: El documento ha sido rechazado.

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>

{
    "title": "Test course title",
    "description": "Test course description",
    "price": 12.2,
    "category": "Test course category",
    "level": "intermediate",
    "status": "approved",
    "duration": 10
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "status": "success",
    "message": "Course created successfully",
    "data": {
        "course": {
            "id": 1,
            "title": "Test course title",
            "description": "Test course description",
            "level": "intermediate",
            "price": "12.20",
            "duration": 10,
            "category": "Test course category",
            "status": "approved",
            "date_creation": "2024-10-17T18:43:25.070879Z",
            "materials": [],
            "instructor": {
                "id": 1,
                "username": "testUsername",
                "email": "test@email.com"
            }
        }
    }
}
```

#### Obtener todos los cursos

##### Método HTTP

```http
GET /api/courses/get_all
```

##### Ejemplo de solicitud

```http
Content-Type: application/json
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "Successfully earned courses",
    "data": {
        "courses": [
            {
                "id": 1,
                "title": "Test course title",
                "description": "Test course description",
                "level": "intermediate",
                "price": "12.20",
                "duration": 10,
                "category": "Test course category",
                "status": "approved",
                "date_creation": "2024-10-17T18:43:25.070879Z",
                "materials": [
                    {
                        "id": 1,
                        "type": "video",
                        "file": "/media/materials/video.mp4",
                        "title": "Introduction Video",
                        "description": "This is the introduction video for the course",
                    },
                    ...
                ]
                "instructor": {
                    "id": 1,
                    "username": "testUsername",
                    "email": "test@email.com"
                }
            },
            {
                "id": 2,
                "title": "Test course title 2",
                "description": "Test course description 2",
                "level": "advanced",
                "price": "34.99",
                "duration": 100,
                "category": "Test course category 2",
                "status": "review",
                "date_creation": "2024-10-17T21:23:15.487719Z",
                "materials": [
                    {
                        "id": 1,
                        "type": "video",
                        "file": "/media/materials/video.mp4",
                        "title": "Introduction Video",
                        "description": "This is the introduction video for the course",
                    },
                    ...
                ],
                "instructor": {
                    "id": 1,
                    "username": "testUsername",
                    "email": "test@email.com"
                }
            },
            ...
        ]
    }
}
```

#### Obtener un curso id

##### Método HTTP

```http
GET /api/courses/get/<int:course_id>
```

##### Ejemplo de solicitud

```http
Content-Type: application/json
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "Course obtained successfully.",
    "data": {
        "course": {
            "id": 1,
            "title": "Test course title",
            "description": "Test course description",
            "level": "intermediate",
            "price": "12.20",
            "duration": 10,
            "category": "Test course category",
            "status": "approved",
            "date_creation": "2024-10-17T18:43:25.070879Z",
            "materials": [
                {
                    "id": 1,
                    "type": "video",
                    "file": "/media/materials/video.mp4",
                    "title": "Introduction Video",
                    "description": "This is the introduction video for the course",
                },
                ...
            ]
            "instructor": {
                "id": 1,
                "username": "testUsername",
                "email": "test@email.com"
            }
        }
    }
}
```

#### Actualizar un curso

##### Método HTTP

```http
PUT /api/courses/update/<int:course_id>
```

##### Parámetros

| Parámetro     | Tipo      | Descripción                       |
| :------------ | :-------- | :-------------------------------- |
| `token`       | `string`  | **Requerido**. Token del usuario  |
| `course_id`   | `int`     | **Requerido**. ID del curso       |
| `title`       | `string`  | **Requerido**. Titulo del curso   |
| `description` | `string`  | Descripcion del curso             |
| `price`       | `decimal` | Precio del curso                  |
| `category`    | `string`  | Categoria del curso               |
| `level`       | `string`  | **Requerido**. Nivel del curso    |
| `status`      | `string`  | Estado del curso                  |
| `duraction`   | `int`     | **Requerido**. Duración del curso |

> **NOTA**: El parámetro `level` solo acepta los siguientes valores:
>
> - **beginner**: Indica un nivel inicial de habilidad.
> - **intermediate**: Indica un nivel intermedio de habilidad.
> - **advanced**: Indica un nivel avanzado de habilidad.

> **NOTA**: El parámetro `status` solo acepta los siguientes valores:
>
> - **draft**: El documento está en estado de borrador.
> - **review**: El documento está en revisión.
> - **approved**: El documento ha sido aprobado.
> - **rejected**: El documento ha sido rechazado.

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>

{
    "title": "Test course title update",
    "description": "Test course description update",
    "price": 12.2,
    "category": "Test course category update",
    "level": "beginner",
    "status": "draft",
    "duration": 10
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "success",
    "message": "Course updated successfully",
    "data": {
        "course": {
            "id": 1,
            "title": "Test course title update",
            "description": "Test course description update",
            "level": "beginner",
            "price": "12.20",
            "duration": 10,
            "category": "Test course category update",
            "status": "draft",
            "date_creation": "2024-10-17T18:43:25.070879Z",
            "materials": [],
            "instructor": {
                "id": 1,
                "username": "testUsername",
                "email": "test@email.com"
            }
        }
    }
}
```

#### Eliminar un curso

##### Método HTTP

```http
DELETE /api/courses/delete/<int:course_id>
```

##### Parámetros

| Parámetro   | Tipo     | Descripción                      |
| :---------- | :------- | :------------------------------- |
| `token`     | `string` | **Requerido**. Token del usuario |
| `course_id` | `int`    | **Requerido**. ID del curso      |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 204 No Content
Content-Type: application/json

{
    "status": "success",
    "message": "Successfully deleted course"
}
```

### Agregar Material a un Curso

#### Método HTTP

```http
POST /api/courses/<course_id>/materials
```

##### Parámetros

| Parámetro     | Tipo     | Descripción                                   |
| :------------ | :------- | :-------------------------------------------- |
| `token`       | `string` | **Requerido**. Token del usuario              |
| `course_id`   | `int`    | **Requerido**. ID del curso                   |
| `title`       | `string` | **Requerido**. Titulo del material del curso  |
| `type`        | `string` | **Requerido**. Tipo del material del curso    |
| `file`        | `file`   | **Requerido**. Archivo del material del curso |
| `description` | `string` | Descripcion del material del curso            |

> **NOTA**: El parámetro `type` solo acepta los siguientes valores:
>
> - **pdf**: Indica un archivo .pdf.
> - **video**: Indica un arhcivo .mp4.
> - **other**: Indica un archivo .JPEG y .PNG.

#### Ejemplo de solicitud

```http
Content-Type: multipart/form-data
Authorization: Token <token>

{
    "type": "video",
    "title": "Introduction Video",
    "description": "This is the introduction video for the course",
    "file": [Selecciona el archivo]
}
```

#### Ejemplo de respuesta exitosa

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "status": "success",
    "message": "Material added successfully",
    "data": {
        "id": 1,
        "type": "video",
        "file": "/media/materials/video.mp4",
        "title": "Introduction Video",
        "description": "This is the introduction video for the course",
    }
}
```

### Eliminar Material de un Curso

#### Método HTTP

```http
DELETE /api/courses/<course_id>/materials/<material_id>
```

#### Ejemplo de solicitud

```http
Authorization: Token <token>
```

#### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "success",
    "message": "Material deleted successfully."
}
```

### Inscripciones

| Nombre                                          | Método   | Url                              | Descripción                             |
| ----------------------------------------------- | -------- | -------------------------------- | --------------------------------------- |
| [Crear Inscripción](#crear-una-inscripción)     | `POST`   | `/api/inscriptions/create/`      | Crea una nueva inscripción.             |
| [Listar Inscripciones](#listar-inscripciones)   | `GET`    | `/api/inscriptions/get_all/`     | Obtiene todas las inscripciones.        |
| [Eliminar Inscripción](#eliminar-inscripciones) | `DELETE` | `/api/inscriptions/delete/<id>/` | Elimina una inscripción mediante su ID. |

#### Crear Inscripción

##### Método HTTP

```http
POST /api/inscriptions/create/
```

##### Parámetros

| Parámetro   | Tipo     | Descripción                                                             |
| ----------- | -------- | ----------------------------------------------------------------------- |
| `user`      | `int`    | **Requerido**. ID del usuario.                                          |
| `course_id` | `int`    | **Requerido**. ID del curso.                                            |
| `status`    | `string` | **Requerido**. Estado de la inscripción (pendiente, pagado, cancelado). |

##### Ejemplo de solicitud

```http
Content-Type: application/json

{
    "user": 1,
    "course_id": 2,
    "status": "pending"
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 201 Created Content-Type: application/json

{
    "id": 1,
    "user": 1,
    "course_id": 2,
    "status": "pending",
    "date_created": "2024-10-20T00:00:00Z"
}
```

#### Listar Inscripciones

##### Método HTTP

```http
GET /api/inscriptions/get_all/
```

##### Ejemplo de solicitud

```http
Content-Type: application/json
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 OK Content-Type: application/json

{
    "inscriptions": [
        {
            "id": 1,
            "user": 1,
            "course_id": 2,
            "status": "pending",
            "date_created": "2024-10-20T00:00:00Z"
        },
        ...
    ]
}
```

#### Eliminar Inscripción

##### Método HTTP

```http
DELETE /api/inscriptions/delete/<id>/
```

##### Ejemplo de solicitud

```http
Content-Type: application/json
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 204 No Content
```

### Pagos

| Nombre                                                  | Método | Url                     | Descripción               |
| :------------------------------------------------------ | :----- | :---------------------- | :------------------------ |
| [Hacer un pago de un curso](#hacer-un-pago-de-un-curso) | `POST` | `/api/payments/create`  | Hace un pago de un curso. |
| [Obtener todos los pagos](#obtener-todos-los-pagos)     | `GET`  | `/api/payments/get_all` | Obtiene todos los pagos.  |

#### Hacer un pago de un curso

##### Método HTTP

```http
POST /api/payments/create
```

##### Parámetros

| Parámetro        | Tipo      | Descripción                           |
| :--------------- | :-------- | :------------------------------------ |
| `token`          | `string`  | **Requerido**. Token de autenticación |
| `user`           | `int`     | **Requerido**. ID del usuario         |
| `course`         | `int`     | **Requerido**. ID del curso           |
| `payment_method` | `string`  | **Requerido**. Metodo de pago         |
| `amount`         | `decimal` | **Requerido**. monto del pago         |

> **NOTA**: El parámetro `payment_method` solo acepta los siguientes valores:
>
> - **paypal**: Indica un pago realizado con paypal.
> - **transfer**: Indica un pago realizado con transferencia.
> - **credit card**: Indica un pago realizado con tarjeta de credito.

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>

{
  "user": 2,
  "course": 1,
  "payment_method": "paypal",
  "amount": 34.99
}
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
  "status": "success",
  "message": "payment created successfully",
  "data": {
    "payments": {
      "id": 1,
      "identifier": "#PAY0001",
      "payment_date": "2024-10-25T16:43:25.143931Z",
      "payment_method": "paypal",
      "amount": "34.99",
      "user": 2,
      "course": 1
    }
  }
}
```

#### Obtener todos los pagos

##### Método HTTP

```http
GET /api/payments/get_all
```

##### Parámetros

| Parámetro | Tipo     | Descripción                           |
| :-------- | :------- | :------------------------------------ |
| `token`   | `string` | **Requerido**. Token de autenticación |

##### Ejemplo de solicitud

```http
Content-Type: application/json
Authorization: Token <token>
```

##### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "message": "payments obtained correctly",
    "data": {
        "payments": [
            {
                "id": 1,
                "user": {
                "id": 2,
                "username": "josefina",
                "email": "josefina@gy.com",
                "date_joined": "2024-10-23T18:30:39.332627Z"
            },
            "course": {
                "id": 1,
                "title": "Test course title",
                "description": "Test course description",
                "level": "intermediate",
                "price": "34.99",
                "duration": 120,
                "category": "Test course category",
                "status": "approved",
                "date_creation": "2024-10-23T18:32:59.362865Z",
                "materials": [
                    {
                        "id": 2,
                        "type": "pdf",
                        "file": "/media/materials/hiragana_writing_practice_sheets.pdf",
                        "title": "prueba titulo",
                        "description": "prueba de descripcion"
                    }
                ],
                "instructor": {
                    "id": 2,
                    "username": "josefina",
                    "email": "josefina@gy.com"
                }
            },
            "payment_date": "2024-10-25T16:43:25.143931Z",
            "payment_method": "paypal",
            "amount": "34.99",
            "identifier": "#PAY0001"
            }
        ]
    }
}
```
