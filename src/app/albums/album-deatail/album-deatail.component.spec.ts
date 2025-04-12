import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDeatailComponent } from './album-deatail.component';

describe('AlbumDeatailComponent', () => {
  let component: AlbumDeatailComponent;
  let fixture: ComponentFixture<AlbumDeatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDeatailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumDeatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
