import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeSpaceComponent } from './shape-space.component';

describe('ShapeSpaceComponent', () => {
  let component: ShapeSpaceComponent;
  let fixture: ComponentFixture<ShapeSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
