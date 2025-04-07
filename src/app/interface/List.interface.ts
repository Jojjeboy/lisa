import { Todo } from './Todo.interface';

export interface List<T> {
    uuid: string;
    Todo: Todo[];
    title: string;
    description: string;
    currentPage: number;
}