import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastViewerComponent } from './cast-viewer.component';

describe('CastViewerComponent', () => {
  let component: CastViewerComponent;
  let fixture: ComponentFixture<CastViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
