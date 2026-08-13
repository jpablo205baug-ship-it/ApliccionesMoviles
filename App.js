import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  Button // 1. Solución: Importar Button
} from 'react-native';

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('registro');

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    descargarEmpleados();
  }, []);

  const descargarEmpleados = async () => {
    try {
      const respuesta = await fetch("https://randomuser.me/api/?results=5");
      const json = await respuesta.json();

      const empleadosAdaptados = json.results.map((user) => ({
        id: user.login.uuid,
        nombre: `${user.name.first} ${user.name.last}`,
        correo: user.email,
        telefono: user.phone,
        imagen: user.picture.large
      }));

      setEmpleados(empleadosAdaptados);
      setCargando(false);
    } catch (error) {
      console.error("Hubo un problema descargando los datos: ", error);
      setCargando(false);
    }
  };

  const agregarEmpleadoManual = () => {
    if (!nombre.trim() || !correo.trim() || !telefono.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Error', 'Ingresa un correo electrónico válido.');
      return;
    }

    if (telefono.length !== 10) {
      Alert.alert('Error', 'El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    const nuevoEmpleado = {
      id: Date.now().toString(),
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      imagen: `https://i.pravatar.cc/150?u=${Date.now()}`
    };

    setEmpleados([nuevoEmpleado, ...empleados]);

    Alert.alert('¡Registro Exitoso!', `Hola ${nombre}, tu cuenta ha sido creada.`);

    setNombre('');
    setCorreo('');
    setTelefono('');
  };

  if (cargando) {
    return (
      <View style={styles.pantallaCentrada}>
        <ActivityIndicator size="large" color="#005691" />
        <Text style={styles.textoCarga}>Descargando Empleados...</Text>
      </View>
    );
  } // Faltaba cerrar esta llave

  if (pantallaActual === 'lista') {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.tituloPrincipal}>Lista de Empleados</Text>
        <View style={styles.espaciadoBoton}>
          <Button title="Nuevo empleado" onPress={() => setPantallaActual('registro')} color="#28a745" />
        </View>

        <FlatList
          data={empleados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarjetaEmpleado}>
              <Image
                source={{ uri: item.imagen }} 
                style={styles.imagenPerfil}
              />

              <View style={styles.infoEmpleado}>
                {/* 8. Solución: Ajuste de nombres de estilos para que coincidan con el StyleSheet */}
                <Text style={styles.nombreEmpleado}>{item.nombre}</Text>
                <Text style={styles.textoDetalle}>{item.correo}</Text>
                <Text style={styles.textoDetalle}>{item.telefono}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Crear Empleado</Text>

      <Text style={styles.etiqueta}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Juan Pérez"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.etiqueta}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        placeholder="juan@gmail.com"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.etiqueta}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        placeholder="10 dígitos"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <View style={styles.espaciadoBoton}>
        <Button title="Registrar Empleado" onPress={agregarEmpleadoManual} color="#1ad320" />
      </View>
      <Button title="Ver Empleados" onPress={() => setPantallaActual('lista')} color="#005691" />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  pantallaCentrada: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  textoCarga: {
    marginTop: 15,
    fontSize: 16,
    color: '#555'
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15
  },
  espaciadoBoton: {
    marginBottom: 15
  },
  tarjetaEmpleado: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  imagenPerfil: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15
  },
  infoEmpleado: {
    flex: 1,
    justifyContent: 'center'
  },
  nombreEmpleado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  textoDetalle: {
    fontSize: 14,
    color: '#555',
    marginTop: 3
  }
});