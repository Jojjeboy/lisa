import { List } from './List.interface';

export interface Category {
    uuid:  string;
    title: string;
    color: string;
    order: number;
    lists: List[];
}