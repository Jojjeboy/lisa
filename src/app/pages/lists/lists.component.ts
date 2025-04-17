import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Divider } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TodoService } from '../../service/todo/todo.service';
import { ChipModule } from 'primeng/chip';
import { Data } from '../../interface/Data.interface';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { List } from '../../interface/List.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ColorPickerModule } from 'primeng/colorpicker';



@Component({
    selector: 'app-lists',
    standalone: true,
    imports: [
        CommonModule,
            TagModule,
            Divider,
            ChipModule,
            FormsModule,
            RouterModule,
            InputTextModule,
            ButtonModule,
            ReactiveFormsModule,
            DialogModule, 
            TextareaModule,
            FloatLabelModule,
            ColorPickerModule],
    templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {
    data!: Data;
    list!: List;
    listForm: any;
    dataObserveble!: Subscription;
    position!: string;
    visible: boolean = false;

    constructor(
        private todoService: TodoService,
        private fb: FormBuilder) {}

    ngOnInit() {
        this.dataObserveble = this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
            console.log(this.data); // Do something with the fetched category data
        });

        this.listForm = this.fb.group({
              title: ['', Validators.required],
              describtion: ['', Validators.required],
              color: ['#ffffff', Validators.required], 
            });
    }

    showDialog(){
        this.visible = true;
    }

    addList() {
        //this.todoService.addList({ uuid: '', title: '', todos: [] });
    }
}
