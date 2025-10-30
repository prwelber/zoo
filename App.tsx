import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TodoColumn } from './components/TodoColumn';
import { AddTodoModal } from './components/AddTodoModal';
import { TodoItem, Owner } from './types';
import { todoService } from './firebaseService';

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<Owner>('person1');

  useEffect(() => {
    // Subscribe to real-time updates from Firebase
    const unsubscribe = todoService.subscribeTodos((updatedTodos) => {
      setTodos(updatedTodos);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddPress = (owner: Owner) => {
    setSelectedOwner(owner);
    setModalVisible(true);
  };

  const person1Todos = todos.filter((todo) => todo.owner === 'person1');
  const person2Todos = todos.filter((todo) => todo.owner === 'person2');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Shared Todos</Text>
        <Text style={styles.headerSubtitle}>Long press to move items between lists</Text>
      </View>

      <View style={styles.columnsContainer}>
        <TodoColumn
          title="Your List"
          owner="person1"
          todos={person1Todos}
          onAddPress={() => handleAddPress('person1')}
        />

        <View style={styles.divider} />

        <TodoColumn
          title="Wife's List"
          owner="person2"
          todos={person2Todos}
          onAddPress={() => handleAddPress('person2')}
        />
      </View>

      <AddTodoModal
        visible={modalVisible}
        owner={selectedOwner}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
});
