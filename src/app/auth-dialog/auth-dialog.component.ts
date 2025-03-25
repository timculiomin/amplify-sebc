import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Subscription } from 'xstate';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnDestroy {
  private authSub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    public authenticator: AuthenticatorService
  ) {
    this.authSub = this.authenticator.subscribe((state) => {
      if (state.authStatus === 'authenticated') {
        this.dialogRef.close();
      }
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
