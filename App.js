import React, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import TaskList from '/src/components/TaskList/index';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

function App(){
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // para listar as tasks
  useEffect(() => {
    async function loadTasks(){
      // Sempre que usar programação assícrona, obrigatório usar await
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  // Para salvar as tasks
  useEffect(() => {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks()
  }, [task]);

  // Para adicionar tasks
  function handleAdd(){
    if(input === '') return;

    const data = {
      key: input,
      task: input
    }

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }


  // Deletar tasks
  const handleDelete = useCallback(( data ) => {
    const find = task.filter(r => r.key != data.key);
    setTask(find);
  })

  return(
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor = '#171d3' barStyle = 'light-content'/>

      <View style = {styles.content}>
        <Text style = {styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList marginHorizontal = {10} showsHorizontalScrollIndicator = {false} data = {task} keyExtractor={ (item) => String(item.key) } renderItem={ ({ item }) => <TaskList data = { item } handleDelete = {handleDelete} /> } />



      <Modal animationType = 'slide' transparent = 'false' visible = 'open'>
        <SafeAreaView style = {styles.modal}>

          <View style = {styles.modalHeader}>
            <TouchableOpacity onPress={ () => setOpen(false) }>
              <Ionicons style={{marginLeft: 5, marginRight: 5}} name = 'md-arrow-black' size={40} color='#fff'/>
            </TouchableOpacity>

            <Text style = {styles.modalTitle}>Nova Tarefa</Text>
          </View>

          <Animatable.View style = {styles.modalBody} animation={fadeInUp} useNativeDriver>
            <TextInput multiline = 'True' placeholderTextColor={'#747474'} autoCorrect = {false} placeholder='Digite a task aqui...' style = {styles.input} value = {input} onChangeText={ ( texto ) => setInput(texto)} />
            
            <TouchableOpacity style = {styles.handleAdd} onPress={ handleAdd }>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatedBtn style={styles.fab} useNativeDriver animation = 'bounceInUp' duration = {1500} onPress = { () => setOpen(true)}>
        <Ionicons name='ios-add' size = {35} color= '#fff' />
      </AnimatedBtn>
    </SafeAreaView>
  )
}

// Paramos nas estilizações
const styles = StyleSheet.create({

  
})

export default App;

