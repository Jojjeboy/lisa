import { Todo } from './Todo.interface';

export interface List {
    uuid:        string;
    title:       string;
    description: string;
    starred:     boolean;
    lastTouched: Date;
    todos:       Todo[];
}