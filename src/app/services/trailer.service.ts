import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IListaTrailer } from '../models/ITrailer.model';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  lingua = 'pt-BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=0961a07b3607c784ef87c0974cea8930';

  constructor(private http: HttpClient, public toastController: ToastController) { }

  buscarTrailerFilme(id: any): Observable<IListaTrailer>{
    const url = `${this.apiURL}/movie/${id}/videos${this.key}&language=${this.lingua}`;

    return this.http.get<IListaTrailer>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  buscarTrailerSerie(id: number): Observable<IListaTrailer>{
    const url = `${this.apiURL}/tv/${id}/videos${this.key}&language=${this.lingua}`;

    return this.http.get<IListaTrailer>(url).pipe(
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
