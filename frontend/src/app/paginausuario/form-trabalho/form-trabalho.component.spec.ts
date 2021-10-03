import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrabalhoComponent } from './form-trabalho.component';

describe('FormTrabalhoComponent', () => {
  let component: FormTrabalhoComponent;
  let fixture: ComponentFixture<FormTrabalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTrabalhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
