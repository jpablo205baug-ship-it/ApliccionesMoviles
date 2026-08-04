//memoria de la aplicacion 
import {userState} from 'react';
import { Button } from 'react-native/types_generated/index';

import{
  stylesheet,
  text,
  view,
  textInput,
  button,
  Flatlist,
  TouchableOpacity
} from 'react.native';

export default function App(){
  //Zona de estados
  const [tarea, setTarea] = userState('');
  const [listaTareas, setListaTareas] = userState([]);


  //Zona de logica
  const agregarTarea = () => {
    if(tarea.trim() == '') return;

    setListaTareas([...listaTareas,{id: Date.now().toString(), texto: tarea}])

    setTarea('');
  };

  //Zona de renderizado
  return (
    <view>style = {styles.contenedor}
    
      <text style={stylesheet.titulo}>mis Tareas Pendientes</text>

      <view> style = {styles.formulario}

        <textInput
          style = {style.input}
          placeholder = "Escribe una tarea..."

          onChangeText = {setTarea}
        />

        <Button
          tittle = "Agregar"
          onPress = {agregarTarea}
          color = "#000000"
        ></Button>

      </view>

      <Flatlist
        data={listaTareas}

        keyExtrator = {(item) => item.id}

        renderItem = {({item}) =>(
          <TouchableOpacity style = {style.texto}>



          </TouchableOpacity>


        )
      />
    
    </view>

  )
}

const styles = stylesheet.create({
  contenedor: {
    flex: 1,
    blackgroundcolor:

  },
  titulo: {
    
  },

})