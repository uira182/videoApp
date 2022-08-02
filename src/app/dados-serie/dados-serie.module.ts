import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadosSeriePageRoutingModule } from './dados-serie-routing.module';

import { DadosSeriePage } from './dados-serie.page';
import { YoutubePipe } from '../pipes/youtube.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadosSeriePageRoutingModule
  ],
  declarations: [DadosSeriePage, YoutubePipe]
})
export class DadosSeriePageModule {}
