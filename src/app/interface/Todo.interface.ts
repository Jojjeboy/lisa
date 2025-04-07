export interface Todo {
    uuid: string;
    listUuid: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date
  }