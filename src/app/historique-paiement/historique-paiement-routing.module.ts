import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriquePaiementPage } from './historique-paiement.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriquePaiementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriquePaiementPageRoutingModule {}
