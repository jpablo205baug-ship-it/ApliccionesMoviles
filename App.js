import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,       
  View,       
  FlatList,
  Image, 
  ActivityIndicator
} from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    descargarUsuarios();
  }, []);

  // Función que se conecta a internet (Async/Await)
  const descargarUsuarios = async () => {
    try {
      // Petición a la base de datos pública
      const respuesta = await fetch("https://randomuser.me/api/?results=10");
      // Conversión a formato JSON
      const json = await respuesta.json();

      // Guardamos la lista de usuarios en la memoria de la app
      setUsuarios(json.results);
      // Apagamos la rueda de carga
      setCargando(false);
    } catch (error) {
      console.error("Hubo un problema descargando los datos: ", error);
      setCargando(false);
    }
  };

  // Pantalla de Carga
  // Si 'cargando' es true, mostramos una rueda nativa del celular
  if (cargando) {
    return (
      <View style={styles.pantallaCentrada}>
        <ActivityIndicator size="large" color="#005691" />
        <Text style={styles.textoCarga}>Descargando Perfiles...</Text>
      </View>
    );
  }

  // Pantalla Principal (Lista con Datos)
  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Directorio Global</Text>

      <FlatList
        data={usuarios}
        // La API de Random User usa un email unico, nos sirve como ID
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.tarjetaUsuario}>
            <Image
              source={{ uri: item.picture.large }}
              style={styles.imagenPerfil}
            />

            <View style={styles.infoUsuario}>
              <Text style={styles.nombreUsuario}>
                {item.name.first} {item.name.last}
              </Text>
              <Text style={styles.correoUsuario}>{item.email}</Text>
              <Text style={styles.paisUsuario}>📍{item.location.country}</Text>
            </View>

          </View>
        )}
      /> 
    </View>
  );
}

// Estilos Visuales
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  pantallaCentrada: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textoCarga: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  tituloPrincipal: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  tarjetaUsuario: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,   // Sombras en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagenPerfil: {
    width: 70,
    height: 70,
    borderRadius: 35, // La mitad de width y height para obtener un circulo perfecto
    marginRight: 15,
  },
  infoUsuario: {
    flex: 1,  // Toma el espacio restante a la derecha de la imagen
    justifyContent: 'center',
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  correoUsuario: {
    fontSize: 14,
    color: '#005691',
    marginBottom: 4,
  },
  paisUsuario: {
    fontSize: 14,
    color: '#777'
  }
});