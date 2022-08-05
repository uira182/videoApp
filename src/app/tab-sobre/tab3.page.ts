import { Component } from '@angular/core';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public connectService: ConnectService) {
    this.connectService.valida();
  }

}
