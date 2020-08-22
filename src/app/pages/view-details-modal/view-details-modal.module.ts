import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDetailsModalPageRoutingModule } from './view-details-modal-routing.module';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ViewDetailsModalPage } from './view-details-modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDetailsModalPageRoutingModule
  ],
  declarations: [ViewDetailsModalPage],
  providers:[NativePageTransitions]
})
export class ViewDetailsModalPageModule {}
