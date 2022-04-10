import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PlatsComponent } from './pages/plats/plats.component';
import { LoginComponent } from './pages/login/login.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CommandeComponent } from './pages/commande/commande.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddplatComponent } from './pages/addplat/addplat.component';
import { ListesplatComponent } from './pages/listesplat/listesplat.component';
import { UpdateplatComponent } from './pages/updateplat/updateplat.component';
import { BeneficerestaurantComponent } from './pages/beneficerestaurant/beneficerestaurant.component';
import { CommandesrespComponent } from './pages/commandesresp/commandesresp.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { ListuserComponent } from './pages/listuser/listuser.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PlatsComponent,
    LoginComponent,
    InscriptionComponent,
    ContactComponent,
    CommandeComponent,
    AddplatComponent,
    ListesplatComponent,
    UpdateplatComponent,
    BeneficerestaurantComponent,
    CommandesrespComponent,
    NewuserComponent,
    ListuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
