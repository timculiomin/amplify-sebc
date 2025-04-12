import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-afcuinfo-dialog',
  templateUrl: './afcuinfo-dialog.component.html',
  styleUrl: './afcuinfo-dialog.component.css'
})
export class AFCUInfoDialogComponent {
  constructor(public dialogRef: MatDialogRef<AFCUInfoDialogComponent>, public languageService: LanguageService) {}

  onClose(): void {
    this.dialogRef.close();
  }

}
