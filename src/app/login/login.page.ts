import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(public toastController: ToastController, private route: Router, public connectservice: ConnectService) {
    localStorage.clear();
    sessionStorage.clear();
  }

  ngOnInit() {
  }

  async login(){
    if(await this.connectservice.login(this.email, this.senha)){
      localStorage.clear();
      this.route.navigateByUrl('/tabs/tab1');
      this.presentToast('Seja bem vindo!', 'success');
    }else{
      this.presentToast('ERRO, usuario e/ou senha inválidos!', 'danger');
    }
  }

  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      color: cor,
      duration: 2000
    });
    toast.present();
  }
}
