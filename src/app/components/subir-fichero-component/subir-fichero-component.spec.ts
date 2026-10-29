import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirFicheroComponent } from './subir-fichero-component';

describe('SubirFicheroComponent', () => {
  let component: SubirFicheroComponent;
  let fixture: ComponentFixture<SubirFicheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubirFicheroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFicheroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
