import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  handlerMessage = '';
  roleMessage = '';

  constructor(private alertController: AlertController, public toastController: ToastController) {}
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
