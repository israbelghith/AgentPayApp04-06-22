import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Agent } from '../model/agent.model';
import { AuthentificationService } from '../services/authentification.service';
import { DataService } from '../services/data.service';
import { PaiementService } from '../services/paiement.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  agt=new Agent();
  currentUtilisateur = new Agent();
  bar: any=true;
  subjects;

  constructor(
    public authService: AuthentificationService,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private paiementService: PaiementService,
    public actionSheetController: ActionSheetController) { }

  async ngOnInit() {

    this.subjects=[
      {
        img:'assets/icon/search.jpg',
        name:'Payer Facture',
        url: './facture'
      },
      {
       img:'assets/icon/paiement.png',
       name:'Historique des paiement',
       url: './historique-paiement'
     }
    ];


    this.utilisateurService.chercherParEmail(this.authService.loggedUser).
    subscribe( cais =>{
      // this.authService.loadToken();
       this.currentUtilisateur = cais;
    } ) ;

  }

  paiement(){
    this.router.navigateByUrl('/facture');
  }
  historique(){
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil(){
    this.router.navigateByUrl('/PageAccueil');
    this.bar=true;
  }
  modifierProfile(){
    this.router.navigateByUrl('/modifier-profile');

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
        handler: async () => {
          this.authService.logout();
          await this.paiementService.deleteAgent();
            await this.paiementService.deleteFacture();
            await this.paiementService.deletePaiement();
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
