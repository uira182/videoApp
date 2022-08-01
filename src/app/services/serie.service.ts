import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IListaSerie } from '../models/ISerieAPI.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  lingua = 'pt-BR';
  regiao = 'BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=0961a07b3607c784ef87c0974cea8930';

  constructor(private http: HttpClient, public toastController: ToastController) { }
  buscarSeries(busca: string): Observable<IListaSerie>{
    const url = `${this.apiURL}search/tv${this.key}&language=${this.lingua}&query=${busca}`;

    return this.http.get<IListaSerie>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  buscarSeriesLancamento(): Observable<IListaSerie>{
    const url = `${this.apiURL}tv/popular${this.key}&language=${this.lingua}&page=1`;

    return this.http.get<IListaSerie>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API!',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
