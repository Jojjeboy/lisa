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
    ConfirmDialogComponent],
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
    private todoService: TodoService, // Assuming you have a TodoService to fetch data
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryUuid = params['id'];
      this.categoryObservable = this.todoService.getCategory(this.categoryUuid).subscribe(category => {
        this.category = category; // Assuming you have a List interface defined somewhere
        console.log(this.category); // Do something with the fetched category data
      });
    });


    this.listForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      color: [this.generateRandomColor(), Validators.required],
    });
  }


  showAddListDialog(categoryUuid: string) {
    this.addListDialogVisible = true;
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
      this.router.navigate(['/pages/lists/list', newList.uuid, this.categoryUuid]);
    });
  }


  showEditCategoryDialog(){
    this.editCategoryDialogVisible = true;
    this.categoryOriginalTitle = this.category.title;
  }


 

  discardCategoryEdit(){
    this.category.title = this.categoryOriginalTitle;
    this.editCategoryDialogVisible = false;
  }

  updateCategory() {
    console.log('Category updated successfully!');
    /*
    this.category.lastTouched = new Date(); // Update the last touched date
    this.todoService.updateCategory(this.category).subscribe(() => {
      console.log('Category updated successfully!');
      this.editCategoryDialogVisible = false; // Close the dialog after updating the category
    }, error => {
      console.error('Error updating category:', error);
    });
    */
  }

  deleteCategory() {
    this.todoService.deleteCategory(this.categoryUuid).subscribe(() => {
      this.router.navigate(['/pages/lists']);
      console.log('Category deleted successfully!');
    });
  }

  generateRandomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }


}

