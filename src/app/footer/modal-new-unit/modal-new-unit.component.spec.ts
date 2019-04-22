import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewUnitComponent } from './modal-new-unit.component';

describe('ModalNewUnitComponent', () => {
  let component: ModalNewUnitComponent;
  let fixture: ComponentFixture<ModalNewUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
