export interface Todo {
  title:       string;
  description: string;
  completed:   boolean;
  dueDate:     Date | null;
}