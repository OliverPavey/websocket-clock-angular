import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHolderComponent } from './clock-holder.component';

describe('ClockHolderComponent', () => {
  let component: ClockHolderComponent;
  let fixture: ComponentFixture<ClockHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
