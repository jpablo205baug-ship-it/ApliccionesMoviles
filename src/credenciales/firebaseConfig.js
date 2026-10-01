import { initializeApp } from 'firebase/app';
// importamos unicamente firestore (ya no usamos storage por el cobro)
import { getFirestore } from 'firebase/firestore';

// =========================================================
// reto 1: credenciales de firebase
// =========================================================
const firebaseConfig = {
  apiKey: "AIzaSyAjDsVmjQP5V7kHNOhogk5tPLSzx6N0usE",
  authDomain: "practica13-perfil-42cbf.firebaseapp.com",
  projectId: "practica13-perfil-42cbf",
  storageBucket: "practica13-perfil-42cbf.firebasestorage.app",
  messagingSenderId: "154261944649",
  appId: "1:154261944649:web:34543cdc617f665528c298"
};
// =========================================================

const app = initializeApp(firebaseConfig);

// inicializamos y exportamos firestore
export const db = getFirestore(app);