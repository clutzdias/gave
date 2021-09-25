import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginausuarioComponent } from './paginausuario.component';

describe('PaginausuarioComponent', () => {
  let component: PaginausuarioComponent;
  let fixture: ComponentFixture<PaginausuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginausuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
