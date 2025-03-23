import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AFCUInfoDialogComponent } from './afcuinfo-dialog.component';

describe('AFCUInfoDialogComponent', () => {
  let component: AFCUInfoDialogComponent;
  let fixture: ComponentFixture<AFCUInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AFCUInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AFCUInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
