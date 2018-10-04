import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockArticuloComponent } from './stock-articulo.component';

describe('StockArticuloComponent', () => {
  let component: StockArticuloComponent;
  let fixture: ComponentFixture<StockArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
