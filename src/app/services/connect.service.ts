import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Parse from 'parse';
import { ParseConfig } from '../parse.config';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  constructor(public route: Router) {
    Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
    (Parse as any).serverURL = ParseConfig.serverURL;
  }

  login(username: string, password: string){
    return Parse.User.logIn(username, password).then(user => {
      sessionStorage.setItem('id', user.id);
      return true;
    }, user => false);
  }

  valida(): any{
    if(!sessionStorage.getItem('id')){
      this.route.navigateByUrl('/login');
    }
  }
}
