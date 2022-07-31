import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinionsPageRoutingModule } from './minions-routing.module';

import { MinionsPage } from './minions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinionsPageRoutingModule
  ],
  declarations: [MinionsPage]
})
export class MinionsPageModule {}
