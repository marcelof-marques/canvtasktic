import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBackgroundComponent } from './grid-background.component';

describe('GridBackgroundComponent', () => {
  let component: GridBackgroundComponent;
  let fixture: ComponentFixture<GridBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
