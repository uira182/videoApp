import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ISerieApi, IListaSerie } from '../models/ISerieAPI.model';
import { DadosService } from '../services/dados.service';
import { GeneroService } from '../services/genero.service';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  handlerMessage = '';
  roleMessage = '';

  titulo = 'Séries App';

  listaSeries: IListaSerie;

  generos: string[] = [];

  constructor(
    private alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public serieService: SerieService,
    public generoService: GeneroService,
    public route: Router) {}


    buscarSeries(evento: any){
      console.log(evento.target.value);
      const busca = evento.target.value;
      if(busca && busca.trim() !== ''){
        this.serieService.buscarSeries(busca).subscribe(dados=>{
          console.log(dados);
          this.listaSeries = dados;
        });
      }else{
        this.buscarSeriesLancamento();
      }
    }

    buscarSeriesLancamento(){
      this.serieService.buscarSeriesLancamento().subscribe(dados=>{
        console.log(dados);
        this.listaSeries = dados;
      });
    }

    exibirSeries(serie: ISerieApi){
      this.dadosService.guardarDados('serie', serie);
      this.route.navigateByUrl('/dados-serie');
    }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Deseja realmente favoritar a série?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => { console.log('Confirm Cancel: blah'); }
        },
        {
          text: 'Sim, Favoritar!',
          handler: () => { console.log('Confirm Okay.'); this.presentToast(); }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Série adicionada aos favoritos.',
      duration: 2000,
      position: 'top',
      color:'success'
    });
    toast.present();
  }

  ngOnInit(): void {
      this.generoService.buscarGenerosSerie().subscribe(dados => {
        console.log('Generos: ', dados.genres);
        dados.genres.forEach(genero => {
          this.generos[genero.id] = genero.name;
        });

        this.dadosService.guardarDados('generos', this.generos);
      });

      this.buscarSeriesLancamento();
  }
}
