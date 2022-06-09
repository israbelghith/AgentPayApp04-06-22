import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'authentification',
    pathMatch: 'full'
  },

  {
    path: 'facture',
    loadChildren: () => import('./facture/facture.module').then( m => m.FacturePageModule)
  },
  {
    path: 'paiement',
    loadChildren: () => import('./paiement/paiement.module').then( m => m.PaiementPageModule)
  },
  {
    path: 'historique-paiement',
    loadChildren: () => import('./historique-paiement/historique-paiement.module').then( m => m.HistoriquePaiementPageModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
  {
    path: 'modifier-profile',
    loadChildren: () => import('./modifier-profile/modifier-profile.module').then( m => m.ModifierProfilePageModule)
  },
  {
    path: 'verif-authentification',
    loadChildren: () => import('./verif-authentification/verif-authentification.module').then( m => m.VerifAuthentificationPageModule)
  },
  {
    path: 'PageAccueil',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
