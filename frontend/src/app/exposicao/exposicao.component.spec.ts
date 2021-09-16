import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposicaoComponent } from './exposicao.component';

describe('ExposicaoComponent', () => {
  let component: ExposicaoComponent;
  let fixture: ComponentFixture<ExposicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExposicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
