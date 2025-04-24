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
        ListListsComponent],
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
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
    colorsToPickfrom: string[] = [];
    chosenColor: string = '#000000'; // Default color

    constructor(
        private todoService: TodoService,
        private miscService: MiscService,
        private fb: FormBuilder,
        private router: Router) {
            
        }

    ngOnInit() {
        //this.data = this.todoService.getData(); 
        this.dataObserveble = this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
        });



        console.log(this.data); // Do something with the fetched category data
        
        this.listForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.categoryForm = this.fb.group({
            title: ['', Validators.required]
        });

        this.generateColors();
        console.log(this.colorsToPickfrom);
        this.setColor(this.colorsToPickfrom[this.randomIntFromInterval(0, this.colorsToPickfrom.length - 1)]); // Set the first color as the default color
    }


    
    randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
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
            uuid: self.crypto.randomUUID(),
            title: this.categoryForm.value.title,
            color: this.chosenColor,
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
        this.colorsToPickfrom = []; // Clear the existing colors
        for (let i = 0; i < 12; i++) {
            this.colorsToPickfrom.push(this.miscService.generateRandomColor());
        }
    }

}
