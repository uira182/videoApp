import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  handlerMessage = '';
  roleMessage = '';

  constructor(private alertController: AlertController) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => { console.log('Confirm Canel: blah'); }
        },
        {
          text: 'Sim, Favoritar!',
          handler: () => { console.log('Confirm Okay.'); }
        }
      ]
    });

    await alert.present();
  }
}
