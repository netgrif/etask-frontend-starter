import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EtaskTabViewComponent} from './etask-tab-view.component';
import { BooleanField, FilterField, FilterType, GroupNavigationConstants, NAE_NAVIGATION_ITEM_TASK_DATA, NAE_TAB_DATA, TextField, UserFilterConstants } from '@netgrif/components-core';
import { RouterTestingModule } from '@angular/router/testing';

describe('EtaskTabViewComponent', () => {
  let component: EtaskTabViewComponent;
  let fixture: ComponentFixture<EtaskTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtaskTabViewComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: NAE_NAVIGATION_ITEM_TASK_DATA,
          useValue: [
              {
                  fields: [
                      new TextField(
                          GroupNavigationConstants.NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX,
                          '',
                          'nav item title',
                          {visible: true}
                      ),
                      new BooleanField(
                          GroupNavigationConstants.NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX,
                          '',
                          false,
                          {visible: true}
                      )
                  ]
              },
              {
                  fields: [
                      new FilterField(
                          UserFilterConstants.FILTER_FIELD_ID,
                          '',
                          '',
                          {
                              filterType: FilterType.CASE,
                              predicateMetadata: [],
                              searchCategories: []
                          },
                          [],
                          {visible: true},
                          '',
                          ''
                      )
                  ]
              }
          ]
      }
      ],
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
