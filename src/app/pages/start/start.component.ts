import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Divider } from 'primeng/divider';
import { TodoService } from '../../service/todo/todo.service';
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
import { ListListsComponent } from '../../resuable-componentents/list-lists/list-lists.component';
import { MiscService } from '../../service/misc/misc.service';
import { AddListDialogComponent } from '../../resuable-componentents/add-list-dialog/add-list-dialog.component';
import { CategoryService } from '../../service/category/category.service';



@Component({
    selector: 'app-start',
    standalone: true,
    imports: [
        CommonModule,
        
        Divider,
        FormsModule,
        RouterModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        DialogModule,
        TextareaModule,
        FloatLabelModule,
        ColorPickerModule,
        ListListsComponent,
        AddListDialogComponent
    ],
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
    data!: Data;
    list!: List;
    listForm: any;
    categoryForm: any;
    dataObservable!: Subscription;
    position!: string;
    addListDialogVisible: boolean = false;
    addCategoryDialogVisible: boolean = false;
    categoryUuid!: string;
    colorsToPickfrom: string[] = [];
    chosenColor: string = '#000000'; // Default color

    constructor(
        private categoryService: CategoryService,
        private todoService: TodoService,
        private miscService: MiscService,
        private fb: FormBuilder,
        private router: Router) {
            
        }

    ngOnInit() {
        this.dataObservable = this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
            this.data.categories = this.data.categories.sort((b, a) => b.order - a.order);
        });



        console.log(this.data); // Do something with the fetched category data
        
        this.categoryForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        });

        this.generateColors();
        this.setColor(this.colorsToPickfrom[this.miscService.randomIntFromInterval(0, this.colorsToPickfrom.length - 1)]); // Set the first color as the default color
    }


    upCategory(categoryUuid: string) {
        this.categoryService.upCategory(categoryUuid);
    }

    downCategory(categoryUuid: string) {
        this.categoryService.downCategory(categoryUuid);
    }


    
    
  

    

    showAddListDialog(categoryUuid: string) {
        this.categoryUuid = categoryUuid;
        this.addListDialogVisible = true;
    }

    showAddCatDialog() {
        this.addCategoryDialogVisible = true;
    }

    hideAddListDialog() {
        this.addListDialogVisible = false;
    }

    addList() {
        console.log(this.categoryUuid);

        const newList: List = {
            uuid: this.miscService.generateUuid(),
            title: this.listForm.value.title,
            description: this.listForm.value.description,
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
    }

    addCategory() {
        //this.router.navigate(['/category', this.category.uuid]);  
        console.log(this.categoryForm.value.title);
        console.log('------');
        console.log(this.categoryForm.value.description);


        const newCategory = {
            uuid: this.miscService.generateUuid(),
            title: this.categoryForm.value.title,
            color: this.chosenColor,
            order: this.data.categories.length + 1,
            lists: []
        };

        this.todoService.addCategory(newCategory).subscribe(() => {
            console.log('Category added successfully!');
            this.addCategoryDialogVisible = false;
            this.categoryForm.reset();
            this.router.navigate(['/category', newCategory.uuid]);
        });
    }

    setColor(color: string) {
        this.chosenColor = color;
    }

    generateColors() {
        this.colorsToPickfrom = this.miscService.generateRandomColors(12);
    }


    ngOnDestroy() {
        this.dataObservable.unsubscribe(); // Unsubscribe to avoid memory leaks
    }

}
