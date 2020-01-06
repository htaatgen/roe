import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpiresComponent } from './empires.component';

describe('EmpiresComponent', () => {
  let component: EmpiresComponent;
  let fixture: ComponentFixture<EmpiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
