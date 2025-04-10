import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBLogsByCategoriesComponent } from './show-blogs-by-categories.component';

describe('ShowBLogsByCategoriesComponent', () => {
  let component: ShowBLogsByCategoriesComponent;
  let fixture: ComponentFixture<ShowBLogsByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowBLogsByCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBLogsByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
