import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImgDialogComponent } from './subir-img-dialog.component';

describe('SubirImgDialogComponent', () => {
  let component: SubirImgDialogComponent;
  let fixture: ComponentFixture<SubirImgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirImgDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
