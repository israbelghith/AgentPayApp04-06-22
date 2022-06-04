import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoragePaiementPageRoutingModule } from './storage-paiement-routing.module';

import { StoragePaiementPage } from './storage-paiement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoragePaiementPageRoutingModule
  ],
  declarations: [StoragePaiementPage]
})
export class StoragePaiementPageModule {}
