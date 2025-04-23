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
import { Router } from '@angular/router';



@Component({
    selector: 'app-start',
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
    templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
    data!: Data;
    list!: List;
    listForm: any;
    categoryForm: any;
    dataObserveble!: Subscription;
    position!: string;
    addListDialogVisible: boolean = false;
    addCategoryDialogVisible: boolean = false;
    categoryUuid!: string;

    constructor(
        private todoService: TodoService,
        private fb: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        //this.data = this.todoService.getData(); 
        this.dataObserveble = this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
        });

        console.log(this.data); // Do something with the fetched category data

        this.listForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            color: [this.generateRandomColor(), Validators.required],
        });

        this.categoryForm = this.fb.group({
            title: ['', Validators.required]
        });
    }
    

    showAddListDialog(categoryUuid: string) {
        this.categoryUuid = categoryUuid;
        this.addListDialogVisible = true;
    }

    showAddCatDialog() {
        this.addCategoryDialogVisible = true;
    }

    addList() {
        console.log(this.categoryUuid);

        const newList: List = {
            uuid: self.crypto.randomUUID(),
            title: this.listForm.value.title,
            description: this.listForm.value.description,
            color: this.listForm.value.color,
            starred: false,
            lastTouched: new Date(),
            todos: []
        };
        this.todoService.addList(newList, this.categoryUuid).subscribe(() => {
            console.log('List added successfully!');
            this.addListDialogVisible = false; // Close the dialog after adding the list
            this.listForm.reset();
            // Redirect to new list
            this.router.navigate(['/list', newList.uuid, this.categoryUuid]);
        });

        //this.data.categories.forEach()

        //this.todoService.addList({ uuid: '', title: '', todos: [] });
    }

    addCategory() {
        //this.router.navigate(['/category', this.category.uuid]);  
        console.log(this.categoryForm.value.title);
        console.log('------');
        console.log(this.categoryForm.value.description);


        const newCategory = {
            uuid: self.crypto.randomUUID(),
            title: this.categoryForm.value.title,
            lists: []
        };

        this.todoService.addCategory(newCategory).subscribe(() => {
            console.log('Category added successfully!');
            this.addCategoryDialogVisible = false;
            this.categoryForm.reset();
            this.router.navigate(['/category', newCategory.uuid]);
        });
    }


    generateRandomColor() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

}
