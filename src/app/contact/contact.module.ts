import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { ListUserComponent } from './list-user/list-user.component';
import { TodoRoutingModule } from './contact-routing.module';

@NgModule({
  declarations: [
    AddEditContactComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule   
  ],
  entryComponents: [
    AddEditContactComponent
  ],
  providers: [
  ]
})
export class ContactModule { }
