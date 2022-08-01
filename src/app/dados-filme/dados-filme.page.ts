import { Component, OnInit } from '@angular/core';
import { IFilmeApi } from '../models/IFilmeAPI.model';
import { IListaTrailer, ITrailer } from '../models/ITrailer.model';
import { DadosService } from '../services/dados.service';
import { TrailerService } from '../services/trailer.service';

@Component({
  selector: 'app-dados-filme',
  templateUrl: './dados-filme.page.html',
  styleUrls: ['./dados-filme.page.scss'],
})
export class DadosFilmePage implements OnInit {

  filme: IFilmeApi;
  trailer: IListaTrailer;
  generos: string[] = [];

  constructor(public dadosService: DadosService, public trailerService: TrailerService) {
    this.filme = this.dadosService.pegarDados('filme');
    this.generos = this.dadosService.pegarDados('generos');
    this.trailerService.buscarTrailerFilme(this.filme.id).subscribe(dados=>{
      console.log(dados);
      this.trailer = dados;
    });
    console.log('Filme Enviado', this.filme);
  }

  ngOnInit() {
  }

}
