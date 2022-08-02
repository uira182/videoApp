import { Component, OnInit } from '@angular/core';
import { ISerieApi } from '../models/ISerieAPI.model';
import { IListaTrailer } from '../models/ITrailer.model';
import { DadosService } from '../services/dados.service';
import { TrailerService } from '../services/trailer.service';

@Component({
  selector: 'app-dados-serie',
  templateUrl: './dados-serie.page.html',
  styleUrls: ['./dados-serie.page.scss'],
})
export class DadosSeriePage implements OnInit {

  serie: ISerieApi;
  generos: string[] = [];
  trailer: IListaTrailer;

  constructor(public dadosService: DadosService, public trailerService: TrailerService) { }

  ngOnInit() {
    this.serie = this.dadosService.pegarDados('serie');
    this.generos = this.dadosService.pegarDados('generos');
    this.trailerService.buscarTrailerSerie(this.serie.id).subscribe(dados=>{
      console.log(dados);
      this.trailer = dados;
    });
    console.log('Serie Enviada', this.serie);
  }

}
