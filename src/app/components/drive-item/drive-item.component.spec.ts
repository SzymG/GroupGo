import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveItemComponent } from './drive-item.component';

describe('DriveItemComponent', () => {
  let component: DriveItemComponent;
  let fixture: ComponentFixture<DriveItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
