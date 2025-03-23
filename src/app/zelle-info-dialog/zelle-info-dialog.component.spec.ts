import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZelleInfoDialogComponent } from './zelle-info-dialog.component';

describe('ZelleInfoDialogComponent', () => {
  let component: ZelleInfoDialogComponent;
  let fixture: ComponentFixture<ZelleInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZelleInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZelleInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
