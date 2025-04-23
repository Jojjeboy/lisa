import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialogModule, ButtonModule, Toast],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  providers: [ConfirmationService, MessageService]

})
export class ConfirmDialogComponent {


  constructor(private confirmationService: ConfirmationService,
  ) { }


  @Input() message: string = 'Are you sure that you want to proceed?';
  @Input() label: string = 'Confirm';
  @Input() header: string = 'Confirmation';
  @Input() disabled: boolean = false;
  @Input() icon: string = 'pi pi-exclamation-triangle';
  @Output() dialogAcceptFunc = new EventEmitter<void>();



  confirm() {
    //console.log('Event:', evt);
    this.confirmationService.confirm({
        message: this.message,
        header: this.header,
        icon: this.icon,
        closable: true,
        rejectLabel: 'Nej',
        acceptLabel: 'Ja',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        accept: () => this.dialogAcceptFunc.emit()
    });  
  }
}
