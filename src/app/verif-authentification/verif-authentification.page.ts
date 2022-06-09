import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Agent } from '../model/agent.model';
import { Utilisateur } from '../model/utilisateur.model';
import { AuthentificationService } from '../services/authentification.service';
import { DataService } from '../services/data.service';
import { PaiementService } from '../services/paiement.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-verif-authentification',
  templateUrl: './verif-authentification.page.html',
  styleUrls: ['./verif-authentification.page.scss'],
})
export class VerifAuthentificationPage implements OnInit {
  utilisateur = new Utilisateur();
  u: any;//new Agent();
  agentTest: any;
  constructor(
    private modalController: ModalController,
    private authentifierService: AuthentificationService,
    private utilisateurService: UtilisateurService,
    private dataService: DataService,
    private authService: AuthentificationService
  ) {}

  ngOnInit() {}

  async closeModal() {
    const onClosedData = 'not ok';
    console.log('sending', onClosedData);
    await this.modalController.dismiss(onClosedData);
  }

  async connection() {

    this.authentifierService.connection(this.utilisateur).subscribe((data) => {
      this.authService.logoutVerif();
      const jwToken = data.headers.get('Authorization');
      this.authentifierService.saveToken(jwToken);
      this.utilisateurService
        .chercherParEmail(this.utilisateur.email)
        .subscribe(async (agt) => {
          this.u = agt;
          this.authentifierService.saveSecteur(agt.secteur);
          this.agentTest=await this.dataService.getAgent();

          if (this.u.idU === this.agentTest.idU ) {
            await this.modalController.dismiss('ok');
          }
          else {
            this.closeModal();
          }
        });
    });
  }

}
