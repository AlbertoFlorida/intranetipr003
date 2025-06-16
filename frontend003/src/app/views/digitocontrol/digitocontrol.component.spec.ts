import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitocontrolComponent } from './digitocontrol.component';

describe('DigitocontrolComponent', () => {
  let component: DigitocontrolComponent;
  let fixture: ComponentFixture<DigitocontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitocontrolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitocontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
