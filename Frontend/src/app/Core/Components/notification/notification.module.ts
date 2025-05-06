import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NotificationListComponent,
    NotificationComponent
  ]
})
export class NotificationModule { }
