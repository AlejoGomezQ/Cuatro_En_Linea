# Konect4: Juego Cuatro en Línea

## Descripción

**Konect4** es una aplicación móvil que reinterpreta el clásico juego de estrategia *Conecta 4*. Desarrollada con tecnologías web modernas, esta aplicación permite a los usuarios disfrutar de partidas estratégicas, cuyo objetivo es alinear cuatro fichas del mismo color antes que el oponente, en un tablero vertical.

## Características principales

- Autenticación de usuarios (registro, inicio de sesión y verificación por correo electrónico).
- Gestión de perfiles de usuario.
- Múltiples modos de juego:
  - Contra inteligencia artificial (Fácil, Medio, Difícil).
  - Multijugador local.
  - Multijugador en línea (en desarrollo).
- Interfaz responsiva y de diseño moderno.
- Animaciones y efectos visuales para una experiencia atractiva.

## Tecnologías utilizadas

- **Frontend:** React.js, Framer Motion  
- **Estilos:** Tailwind CSS  
- **Autenticación y base de datos:** Firebase (Authentication, Firestore)  
- **Routing:** React Router  
- **Alertas:** SweetAlert2  
- **Herramientas de desarrollo:** Vite

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (v14.0 o superior)
- npm (v6.0 o superior) o Yarn (v1.22 o superior)
- Cuenta en Firebase
- Navegador compatible con ES6+

## Guía de uso

### Registro e inicio de sesión

1. Abre la aplicación y selecciona la opción "Registrarse".
2. Completa el formulario con la siguiente información:
   - Nombre y apellido
   - Correo electrónico
   - Número de teléfono
   - Contraseña segura (mínimo 6 caracteres con letras mayúsculas, minúsculas, números y símbolos)
3. Verifica tu correo electrónico mediante el enlace recibido.
4. Inicia sesión con tu correo y contraseña.

### Navegación principal

Una vez iniciada la sesión, el usuario podrá:

- Seleccionar un modo de juego
- Jugar contra un amigo
- Competir contra la inteligencia artificial

### Modos de juego

- **Versus IA:** Selecciona nivel de dificultad (Fácil, Medio o Difícil).
- **Multijugador local:** Juega por turnos desde el mismo dispositivo.
- **Multijugador en línea:** Juega con otros usuarios conectados (funcionalidad en desarrollo).

### Mecánicas del juego

- **Tablero:** 7 columnas × 6 filas.
- **Objetivo:** Alinear 4 fichas consecutivas del mismo color.
- **Direcciones válidas para alinear:**
  - Horizontal
  - Vertical
  - Diagonal ascendente
  - Diagonal descendente
- **Reglas de juego:**
  - Turnos alternos entre jugadores.
  - Las fichas se colocan en la posición más baja disponible de cada columna.
  - Si se llena el tablero sin un ganador, la partida termina en empate.

## Instalación

Sigue los siguientes pasos para ejecutar la aplicación en tu entorno local:

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/Konect4.git

# Acceder al directorio del proyecto
cd Konect4

# Instalar las dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm run dev

