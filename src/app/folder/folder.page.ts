import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Agent } from '../model/agent.model';
import { AuthentificationService } from '../services/authentification.service';
import { DataService } from '../services/data.service';
import { PaiementService } from '../services/paiement.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  agt=new Agent();
  currentUtilisateur = new Agent();
  bar: any=true;
  subjects;
user: any;
  constructor(private activatedRoute: ActivatedRoute,
    private  dataService: DataService,
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
      //
       this.currentUtilisateur = cais;
    console.log(this.currentUtilisateur);
    console.log(this.authService.loggedUser);
    } ) ;
    this.user=this.authService.loggedUser;
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
   // window.location.reload();
   //this.user =   this.dataService.getAgent();
   this.authService.loadToken();
   console.log('email user',this.user);

   console.log('current url',this.router.url);
  }

  paiement(){
    this.router.navigateByUrl('/facture');
  }
  historique(){
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil(){
    this.router.navigateByUrl('/folder/:id');
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
