import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArmiesComponent } from './list-armies.component';

describe('ListArmiesComponent', () => {
  let component: ListArmiesComponent;
  let fixture: ComponentFixture<ListArmiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArmiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArmiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
