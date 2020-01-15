import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoadGameComponent } from './modal-load-game.component';

describe('ModalLoadGameComponent', () => {
  let component: ModalLoadGameComponent;
  let fixture: ComponentFixture<ModalLoadGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoadGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoadGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
