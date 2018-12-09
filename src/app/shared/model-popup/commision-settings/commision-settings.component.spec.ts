import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisionSettingsComponent } from './commision-settings.component';

describe('CommisionSettingsComponent', () => {
  let component: CommisionSettingsComponent;
  let fixture: ComponentFixture<CommisionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommisionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommisionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
