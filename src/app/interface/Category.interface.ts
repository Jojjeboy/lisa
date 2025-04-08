import { List } from './List.interface';

export interface Category {
    uuid:  string;
    title: string;
    lists: List[];
}