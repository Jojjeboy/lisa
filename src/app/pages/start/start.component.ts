import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';




@Component({
    selector: 'app-start',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        DialogModule,
        TextareaModule,
        FloatLabelModule,
        ColorPickerModule,
        AccordionModule,
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
    resetDataBtn: boolean = window.location.hostname === 'localhost' || window.location.hostname === '';  // For development purposes only
    resetDataDialogVisible: boolean = false; // For development purposes only
    categoryUuid!: string;
    colorsToPickfrom: string[] = [];
    chosenColor: string = '#000000'; // Default color

    constructor(
        private categoryService: CategoryService,
        private localStorageService: LocalstorageService,
        private http: HttpClient,
        private todoService: TodoService,
        private miscService: MiscService,
        private fb: FormBuilder,
        private router: Router) {
            
        }

    ngOnInit() {
        this.getData();



        console.table(this.data.categories); // Do something with the fetched category data
        
        this.categoryForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
        });

        this.generateColors();
        this.setColor(this.colorsToPickfrom[this.miscService.randomIntFromInterval(0, this.colorsToPickfrom.length - 1)]); // Set the first color as the default color
    }


    getData() {
        this.dataObservable = this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
            this.data.categories = this.data.categories.sort((b, a) => b.order - a.order);
        });
    }


    setCategoryOrder(categoryUuid: string, direction: string) {
        this.data.categories = this.categoryService.setCategoryOrder(categoryUuid, direction);
        console.table(this.data.categories);
    }
    

    showAddListDialog(categoryUuid: string) {
        this.categoryUuid = categoryUuid;
        this.addListDialogVisible = true;
    }

    showAddCatDialog() {
        this.addCategoryDialogVisible = true;
    }

    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''' För utvecklingsyfte '''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    showResetLSDataDialog() {
        this.resetDataDialogVisible = true;
    }

    dontresetLSData() {
        this.resetDataDialogVisible = false;
    }

    resetLSData() { 
        this.localStorageService.clearData('lisa'); // Clear existing data in localStorage
        
        const jsonData = this.getDataFromJson();
        const parsedData = JSON.parse(jsonData);
        this.localStorageService.setData('lisa', JSON.stringify(parsedData));
        this.resetDataDialogVisible = false;
        this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
            this.data.categories = this.data.categories.sort((b, a) => b.order - a.order);
        });
    }

    getDataFromJson(): string {
        return '{"categories":[{"uuid":"d1f710f9-6703-413d-8d16-56b977e2e9f9","title":"Packning jobb","color":"#FF5733","order":0,"lists":[{"uuid":"d0b2f757-af29-41eb-a78d-c02abd724342","title":"Regionens hus","description":"Packning för vanlig dag på Regionens Hus Göteborg","starred":true,"lastTouched":"2025-04-02T12:00:00Z","todos":[{"uuid":"3df3983e-1c1b-4e79-858d-17cd188b3569","title":"SITHS-kort","completed":false},{"uuid":"3df3784e-1c1b-4e79-858d-17cd188b3569","title":"Glasögon","completed":true}]},{"uuid":"db77e75a-f00c-488c-8780-5ab37b6b240f","title":"Mölndalskontoret","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","starred":true,"lastTouched":"2025-04-02T12:00:00Z","todos":[{"uuid":"3df3783e-1c1b-4e89-858d-17cd188b3569","title":"Glasögon","completed":false},{"uuid":"3df3783e-1c1b-4e79-858d-17cr188b3569","title":"SITHS-kort","completed":true},{"uuid":"3df3783e-1c1b-4e79-858d-17cd188b3569","title":"Matlåda","completed":true},{"uuid":"3df3783e-1c1b-4e79-858d-17ca188b3569","title":"Leave stuff at the office","completed":true}]}]},{"uuid":"613964d7-2977-47df-8bd8-d262b528e4dc","title":"Städning","color":"#bdd28e","order":1,"lists":[{"uuid":"d0b2f747-af29-41eb-a78d-c02abd724d42","title":"Städa toa","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","starred":false,"lastTouched":"2025-03-02T12:00:00Z","todos":[{"uuid":"3df3783e-1c1b-4e79-858d-17cd189b3569","title":"Rengör toastolen","completed":false},{"uuid":"3df3783e-1c1b-4e79-858d-17cd188b3569","title":"Rengör handfatet","completed":true}]},{"uuid":"db77e75a-f00c-488c-8780-5as36b6b340f","title":"Städa köket","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","starred":false,"lastTouched":"2025-03-02T12:00:00Z","todos":[{"uuid":"3df3784e-1c1b-4e79-858d-17cd188b3569","title":"Släng soporna","completed":false},{"uuid":"3df3783e-1c2b-4e79-858d-17cd188b3569","title":"Gå med återvinningen","completed":true},{"uuid":"3df3783e-1c1b-4e79-858d-17cd188b3569","title":"Torka av ytorna","completed":true},{"uuid":"3df3783e-1c1b-4e78-858d-17cd188b3569","title":"Töm och fyll diskmaskinen","completed":true}]}]},{"uuid":"613964d7-2957-46df-8bd8-d262b529e4dc","title":"Träning","color":"#00425f","order":2,"lists":[{"uuid":"d0b2f747-af29-41eb-a78d-c02fbd724d42","title":"Löprunda distans","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","starred":false,"lastTouched":"2025-03-02T12:00:00Z","todos":[{"uuid":"3df3783e-1c1b-4e79-858d-17cd188c3569","title":"Skor","completed":false},{"uuid":"3df3783e-1c1b-4e79-858d-17cd188b4569","title":"Vätskebälte","completed":true}]},{"uuid":"db77e75a-f00c-488c-8780-5as36b6b240f","title":"Löprunda kort","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","starred":false,"lastTouched":"2025-03-02T12:00:00Z","todos":[{"uuid":"3df3785e-1c1b-4e79-858d-17cd188b3169","title":"Skor","completed":false},{"uuid":"3df3783e-1c1b-4e79-858d-17od188b3589","title":"Vätskebälte","completed":true}]}]}]}'
    }
    
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    /* ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/

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
        


        const newCategory = {
            uuid: this.miscService.generateUuid(),
            title: this.categoryForm.value.title,
            color: this.chosenColor,
            order: this.data.categories.length,
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
