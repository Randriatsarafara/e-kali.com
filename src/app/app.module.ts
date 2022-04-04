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

@NgModule({
  declarations: [AppComponent, AccueilComponent, PlatsComponent, LoginComponent, InscriptionComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, NgxSkeletonLoaderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
