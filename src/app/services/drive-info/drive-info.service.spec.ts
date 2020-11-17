import { TestBed } from '@angular/core/testing';

import { DriveInfoService } from './drive-info.service';

describe('DriveInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriveInfoService = TestBed.get(DriveInfoService);
    expect(service).toBeTruthy();
  });
});
