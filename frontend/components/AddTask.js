import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = () => {
    if (title.trim() && points.trim()) {
      onAddTask(title, parseInt(points));
      setTitle('');
      setPoints('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Points"
        value={points}
        onChangeText={setPoints}
        keyboardType="numeric"
      />
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
  },
});

export default AddTask;