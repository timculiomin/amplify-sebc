import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-zelle-info-dialog',
  templateUrl: './zelle-info-dialog.component.html',
  styleUrl: './zelle-info-dialog.component.css'
})
export class ZelleInfoDialogComponent {
  constructor(public dialogRef: MatDialogRef<ZelleInfoDialogComponent>, public languageService: LanguageService) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
