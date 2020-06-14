import { TestBed } from '@angular/core/testing';

import { SedDatePickerService } from './sed-date-picker.service';

describe('SedDatePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SedDatePickerService = TestBed.get(SedDatePickerService);
    expect(service).toBeTruthy();
  });
});
