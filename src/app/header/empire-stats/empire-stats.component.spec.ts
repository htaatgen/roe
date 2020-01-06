import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpireStatsComponent } from './empire-stats.component';

describe('EmpireStatsComponent', () => {
  let component: EmpireStatsComponent;
  let fixture: ComponentFixture<EmpireStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpireStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpireStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
