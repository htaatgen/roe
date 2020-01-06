import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileArmiesComponent } from './tile-armies.component';

describe('TileArmiesComponent', () => {
  let component: TileArmiesComponent;
  let fixture: ComponentFixture<TileArmiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileArmiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileArmiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
