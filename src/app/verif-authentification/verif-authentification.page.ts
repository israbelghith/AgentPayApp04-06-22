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
  u = new Agent();
  constructor(
    private modalController: ModalController,
    private router: Router,
    private authentifierService: AuthentificationService,
    private utilisateurService: UtilisateurService,
    private dataService: DataService,
    private paiementService: PaiementService,
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
      this.paiementService.deleteAll();
      this.authService.logoutVerif();
      const jwToken = data.headers.get('Authorization');
      this.authentifierService.saveToken(jwToken);
      this.utilisateurService
        .chercherParEmail(this.utilisateur.email)
        .subscribe(async (agt) => {
          this.u = agt;
          this.dataService.addAgent(agt);
          this.authentifierService.saveSecteur(agt.secteur);
          console.log(agt.secteur);
          if (this.u.role.role === 'agent') {
            await this.modalController.dismiss('ok');
          } else {
            this.closeModal();
          }
          console.log(this.u.role);
        });
    });
  }

  async ajouterPaiement() {
    await this.modalController.dismiss('ok');
  }
}
