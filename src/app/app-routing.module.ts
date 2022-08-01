import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tor',
    loadChildren: () => import('./filmes/tor/tor.module').then( m => m.TorPageModule)
  },
  {
    path: 'jurassic',
    loadChildren: () => import('./filmes/jurassic/jurassic.module').then( m => m.JurassicPageModule)
  },
  {
    path: 'minions',
    loadChildren: () => import('./filmes/minions/minions.module').then( m => m.MinionsPageModule)
  },
  {
    path: 'dados-filme',
    loadChildren: () => import('./dados-filme/dados-filme.module').then( m => m.DadosFilmePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
