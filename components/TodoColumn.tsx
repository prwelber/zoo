import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TodoItem as TodoItemType, Owner } from '../types';
import { TodoItem } from './TodoItem';

interface Props {
  title: string;
  owner: Owner;
  todos: TodoItemType[];
  onAddPress: () => void;
}

export const TodoColumn: React.FC<Props> = ({
  title,
  owner,
  todos,
  onAddPress,
}) => {
  const handleItemLongPress = (item: TodoItemType) => {
    const otherOwner = owner === 'person1' ? 'person2' : 'person1';
    const otherOwnerName = owner === 'person1' ? title.split("'s")[0] : 'Your';

    Alert.alert(
      'Move Todo',
      `Move this item to ${otherOwnerName === 'Your' ? 'your' : otherOwnerName + "'s"} list?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Move',
          onPress: async () => {
            const { todoService } = await import('../firebaseService');
            await todoService.moveTodo(item.id, otherOwner);
          },
        },
      ]
    );
  };

  const sortedTodos = [...todos].sort((a, b) => {
    // Incomplete first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    // Finally by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{todos.length}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+ Add Todo</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            onLongPress={() => handleItemLongPress(todo)}
          />
        ))}
        {sortedTodos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No todos yet</Text>
            <Text style={styles.emptySubtext}>Tap the button above to add one</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  count: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});
