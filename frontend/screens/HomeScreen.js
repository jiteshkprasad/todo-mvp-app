import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { 'x-auth-token': token }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (title, points) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/tasks', 
        { title, points },
        { headers: { 'x-auth-token': token } }
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${id}/complete`, {}, {
        headers: { 'x-auth-token': token }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} />
      <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;