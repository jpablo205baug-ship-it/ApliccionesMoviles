// importamos la funcion principal para arrancar el motor de firebase
import { initializeApp } from 'firebase/app';
// importamos las herramientas de autenticacion y el persistidor para react native
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// importamos asyncstorage (que aprendimos en la practica 11) para usar el disco duro
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// =========================================================
// reto 1: credenciales de firebase
// =========================================================
// instrucciones: este objeto es tu identificacion oficial en la nube.
// borra las frases "pega_aqui" y reemplazalas con las llaves de tu proyecto.
// copialas de la consola web de firebase (paso 4 de las instrucciones).

const firebaseConfig = {
  apiKey: "AIzaSyC4PCK1mWB5bJto4TvbT5J_-_TFTd71o28",
  authDomain: "practica12-auth-6b52e.firebaseapp.com",
  projectId: "practica12-auth-6b52e",
  storageBucket: "practica12-auth-6b52e.firebasestorage.app",
  messagingSenderId: "442203462755",
  appId: "1:442203462755:web:c5d29f13fa2e371bc0ac56"
};
// =========================================================

// arrancamos la aplicacion de firebase usando nuestras llaves
const app = initializeApp(firebaseConfig);

// inicializamos la autenticacion de una forma especial:
// le estamos diciendo a firebase que no guarde la sesion en la memoria ram,
// sino que utilice asyncstorage para grabar el token en el disco fisico del telefono.
// exportamos 'auth' para poder usarlo en nuestras pantallas de login y registro.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});