import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onCompleteTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem task={item} onComplete={() => onCompleteTask(item._id)} />
      )}
    />
  );
};

export default TaskList;