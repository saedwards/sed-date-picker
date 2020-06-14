import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedDatePickerComponent } from './sed-date-picker.component';

describe('SedDatePickerComponent', () => {
  let component: SedDatePickerComponent;
  let fixture: ComponentFixture<SedDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
