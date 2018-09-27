import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoSucursalComponent } from './remito-sucursal.component';

describe('RemitoSucursalComponent', () => {
  let component: RemitoSucursalComponent;
  let fixture: ComponentFixture<RemitoSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitoSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitoSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
