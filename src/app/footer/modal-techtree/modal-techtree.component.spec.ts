import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTechtreeComponent } from './modal-techtree.component';

describe('ModalTechtreeComponent', () => {
  let component: ModalTechtreeComponent;
  let fixture: ComponentFixture<ModalTechtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTechtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTechtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
