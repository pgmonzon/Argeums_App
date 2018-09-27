import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionRemitoComponent } from './recepcion-remito.component';

describe('RecepcionRemitoComponent', () => {
  let component: RecepcionRemitoComponent;
  let fixture: ComponentFixture<RecepcionRemitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionRemitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionRemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
