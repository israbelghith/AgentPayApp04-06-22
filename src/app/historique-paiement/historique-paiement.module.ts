import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePaiementPageRoutingModule } from './historique-paiement-routing.module';

import { HistoriquePaiementPage } from './historique-paiement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePaiementPageRoutingModule
  ],
  declarations: [HistoriquePaiementPage]
})
export class HistoriquePaiementPageModule {}
