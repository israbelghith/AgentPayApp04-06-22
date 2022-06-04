import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Agent } from '../model/agent.model';
import { Utilisateur } from '../model/utilisateur.model';
import { AgentService } from '../services/agent.service';
import { AuthentificationService } from '../services/authentification.service';
import { DataService } from '../services/data.service';
import { PaiementService } from '../services/paiement.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.page.html',
  styleUrls: ['./modifier-profile.page.scss'],
})
export class ModifierProfilePage implements OnInit {

  currentUtilisateur = new Agent();
  constructor(public authService: AuthentificationService,
    private utilisateurService: UtilisateurService,
    private dataService: DataService,
    private agentService: AgentService,
    private router: Router,
    public actionSheetController: ActionSheetController,
     private paiementService: PaiementService,
    ) { }

  async ngOnInit() {
    /*this.utilisateurService.chercherParEmail(this.authService.loggedUser).
    subscribe( cais =>{ this.currentUtilisateur = cais;
    console.log(this.currentUtilisateur);
    console.log(this.authService.loggedUser);
    } ) ;*/
   this.currentUtilisateur =await this.dataService.getAgent();

   console.log('logged user',this.dataService.getAgent());
  }

  modifierProfile(){
this.authService.loadToken();
    this.agentService.modifierAgent(this.currentUtilisateur).subscribe(cais => {
      this.authService.logout();

      },(error) => { alert('Problème lors de la modification !'); }
      );

  }
  paiement(){
    this.router.navigateByUrl('/facture');
  }
  historique(){
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil(){
    this.router.navigateByUrl('/folder/:id');


  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'A propos',

      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Modifier profil',
          icon: 'person-add-outline',
          data: 5,
          handler: () => {
            this.router.navigateByUrl('/modifier-profile');
          }
        },
        {
        text: 'Deconnexion',
        icon: 'log-out-outline',
        data: 5,
        handler: () => {
          this.authService.logout();
          this.paiementService.deleteAll();
          this.router.navigateByUrl('/authentification');
        },

      },

      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
