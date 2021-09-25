import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTopicoComponent } from './form-topico.component';

describe('FormTopicoComponent', () => {
  let component: FormTopicoComponent;
  let fixture: ComponentFixture<FormTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTopicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
