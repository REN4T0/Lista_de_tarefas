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
}

export default App;

