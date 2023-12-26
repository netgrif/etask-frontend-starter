import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ETaskDoubleDrawerComponent} from './e-task-double-drawer.component';

describe('ETaskDoubleDrawerComponent', () => {
  let component: ETaskDoubleDrawerComponent;
  let fixture: ComponentFixture<ETaskDoubleDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ETaskDoubleDrawerComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ETaskDoubleDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
