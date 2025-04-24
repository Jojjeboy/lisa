import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { TodoService } from '../../service/todo/todo.service';
import { MiscService } from '../../service/misc/misc.service';
import { Router } from '@angular/router';
import { List } from '../../interface/List.interface';

@Component({
  selector: 'app-add-list-dialog',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './add-list-dialog.component.html',
  styleUrl: './add-list-dialog.component.scss'
})
export class AddListDialogComponent implements OnInit {


  @Input() categoryUuid!: string;
  @Input() visible!: boolean;
  @Output() newItemEvent = new EventEmitter<boolean>();


  listForm: any;
  list!: List;

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]]
    });
    console.log(this.visible);
    
  }
  
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private router: Router) {

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
      this.visible = false; // Close the dialog after adding the list
      this.listForm.reset();

      // Redirect to new list
      this.router.navigate(['/list', newList.uuid, this.categoryUuid]);
    });
  }

  closeDialog() {
    this.visible = false; // Close the dialog
    this.newItemEvent.emit(this.visible); // Emit the event to notify the parent component
    this.listForm.reset(); // Reset the form
  }
}
