import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WildcardDashboardComponent } from './wildcard-dashboard.component';

describe('WildcardDashboardComponent', () => {
  let component: WildcardDashboardComponent;
  let fixture: ComponentFixture<WildcardDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WildcardDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WildcardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
