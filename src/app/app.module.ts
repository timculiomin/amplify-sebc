import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { DonationsComponent } from './donations/donations.component';
import { YoungAdultsMinistryComponent } from './young-adults-ministry/young-adults-ministry.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { ZelleInfoDialogComponent } from './zelle-info-dialog/zelle-info-dialog.component';
import { AFCUInfoDialogComponent } from './afcuinfo-dialog/afcuinfo-dialog.component'
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AlbumsComponent } from './albums/albums.component';
import { FormsModule } from '@angular/forms';
import { AlbumDeatailComponent } from './albums/album-deatail/album-deatail.component';
import { ImageViewerDialogComponent } from './albums/image-viewer-dialog/image-viewer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ScheduleComponent,
    HomeComponent,
    DonationsComponent,
    NavMenuComponent,
    YoungAdultsMinistryComponent,
    ZelleInfoDialogComponent,
    AFCUInfoDialogComponent,
    AuthDialogComponent,
    AlbumsComponent,
    AlbumDeatailComponent,
    ImageViewerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIcon,
    MatButton,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    AmplifyAuthenticatorModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
