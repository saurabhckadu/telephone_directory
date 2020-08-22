import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDetailsModalPage } from './view-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDetailsModalPageRoutingModule {}
