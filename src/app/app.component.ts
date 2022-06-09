import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';
import { PaiementService } from './services/paiement.service';
import { ActionSheetController, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  bar: any = true;
  userConnect: string;

  public appPages = [
    { title: 'Acceuil', url: './PageAccueil', icon: 'home' },
    {
      title: 'Historique Paiements',
      url: './historique-paiement',
      icon: 'archive',
    },
    { title: 'Chercher Facture', url: './facture', icon: 'search' },
    { title: 'Modifier Profile', url: './modifier-profile', icon: 'person' },
  ];

  constructor(
    private dataService: DataService,
    private router: Router,
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    public authService: AuthentificationService,
    private paiementService: PaiementService
  ) {
    this.dataService.init();
  }

  ngOnInit(): void {
    if (this.authService.loggedUser != null) {
      this.userConnect = this.authService.loggedUser;
    }
  }

  deconnecter() {
    this.authService.logout();
    this.paiementService.deleteAll();
  }
  paiement() {
    this.router.navigateByUrl('/facture');
  }
  historique() {
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil() {
    this.router.navigateByUrl('/folder/:id');
    this.bar = true;
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
          },
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
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
