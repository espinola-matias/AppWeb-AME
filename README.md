# 🧬 SMA LifeLink - Autonomía Digital para Pacientes con AME

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision_AI-blue?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)

> **Una plataforma de asistencia tecnológica diseñada específicamente para devolver la independencia digital a personas con Atrofia Muscular Espinal (AME/SMA) mediante el control por mirada y gestos faciales.**

---

## 🦾 El Desafío: ¿Por qué AME?

La **Atrofia Muscular Espinal (AME)** es una enfermedad neurodegenerativa que debilita progresivamente la fuerza muscular. Para muchos pacientes (especialmente Tipo 1 y 2), el uso de periféricos tradicionales como teclados, ratones o pantallas táctiles se vuelve imposible debido a la pérdida de movilidad en brazos y manos.

Sin embargo, **la mayoría de los pacientes conservan el control de los músculos faciales y oculares.**

**SMA LifeLink** nace para cerrar esa brecha. Transforma los micromovimientos de la cabeza y gestos faciales sutiles en comandos digitales precisos, permitiendo al usuario navegar sin esfuerzo físico y sin hardware costoso.

---

## ✨ Características de Accesibilidad

Diseñado pensando en la **fatiga muscular mínima**:

### 🧠 Navegación sin Manos (FaceController)
- **Cursor de Mínimo Esfuerzo:** Sensibilidad calibrada para que pequeños giros de cabeza cubran toda la pantalla.
- **Click por Guiño (EAR):** Detección de *Eye Aspect Ratio* para diferenciar parpadeos naturales de clicks intencionales.
- **Scroll "Anti-Vibración":** Sistema inteligente que detecta la mirada en los bordes con velocidad dinámica, evitando saltos bruscos que cansan la vista.
- **Sistema de Emergencia SOS:** Detección de apertura de boca sostenida (4s) para enviar alertas críticas si el paciente no puede hablar o moverse.

### 🏥 Ecosistema de Salud Integral
- **Modo Dual:** Interfaces separadas para Pacientes (UX simplificada) y Cuidadores (Dashboard de gestión).
- **Mapa de Dolor Interactivo:** Registro visual de zonas afectadas.
- **Gestión de Medicación:** Recordatorios para tratamientos complejos (ej. Spinraza, Risdiplam).
- **Comunidad AME:** Feed social adaptado para combatir el aislamiento social.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 18 (Arquitectura basada en componentes).
* **IA / Computer Vision:** Google MediaPipe Face Landmarker (WASM) corriendo en el navegador (Edge Computing) para privacidad total.
* **Estilos:** Tailwind CSS (Diseño adaptable y de alto contraste).
* **Matemáticas:** Algoritmos de geometría euclidiana para normalización de coordenadas y suavizado de movimiento (Lerp).

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para probar el proyecto en tu máquina:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/sma-lifelink.git](https://github.com/TU_USUARIO/sma-lifelink.git)
    cd sma-lifelink
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visita `http://localhost:5173`. Asegúrate de dar permisos de cámara cuando el navegador lo solicite.

---

## 🤓 Deep Dive: El Algoritmo de Control

El corazón del proyecto es el componente `FaceController.jsx`, optimizado para evitar latencia:

1.  **Mapeo Facial:** Usamos MediaPipe para rastrear 478 puntos faciales a 30fps.
2.  **Lógica de "Zona Muerta":** Implementamos zonas de tolerancia para evitar que el cursor tiemble involuntariamente, crucial para usuarios con bajo control motor.
3.  **Cálculo de Distancias:**
    ```javascript
    // Ejemplo: Detección de apertura de boca para emergencia
    const alturaBoca = calcularDistancia(mesh[13], mesh[14]);
    const ratio = alturaBoca / anchoBoca; // Normalización independiente de la distancia a la cámara
    ```

---

## 🗺️ Roadmap

- [ ] Integración con APIs de mensajería (WhatsApp/Telegram) para alertas a cuidadores.
- [ ] Calibración personalizada de sensibilidad según el grado de movilidad del paciente.
- [ ] Teclado virtual predictivo controlado por la mirada.
- [ ] Backend seguro para historial médico.
