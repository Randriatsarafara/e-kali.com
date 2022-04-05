import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { CommandeComponent } from './pages/commande/commande.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { LoginComponent } from './pages/login/login.component';

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
    path: 'contact',
    component: ContactComponent,
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
