// Type assertion for Firebase SDK loaded from window
const { initializeApp } = (window as any).firebase.app;
const { getFirestore } = (window as any).firebase.firestore;

// =================================================================
// TODO: COPIA Y PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE
// =================================================================
// 1. Ve a la consola de Firebase de tu proyecto.
// 2. Ve a "Project Settings" (icono de engranaje).
// 3. En la pestaña "General", en la sección "Tus apps", busca tu app web.
// 4. Selecciona "Config" y copia el objeto completo.
// 5. Pega el objeto aquí abajo, reemplazando el de ejemplo.
// =================================================================
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
