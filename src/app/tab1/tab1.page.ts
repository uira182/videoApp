import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { IFilme } from '../models/iFilme.model';
import { DadosService } from '../services/dados.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  handlerMessage = '';
  roleMessage = '';

  titulo = 'Videos App';

  listaVideos: IFilme[] = [
    {
      nome:'Thor: Amor e Trovão (2022)',
      cartaz:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6OEBp0Gqv6DsOgi8diPUslT2kbA.jpg',
      classificacao:'76',
      duracao:'1h 59m',
      generos:['Ação', 'Aventura', 'Fantasia'],
      lancamento:'08/07/2022 (BR)',
      pagina: '/tor'
    },{
      nome:'Jurassic World: Domínio (2022)',
      cartaz:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7qeiCNSmzrkcEyIWi8sIcsjrOyW.jpg',
      classificacao:'71',
      duracao:'2h 27m',
      generos:['Aventura', 'Ação', 'Ficção científica'],
      lancamento:'02/06/2022 (BR)',
      pagina: '/jurassic'
    },{
      nome:'Minions 2: A Origem de Gru (2022)',
      cartaz:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tzFAboMUGJKoPQEtlxfxbbYsSWa.jpg',
      classificacao:'75',
      duracao:'1h 27m',
      generos:['Família', 'Animação', 'Aventura', 'Comédia', 'Fantasia'],
      lancamento:'30/06/2022 (BR)',
      pagina: '/minions'
    }
  ];

  constructor(
    private alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router) {}

    exibirFilme(filme: IFilme){
      this.dadosService.guardarDados('filme', filme);
      this.route.navigateByUrl('/dados-filme');
    }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Deseja realmente favoritar o filme?',
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
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      position: 'top',
      color:'success'
    });
    toast.present();
  }
}
