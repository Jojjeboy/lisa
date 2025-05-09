import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TodoService } from '../../service/todo/todo.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Divider } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { Category } from '../../interface/Category.interface';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { List } from '../../interface/List.interface';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogComponent } from '../../resuable-componentents/confirm-dialog/confirm-dialog.component';
import { ListListsComponent } from '../../resuable-componentents/list-lists/list-lists.component';
import { MiscService } from '../../service/misc/misc.service';
import { AddListDialogComponent } from '../../resuable-componentents/add-list-dialog/add-list-dialog.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  imports: [
    CommonModule,
    TagModule,
    Divider,
    ChipModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    FloatLabelModule,
    AccordionModule,
    ColorPickerModule,
    ToastModule,
    ConfirmDialogComponent,
    ListListsComponent,
    AddListDialogComponent],
  providers: [MessageService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categoryObservable!: Subscription;
  addListDialogVisible: boolean = false;
  editCategoryDialogVisible: boolean = false;
  categoryOriginalTitle!: string;
  listForm: any;
  categoryUuid!: string;

  category!: Category; // Assuming you have a List interface defined somewhere
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private miscService: MiscService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryUuid = params['id'];
      this.setCategory(); // Fetch the category data using the UUID
    });


    this.listForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]]
    });
  }


  setCategory(){
    this.categoryObservable = this.todoService.getCategory(this.categoryUuid).subscribe(category => {
      this.category = category; // Assuming you have a List interface defined somewhere
      console.log(this.category); // Do something with the fetched category data
    });
  }


  showAddListDialog() {
    this.addListDialogVisible = true;
  }

  hideAddListDialog() {
    this.setCategory();
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


  showEditCategoryDialog() {
    this.editCategoryDialogVisible = true;
    this.categoryOriginalTitle = this.category.title;
  }


  discardCategoryEdit() {
    this.category.title = this.categoryOriginalTitle;
    this.editCategoryDialogVisible = false;
  }

  updateCategory() {

    this.todoService.updateCategory(this.category).subscribe(() => {
      console.log('Category updated successfully!');
      this.editCategoryDialogVisible = false; // Close the dialog after updating the category
    }, error => {
      console.error('Error updating category:', error);
    });

  }

  deleteCategory() {
    this.todoService.deleteCategory(this.categoryUuid).subscribe(() => {
      this.router.navigate(['/']);
      console.log('Category deleted successfully!');
    });
    const categories = this.reOrderCategories(); // Call the reorderCategories method after deleting the category

    this.todoService.getData().subscribe((data) => {
      data.categories = categories; // Update the categories in the data object
      this.todoService.setData(data).subscribe(() => {
        console.log('Categories updated successfully!');
        this.router
      });
    });
  }

  reOrderCategories(): Category[] {
    let reorderedCategories: Category[] = [];
    this.todoService.getCategories().subscribe((categories) => {
      for (let i = 0; i < categories.length; i++) {
        categories[i].order = i + 1; // Update the order property based on the new index
      }
      reorderedCategories = categories.sort((a: any, b: any) => a.order - b.order); // Sort the categories based on the order property
    });
    return reorderedCategories;
  }

}

