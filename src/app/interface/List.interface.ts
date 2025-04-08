import { Todo } from './Todo.interface';

export interface List {
    uuid:        string;
    title:       string;
    description: string;
    color:       string;
    starred:     boolean;
    lastTouched: Date;
    todos:       Todo[];
}