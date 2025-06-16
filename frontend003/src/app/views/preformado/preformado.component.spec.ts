import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreformadoComponent } from './preformado.component';

describe('PreformadoComponent', () => {
  let component: PreformadoComponent;
  let fixture: ComponentFixture<PreformadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreformadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreformadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
