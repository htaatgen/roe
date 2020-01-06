import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResearchComponent } from './list-research.component';

describe('ListResearchComponent', () => {
  let component: ListResearchComponent;
  let fixture: ComponentFixture<ListResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
