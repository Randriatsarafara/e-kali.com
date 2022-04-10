import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AddplatComponent } from './pages/addplat/addplat.component';
import { BeneficerestaurantComponent } from './pages/beneficerestaurant/beneficerestaurant.component';
import { CommandeComponent } from './pages/commande/commande.component';
import { CommandesrespComponent } from './pages/commandesresp/commandesresp.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ListesplatComponent } from './pages/listesplat/listesplat.component';
import { ListuserComponent } from './pages/listuser/listuser.component';
import { LoginComponent } from './pages/login/login.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { PlatsComponent } from './pages/plats/plats.component';
import { UpdateplatComponent } from './pages/updateplat/updateplat.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: 'connecter',
    component: LoginComponent,
  },
  {
    path: 'inscrire',
    component: InscriptionComponent,
  },
  {
    path: 'commande',
    component: CommandeComponent,
  },
  {
    path: 'plats',
    component: PlatsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'addplat',
    component: AddplatComponent,
  },
  {
    path: 'listplat',
    component: ListesplatComponent,
  },
  {
    path: 'listplat/update/:idplats',
    component: UpdateplatComponent,
  },
  {
    path: 'resto/benefice',
    component: BeneficerestaurantComponent,
  },
  {
    path: 'admin/commande',
    component: CommandesrespComponent,
  },
  {
    path: 'admin/newuser',
    component: NewuserComponent,
  },
  {
    path: 'admin/listuser',
    component: ListuserComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
