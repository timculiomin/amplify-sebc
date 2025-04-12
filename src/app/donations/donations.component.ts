import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ZelleInfoDialogComponent } from '../zelle-info-dialog/zelle-info-dialog.component';
import { AFCUInfoDialogComponent } from '../afcuinfo-dialog/afcuinfo-dialog.component';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent {
  constructor(public dialog: MatDialog, public languageService: LanguageService){}

  hideForm = false;

  receiveDataFromChild(isActive: boolean) {
    this.hideForm = isActive;
  }

  openZelleDialog(){
    this.dialog.open(ZelleInfoDialogComponent)
  }

  openAFCUDialog(): void {
    this.dialog.open(AFCUInfoDialogComponent);
  }

}
