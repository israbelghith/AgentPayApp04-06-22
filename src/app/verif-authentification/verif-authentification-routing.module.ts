import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifAuthentificationPage } from './verif-authentification.page';

const routes: Routes = [
  {
    path: '',
    component: VerifAuthentificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifAuthentificationPageRoutingModule {}
