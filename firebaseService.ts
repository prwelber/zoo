import { ref, push, set, update, remove, onValue, off } from 'firebase/database';
import { database } from './firebaseConfig';
import { TodoItem, Owner } from './types';

const TODOS_PATH = 'todos';

export const todoService = {
  // Create a new todo
  createTodo: async (text: string, owner: Owner, dueDate?: string): Promise<string> => {
    const todosRef = ref(database, TODOS_PATH);
    const newTodoRef = push(todosRef);

    const newTodo: TodoItem = {
      id: newTodoRef.key!,
      text,
      completed: false,
      owner,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    await set(newTodoRef, newTodo);
    return newTodo.id;
  },

  // Update a todo
  updateTodo: async (id: string, updates: Partial<TodoItem>): Promise<void> => {
    const todoRef = ref(database, `${TODOS_PATH}/${id}`);
    await update(todoRef, updates);
  },

  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    const todoRef = ref(database, `${TODOS_PATH}/${id}`);
    await remove(todoRef);
  },

  // Toggle todo completion
  toggleComplete: async (id: string, completed: boolean): Promise<void> => {
    const todoRef = ref(database, `${TODOS_PATH}/${id}`);
    await update(todoRef, { completed });
  },

  // Move todo to different owner
  moveTodo: async (id: string, newOwner: Owner): Promise<void> => {
    const todoRef = ref(database, `${TODOS_PATH}/${id}`);
    await update(todoRef, { owner: newOwner });
  },

  // Subscribe to todos changes
  subscribeTodos: (callback: (todos: TodoItem[]) => void): (() => void) => {
    const todosRef = ref(database, TODOS_PATH);

    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const todos: TodoItem[] = data
        ? Object.values(data)
        : [];
      callback(todos);
    });

    // Return unsubscribe function
    return () => off(todosRef);
  },
};
