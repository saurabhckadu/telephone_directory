import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: [HistoryPage],
  providers:[NativePageTransitions]
})
export class HistoryPageModule {}
