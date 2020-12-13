import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMenuPageRoutingModule } from './mainmenu-routing.module';

import { MainMenuPage } from './mainmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMenuPageRoutingModule
  ],
  declarations: [MainMenuPage]
})
export class MainmenuPageModule {}
