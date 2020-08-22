import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewContactsPageRoutingModule } from './add-new-contacts-routing.module';

import { AddNewContactsPage } from './add-new-contacts.page';
import { Camera} from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewContactsPageRoutingModule
  ],
  declarations: [AddNewContactsPage],
  providers:[Camera]
})
export class AddNewContactsPageModule {}
