import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWildcardComponent } from './movie-wildcard.component';

describe('MovieWildcardComponent', () => {
  let component: MovieWildcardComponent;
  let fixture: ComponentFixture<MovieWildcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieWildcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieWildcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
