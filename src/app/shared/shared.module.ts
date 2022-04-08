import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { PlatComponent } from './components/plat/plat.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { CommandesComponent } from './components/commandes/commandes.component';
import { PanierComponent } from './components/panier/panier.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SendmailComponent } from './components/sendmail/sendmail.component';
import { MailComponent } from './components/mail/mail.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NewplatComponent } from './components/newplat/newplat.component';
import { AllplatComponent } from './components/allplat/allplat.component';
import { MessageComponent } from './components/message/message.component';
const matModules = [
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatBadgeModule,
  MatDialogModule,
  GoogleMapsModule
];
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, SidenavComponent, PlatComponent, CommandesComponent, PanierComponent, SendmailComponent, MailComponent, NewplatComponent, AllplatComponent, MessageComponent],
  imports: [FormsModule, ReactiveFormsModule,CommonModule, RouterModule, ...matModules],
  exports: [HeaderComponent, FooterComponent, LoaderComponent, SidenavComponent,PlatComponent,SendmailComponent,MailComponent,CommandesComponent,MessageComponent, ...matModules]
})
export class SharedModule {}
