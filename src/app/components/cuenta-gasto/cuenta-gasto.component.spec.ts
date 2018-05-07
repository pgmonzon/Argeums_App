import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaGastoComponent } from './cuenta-gasto.component';

describe('CuentaGastoComponent', () => {
  let component: CuentaGastoComponent;
  let fixture: ComponentFixture<CuentaGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
