import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifAuthentificationPageRoutingModule } from './verif-authentification-routing.module';

import { VerifAuthentificationPage } from './verif-authentification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifAuthentificationPageRoutingModule
  ],
  declarations: [VerifAuthentificationPage]
})
export class VerifAuthentificationPageModule {}
