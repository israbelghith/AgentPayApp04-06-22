import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthentificationPageRoutingModule } from './authentification-routing.module';

import { AuthentificationPage } from './authentification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthentificationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthentificationPage]
})
export class AuthentificationPageModule {}
