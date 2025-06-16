import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datamatrix42Component } from './datamatrix42.component';

describe('Datamatrix42Component', () => {
  let component: Datamatrix42Component;
  let fixture: ComponentFixture<Datamatrix42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datamatrix42Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datamatrix42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
