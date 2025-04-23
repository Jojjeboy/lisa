import { Component, Input, input } from '@angular/core';
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
  @Input() header: string = 'Confirmation'; 
  @Input() icon: string = 'pi pi-exclamation-triangle';


  confirm1() {
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
        accept: () => this.acceptFunc(),
        reject: () => this.rejectFunc()
    });  
  }


  acceptFunc() {
    // Actual logic to perform a confirmation
    console.log('Confirmed');
    this.confirmationService.close(); 
  }

  rejectFunc() {
    // Actual logic to perform a rejection
    console.log('Rejected');
    this.confirmationService.close(); 
  }
}
