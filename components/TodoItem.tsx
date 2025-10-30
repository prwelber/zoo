import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TodoItem as TodoItemType } from '../types';
import { format } from 'date-fns';
import { todoService } from '../firebaseService';

interface Props {
  item: TodoItemType;
  onLongPress: () => void;
}

export const TodoItem: React.FC<Props> = ({ item, onLongPress }) => {
  const handleToggleComplete = () => {
    todoService.toggleComplete(item.id, !item.completed);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => todoService.deleteTodo(item.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, item.completed && styles.completed]}
      onPress={handleToggleComplete}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <View style={styles.content}>
        <View style={styles.checkbox}>
          {item.completed && <View style={styles.checkmark} />}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              item.completed && styles.completedText,
            ]}
          >
            {item.text}
          </Text>
          {item.dueDate && (
            <Text style={styles.dueDate}>
              Due: {format(new Date(item.dueDate), 'MMM d, yyyy')}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completed: {
    opacity: 0.6,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteText: {
    fontSize: 28,
    color: '#FF3B30',
    fontWeight: '300',
  },
});
