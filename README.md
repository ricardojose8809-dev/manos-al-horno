# 🍰 Manos al horno

Sitio web de **Manos al horno**, un emprendimiento de postres artesanales enfocado en ofrecer porciones individuales (*slices*) y postres completos.

La aplicación permite consultar el catálogo de productos, visualizar precios y presentaciones, agregar productos al carrito y gestionar pedidos.

🌐 **Sitio en producción:**  
https://manos-al-horno.vercel.app/

## 🚀 Tecnologías utilizadas

El proyecto está desarrollado utilizando:

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Supabase** — Backend y base de datos
- **Resend** — Envío de correos electrónicos
- **Vercel** — Hosting y despliegue
- **pnpm** — Gestor de paquetes

## 📋 Descripción del proyecto

**Manos al horno** es una aplicación web creada para presentar y gestionar el catálogo de productos de un emprendimiento de postres artesanales.

El catálogo está dividido principalmente en:

- 🍰 Slices o porciones individuales
- 🎂 Postres completos

Entre los productos disponibles se encuentran cheesecake, budín, pastel de zanahoria, brownie, tiramisú y banana bread.

La aplicación utiliza **Supabase** como backend para almacenar y consultar información y **Resend** para las funcionalidades relacionadas con el envío de correos electrónicos y notificaciones de pedidos.

El frontend está desarrollado con **Next.js y React**, utilizando **TypeScript** y **Tailwind CSS** para mantener una interfaz moderna, responsiva y fácil de mantener.

## 📦 Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/ricardojose8809-dev/manos-al-horno.git
```

Entrar al directorio del proyecto:

```bash
cd manos-al-horno
```

### 2. Instalar pnpm

El proyecto utiliza **pnpm** como gestor de paquetes.

Si todavía no lo tienes instalado:

```bash
npm install -g pnpm
```

Puedes comprobar la instalación con:

```bash
pnpm --version
```

### 3. Instalar las dependencias

```bash
pnpm install
```

### 4. Configurar las variables de entorno

Crea un archivo:

```text
.env.local
```

en la raíz del proyecto.

Agrega las variables necesarias para conectar la aplicación con Supabase y Resend.

Ejemplo:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Correo receptor de pedidos
PEDIDOS_EMAIL_TO=your_orders_email@example.com
```

> ⚠️ Nunca publiques las credenciales o direcciones privadas reales del proyecto en GitHub.

El archivo `.env.local` debe permanecer fuera del control de versiones.

## 🔐 Variables de entorno

| Variable | Descripción | Exposición |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase | Cliente |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública/anon de Supabase | Cliente |
| `RESEND_API_KEY` | API Key utilizada para enviar correos mediante Resend | Solo servidor |
| `PEDIDOS_EMAIL_TO` | Dirección de correo electrónico que recibe las notificaciones de nuevos pedidos | Solo servidor |

### Importante

Las variables que comienzan con:

```text
NEXT_PUBLIC_
```

pueden estar disponibles en el navegador.

Por esta razón, **nunca deben almacenarse claves privadas o administrativas utilizando el prefijo `NEXT_PUBLIC_`**.

Las variables:

```text
RESEND_API_KEY
PEDIDOS_EMAIL_TO
```

deben utilizarse únicamente desde código ejecutado en el servidor.

`RESEND_API_KEY` permite autenticar las solicitudes realizadas a Resend, mientras que `PEDIDOS_EMAIL_TO` determina la dirección de correo electrónico a la que se enviarán las notificaciones relacionadas con los pedidos.

Si posteriormente el proyecto utiliza una clave administrativa de Supabase, como una `service_role` o secret key, esta también deberá permanecer exclusivamente del lado del servidor y nunca utilizar el prefijo `NEXT_PUBLIC_`.

## ▶️ Ejecutar el proyecto

Una vez configuradas las variables de entorno:

```bash
pnpm dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```

## 🏗️ Compilar para producción

Para generar el build de producción:

```bash
pnpm build
```

Para ejecutar posteriormente el servidor de producción:

```bash
pnpm start
```

## 🔎 Lint

Para ejecutar ESLint:

```bash
pnpm lint
```

## ☁️ Deploy

El proyecto está desplegado utilizando **Vercel**.

Producción:

https://manos-al-horno.vercel.app/

Para que el envío de correos y la conexión con Supabase funcionen correctamente en producción, las variables de entorno también deben configurarse en el proyecto de Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
PEDIDOS_EMAIL_TO
```

Los valores reales de estas variables **no deben almacenarse dentro del repositorio**.

Después de agregar o modificar variables de entorno en Vercel puede ser necesario realizar un nuevo deployment para que los cambios sean aplicados.

## 🔒 Seguridad

Para evitar la exposición accidental de información sensible:

- No subir archivos `.env` o `.env.local` al repositorio.
- No exponer `RESEND_API_KEY` en componentes del cliente.
- Mantener `PEDIDOS_EMAIL_TO` del lado del servidor.
- No utilizar claves administrativas de Supabase en el frontend.
- Mantener las credenciales de producción configuradas únicamente en Vercel.
- Utilizar las políticas de seguridad de Supabase (**Row Level Security / RLS**) cuando corresponda.

## 📁 Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:

https://github.com/ricardojose8809-dev/manos-al-horno

---

### Manos al horno

**Tu porción, tu momento.** 🍰