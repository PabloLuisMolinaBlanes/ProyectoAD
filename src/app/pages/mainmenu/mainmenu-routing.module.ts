import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPage } from '../add/add.page';

import { MainMenuPage } from './mainmenu.page';

const routes: Routes = [
  {
    path: '',
    component: MainMenuPage
  },
  {
    path: 'add',
    component: AddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuPageRoutingModule {}
