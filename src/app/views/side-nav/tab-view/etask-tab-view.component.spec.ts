import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EtaskTabViewComponent} from './etask-tab-view.component';

describe('CustomTabViewComponentComponent', () => {
  let component: EtaskTabViewComponent;
  let fixture: ComponentFixture<EtaskTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtaskTabViewComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtaskTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
