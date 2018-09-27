import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoSucursalComponent } from './ingreso-sucursal.component';

describe('IngresoSucursalComponent', () => {
  let component: IngresoSucursalComponent;
  let fixture: ComponentFixture<IngresoSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
