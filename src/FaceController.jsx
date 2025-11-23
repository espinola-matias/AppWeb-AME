import { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const FaceController = ({ onEmergency }) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Refs para elementos DOM
  const videoRef = useRef(null);
  const cursorRef = useRef(null);
  
  // Refs para lógica interna (Persisten sin provocar re-renders)
  const faceLandmarkerRef = useRef(null);
  const animationIdRef = useRef(null);
  const streamRef = useRef(null);
  const isInitializingRef = useRef(false); // CANDADO IMPORTANTE

  // --- CONFIGURACIÓN ---
  const SENSIBILIDAD = 3.0; 
  const SUAVIZADO = 0.15;   
  const UMBRAL_EAR_CLICK = 0.27; 
  const TIEMPO_PARA_CLICK = 300; 
  
  // 👄 CONFIGURACIÓN BOCA Y SCROLL
  const UMBRAL_BOCA_ABIERTA = 0.45; 
  const TIEMPO_EMERGENCIA = 3500;   
  const ZONA_SCROLL = 10;          
  const VELOCIDAD_SCROLL = 15;      

  const logicState = useRef({
    prevX: window.innerWidth / 2,
    prevY: window.innerHeight / 2,
    inicioGuino: 0,
    inicioBoca: 0,        
    clickHecho: false,
    lastVideoTime: -1
  });

  useEffect(() => {
    // Si ya estamos inicializando o ya terminamos, no hacer nada (Evita doble carga en React 18)
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    const iniciarSistema = async () => {
      try {
        console.log(">>> INICIANDO SISTEMA DE VISIÓN...");
        
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        
        // Asignamos al REF, no a una variable local
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "CPU"
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1
        });

        console.log(">>> MODELO IA CARGADO");
        setLoading(false);
        startWebcam(); // Solo iniciamos cámara si la IA cargó bien

      } catch (error) {
        console.error(">>> ERROR FATAL EN IA:", error);
        setErrorMessage(error.message);
        setLoading(false);
        isInitializingRef.current = false; // Permitir reintento si falla
      }
    };

    iniciarSistema();

    // LIMPIEZA AL DESMONTAR EL COMPONENTE
    return () => {
        console.log(">>> LIMPIANDO SISTEMA...");
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        
        if (faceLandmarkerRef.current) {
            faceLandmarkerRef.current.close();
            faceLandmarkerRef.current = null;
        }
        // No reseteamos isInitializingRef a false aquí para evitar recargas fantasma
    };
  }, []); // Array vacío = Solo al montar

  const startWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Forzamos el play explícitamente
          videoRef.current.play();

          // No esperamos al evento 'loadeddata' ciegamente.
          // Escuchamos el evento por si acaso, pero TAMBIÉN arrancamos manual.
          videoRef.current.addEventListener("loadeddata", predictWebcam);
          
          // Arrancamos el loop inmediatamente (esperando un poco a que haya datos)
          setTimeout(() => predictWebcam(), 1000);
        }
      })
      .catch(err => {
          console.error(">>> ERROR CÁMARA:", err);
          setErrorMessage("Error de cámara: " + err.message);
      });
  };

  const predictWebcam = () => {
    // Verificaciones de seguridad
    if (!videoRef.current || !faceLandmarkerRef.current || !streamRef.current) {
        // Si falta algo, reintentamos en el siguiente frame (no matamos el loop)
        animationIdRef.current = window.requestAnimationFrame(predictWebcam);
        return;
    }

    let startTimeMs = performance.now();
    
    if (videoRef.current.currentTime !== logicState.current.lastVideoTime) {
      logicState.current.lastVideoTime = videoRef.current.currentTime;
      
      try {
          const results = faceLandmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);
          
          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            // ¡ROSTRO DETECTADO!
            procesarRostro(results.faceLandmarks[0]);
          } else {
          }
      } catch (e) {
          console.warn("Error en detección:", e);
      }
    }
    
    // Mantenemos la rueda girando
    animationIdRef.current = window.requestAnimationFrame(predictWebcam);
  };

  const calcularDistancia = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

  const procesarRostro = (mesh) => {
    if (!cursorRef.current) return; // Seguridad extra

    const state = logicState.current;
    const anchoPant = window.innerWidth;
    const altoPant = window.innerHeight;

    // --- 1. MOUSE ---
    const nariz = mesh[4];
    // Invertimos X para efecto espejo natural
    const cx = (1 - nariz.x) - 0.5; 
    const cy = nariz.y - 0.5;

    let targetX = (anchoPant / 2) + (cx * anchoPant * SENSIBILIDAD);
    let targetY = (altoPant / 2) + (cy * altoPant * SENSIBILIDAD);

    targetX = Math.max(5, Math.min(anchoPant - 5, targetX));
    targetY = Math.max(5, Math.min(altoPant - 5, targetY));

    const currX = state.prevX + (targetX - state.prevX) * SUAVIZADO;
    const currY = state.prevY + (targetY - state.prevY) * SUAVIZADO;

    cursorRef.current.style.transform = `translate(${currX}px, ${currY}px)`;
    
    state.prevX = currX;
    state.prevY = currY;

    // --- 2. SCROLL ---
    if (currY < ZONA_SCROLL) {
        window.scrollBy(0, -VELOCIDAD_SCROLL);
        cursorRef.current.style.backgroundColor = "cyan"; 
    } else if (currY > altoPant - ZONA_SCROLL) {
        window.scrollBy(0, VELOCIDAD_SCROLL);
        cursorRef.current.style.backgroundColor = "cyan";
    } else {
        cursorRef.current.style.backgroundColor = "red"; 
    }

    // --- 3. CLICK (OJO) ---
    const pArriba = mesh[159];
    const pAbajo = mesh[145];
    const pIzq = mesh[33];
    const pDer = mesh[133];
    const ear = calcularDistancia(pArriba, pAbajo) / calcularDistancia(pIzq, pDer);

    if (ear < UMBRAL_EAR_CLICK) {
        if (state.inicioGuino === 0) state.inicioGuino = Date.now();
        
        const duracion = Date.now() - state.inicioGuino;
        cursorRef.current.style.backgroundColor = "yellow"; 

        if (duracion > TIEMPO_PARA_CLICK && !state.clickHecho) {
            ejecutarClick(currX, currY);
            state.clickHecho = true;
            cursorRef.current.style.backgroundColor = "green";
        }
    } else {
        state.inicioGuino = 0;
        state.clickHecho = false;
    }

    // --- 4. EMERGENCIA (BOCA) ---
    const alturaBoca = calcularDistancia(mesh[13], mesh[14]);
    const anchoBoca = calcularDistancia(mesh[61], mesh[291]);
    const ratioBoca = alturaBoca / anchoBoca;

    if (ratioBoca > UMBRAL_BOCA_ABIERTA) {
        if (state.inicioBoca === 0) state.inicioBoca = Date.now();
        
        const duracionBoca = Date.now() - state.inicioBoca;
        const progreso = Math.min(duracionBoca / TIEMPO_EMERGENCIA, 1);
        
        cursorRef.current.style.transform = `translate(${currX}px, ${currY}px) scale(${1 + progreso * 3})`;
        cursorRef.current.style.backgroundColor = "purple";

        if (duracionBoca > TIEMPO_EMERGENCIA) {
             console.log("🚨 EMERGENCIA ACTIVADA");
             if (onEmergency) onEmergency(); 
             state.inicioBoca = Date.now() + 5000; 
        }
    } else {
        state.inicioBoca = 0;
    }
  };

  const ejecutarClick = (x, y) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.display = 'none';
    const elemento = document.elementFromPoint(x, y);
    if (elemento) {
        elemento.click();
        elemento.focus();
    }
    cursorRef.current.style.display = 'block';
  };

  return (
    <>
      {/* CÁMARA FLOTANTE */}
      <div className="fixed bottom-4 right-4 w-48 bg-black rounded-lg overflow-hidden border-2 border-blue-500 z-50 opacity-90 shadow-lg">
        <video 
            ref={videoRef} 
            className="w-full h-32 object-cover transform -scale-x-100"
            autoPlay 
            playsInline 
            muted
        />
        <div className="bg-black/80 text-white text-[10px] p-1 text-center font-mono">
            {loading ? "⌛ Cargando IA..." : "🟢 Sistema Activo"}
            {errorMessage && <span className="text-red-500 block font-bold text-xs mt-1">{errorMessage}</span>}
        </div>
      </div>

      {/* CURSOR VISUAL */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-xl z-[9999] pointer-events-none transition-transform duration-75"
        style={{ transform: 'translate(-100px, -100px)' }} 
      />
    </>
  );
};