import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirPacienteComponent } from './inserir-paciente.component';

describe('InserirPacienteComponent', () => {
  let component: InserirPacienteComponent;
  let fixture: ComponentFixture<InserirPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
