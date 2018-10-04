import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSucursalComponent } from './stock-sucursal.component';

describe('StockSucursalComponent', () => {
  let component: StockSucursalComponent;
  let fixture: ComponentFixture<StockSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
