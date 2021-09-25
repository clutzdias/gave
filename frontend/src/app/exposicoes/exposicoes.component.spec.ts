import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposicoesComponent } from './exposicoes.component';

describe('ExposicoesComponent', () => {
  let component: ExposicoesComponent;
  let fixture: ComponentFixture<ExposicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExposicoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
