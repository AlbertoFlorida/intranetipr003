import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobadoresComponent } from './comprobadores.component';

describe('ComprobadoresComponent', () => {
  let component: ComprobadoresComponent;
  let fixture: ComponentFixture<ComprobadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprobadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComprobadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
