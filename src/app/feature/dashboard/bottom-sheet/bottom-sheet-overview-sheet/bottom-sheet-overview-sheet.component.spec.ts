import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview-sheet.component';

describe('BottomSheetOverviewSheetComponent', () => {
  let component: BottomSheetOverviewSheetComponent;
  let fixture: ComponentFixture<BottomSheetOverviewSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetOverviewSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetOverviewSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
