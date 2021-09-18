import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirTutorComponent } from './inserir-tutor.component';

describe('InserirTutorComponent', () => {
  let component: InserirTutorComponent;
  let fixture: ComponentFixture<InserirTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
