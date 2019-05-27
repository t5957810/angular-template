import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDesignComponent } from './css-design.component';

describe('CssDesignComponent', () => {
  let component: CssDesignComponent;
  let fixture: ComponentFixture<CssDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
