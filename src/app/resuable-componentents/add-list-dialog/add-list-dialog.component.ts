import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { TodoService } from '../../service/todo/todo.service';
import { Router } from '@angular/router';
import { List } from '../../interface/List.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-list-dialog',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './add-list-dialog.component.html',
  styleUrl: './add-list-dialog.component.scss'
})
export class AddListDialogComponent implements OnInit {


  @Input() categoryUuid!: string;
  @Input() visible!: boolean;
  @Output() newItemEvent = new EventEmitter<boolean>();

  minLength: number = 3;
  maxLength: number = 25;
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
    private router: Router,
    private messageService: MessageService
  ) {

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
      this.showToast(newList.title); // Show success toast message
      // Redirect to new list
      //this.router.navigate(['/list', newList.uuid, this.categoryUuid]);
    });
  }

  closeDialog() {
    this.visible = false; // Close the dialog
    this.newItemEvent.emit(this.visible); // Emit the event to notify the parent component
    this.listForm.reset(); // Reset the form
  }


  showToast(listname: string) {
    this.messageService.add(
      {
        severity: 'success', 
        summary: 'Heading', 
        detail: 'Lista ' + listname + ' tillagd', // Message content
        life: 6000, // Duration in milliseconds
        closable: true, // Allow the toast to be closed by the user

      }
    );
  }
}
