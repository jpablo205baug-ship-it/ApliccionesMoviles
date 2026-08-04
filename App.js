// Practica 2
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';

export default function App() {
  // Zona de estados
  const [tarea, setTarea] = useState('');
  const [listaTareas, setListaTareas] = useState([]);

  // Zona de lógica
  const agregarTarea = () => {
    if (tarea.trim() === '') return;

    setListaTareas([...listaTareas, { id: Date.now().toString(), texto: tarea }]);
    setTarea(''); // Limpia el input
  };

  // Función extra: eliminar tarea al tocarla
  const eliminarTarea = (id) => {
    setListaTareas(listaTareas.filter((item) => item.id !== id));
  };

  // Zona de renderizado
  return (
    <View style={styles.contenedor}>
      
      <Text style={styles.titulo}>Mis Tareas Pendientes</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea..."
          value={tarea} // Enlaza el valor del input al estado
          onChangeText={setTarea}
        />

        <Button
          title="Agregar"
          onPress={agregarTarea}
          color="#000000"
        />
      </View>

      <FlatList
        data={listaTareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.tareaItem}
            onPress={() => eliminarTarea(item.id)}
          >
            <Text style={styles.textoTarea}>{item.texto}</Text>
          </TouchableOpacity>
        )}
      />
    
    </View>
  );
}

// Zona de estilos
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formulario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  tareaItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // Sombra para Android
  },
  textoTarea: {
    fontSize: 16,
    color: '#000',
  },
});