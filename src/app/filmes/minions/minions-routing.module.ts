import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinionsPage } from './minions.page';

const routes: Routes = [
  {
    path: '',
    component: MinionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinionsPageRoutingModule {}
