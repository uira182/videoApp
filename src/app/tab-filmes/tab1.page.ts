/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { IFilmeApi, IListaFilmes } from '../models/IFilmeAPI.model';
import { ConnectService } from '../services/connect.service';
import { DadosService } from '../services/dados.service';
import { FilmeService } from '../services/filme.service';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  handlerMessage = '';
  roleMessage = '';

  titulo = 'Filmes App';

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    private alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router,
    public connectService: ConnectService) {
      this.connectService.valida();
    }


  buscarFilmes(evento: any){
    console.log(evento.target.value);
    const busca = evento.target.value;
    if(busca && busca.trim() !== ''){
      this.filmeService.buscarFilmes(busca).subscribe(dados=>{
        console.log('Filmes: ', dados);
        this.listaFilmes = dados;
      });
    }else{
      this.buscarFilmesLancamento();
    }
  }

  buscarFilmesLancamento(){
    this.filmeService.buscarFilmesLancamento().subscribe(dados=>{
      console.log('Filmes: ', dados);
      this.listaFilmes = dados;
    });
  }

  exibirFilme(filme: IFilmeApi){
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async presentAlert(id: number, tipo: number, favorito: boolean) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: favorito ? 'Deseja remover o favorito?' : 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => { console.log('Confirm Cancel: blah'); }
        },
        {
          text: 'Sim, Favoritar!',
          handler: () => {
            console.log('Confirm Okay.');
            favorito ? this.removerFavorito(id, tipo) : this.favoritar(id, tipo);
          }
        }
      ]
    });

    await alert.present();
  }

  removerFavorito(id: number, tipo: number){
    console.log('ID: ', id);

    let filmes: number[] = [];
    let series: number[] = [];

    const favoritos = JSON.parse(localStorage.getItem('favoritos'));

    filmes = favoritos.filmes;
    series = favoritos.series;

    if(tipo === 0){
      console.log('Favorito - Filme: ', filmes);
      const index = filmes.indexOf(id);
      filmes.splice(index, 1);
      console.log('Removeu - Filme: ', filmes);
    }else{
      console.log('Favorito - Series: ', series);
      const index = series.indexOf(id);
      series.splice(index, 1);
      console.log('Removeu - Serie: ', series);
    }

    this.salvaFavoritos(filmes, series);
  }

  favoritar(id: number, tipo: number){

    if(localStorage.getItem('favoritos')){
      const ret = this.adicionarAoStorage(id, tipo);
      console.log('Retorno ao adicionar favorito', ret);
      ret ? this.presentToast('Filme adicionado aos favoritos.', true) : this.presentToast('Filme existe entre os favoritos.', false);
    }else{
      this.criarLocalStorage();
      const ret = this.adicionarAoStorage(id, tipo);
      console.log('Retorno ao adicionar novo', ret);
      ret ? this.presentToast('Filme adicionado aos favoritos.', true) : this.presentToast('Filme existe entre os favoritos.', false);
    }
  }

  criarLocalStorage(){
    localStorage.setItem('favoritos', JSON.stringify({filmes:[], series:[]}));
  }

  adicionarAoStorage(id: number, tipo: number): boolean{
    let confirmFavorito = false;

    let filmes: number[] = [];
    let series: number[] = [];

    const favoritos = JSON.parse(localStorage.getItem('favoritos'));

    filmes = favoritos.filmes;
    series = favoritos.series;

    if (tipo === 0 && filmes.indexOf(id) < 0) {
      filmes.push(id);
      confirmFavorito = true;
    }else if (tipo === 1 && series.indexOf(id) < 0){
      series.push(id);
      confirmFavorito = true;
    }else{
      confirmFavorito = false;
    }

    this.salvaFavoritos(filmes, series);

    return confirmFavorito;
  }

  salvaFavoritos(addFilmes: number[], addSeries: number[]){
    localStorage.setItem('favoritos', JSON.stringify({
      filmes: addFilmes,
      series: addSeries
    }));
  }

  async presentToast(mensagem: string, tipo: boolean) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
      color: tipo ? 'success' : 'warning'
    });
    toast.present();
  }

  verificaFavorito(id: number, tipo: number): boolean{
    let confirm = false;

    let filmes: number[] = [];
    let series: number[] = [];

    if(localStorage.getItem('favoritos')){
      const favoritos = JSON.parse(localStorage.getItem('favoritos'));

      filmes = favoritos.filmes;
      series = favoritos.series;

      if (tipo === 0) {
        filmes.indexOf(id) >= 0 ? confirm = true : confirm =  false;
      }else{
        series.indexOf(id) >= 0 ? confirm = true : confirm =  false;
      }

    }else{
      confirm = false;
    }

    return confirm;
  }

  ngOnInit(): void {

      this.generoService.buscarGenerosFilme().subscribe(dados => {
        console.log('Generos: ', dados.genres);
        dados.genres.forEach(genero => {
          this.generos[genero.id] = genero.name;
        });

        this.dadosService.guardarDados('generos', this.generos);
      });

      this.buscarFilmesLancamento();
  }
}
