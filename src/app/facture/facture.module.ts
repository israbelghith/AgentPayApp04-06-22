import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturePageRoutingModule } from './facture-routing.module';

import { FacturePage } from './facture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturePageRoutingModule
  ],
  declarations: [FacturePage]
})
export class FacturePageModule {}
