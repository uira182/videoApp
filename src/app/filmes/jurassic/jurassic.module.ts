import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JurassicPageRoutingModule } from './jurassic-routing.module';

import { JurassicPage } from './jurassic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JurassicPageRoutingModule
  ],
  declarations: [JurassicPage]
})
export class JurassicPageModule {}
