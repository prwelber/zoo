export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string; // ISO date string
  owner: 'person1' | 'person2'; // 'person1' for you, 'person2' for your wife
  createdAt: string;
}

export type Owner = 'person1' | 'person2';
