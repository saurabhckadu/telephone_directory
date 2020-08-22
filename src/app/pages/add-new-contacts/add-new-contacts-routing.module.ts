import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewContactsPage } from './add-new-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewContactsPageRoutingModule {}
