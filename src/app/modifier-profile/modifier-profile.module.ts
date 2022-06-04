import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierProfilePageRoutingModule } from './modifier-profile-routing.module';

import { ModifierProfilePage } from './modifier-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierProfilePageRoutingModule
  ],
  declarations: [ModifierProfilePage]
})
export class ModifierProfilePageModule {}
