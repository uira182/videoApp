import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadosFilmePageRoutingModule } from './dados-filme-routing.module';

import { DadosFilmePage } from './dados-filme.page';
import { YoutubePipe } from '../pipes/youtube.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadosFilmePageRoutingModule
  ],
  declarations: [DadosFilmePage, YoutubePipe]
})
export class DadosFilmePageModule {}
