import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SHowBlogComponent } from './show-blog.component';

describe('SHowBlogComponent', () => {
  let component: SHowBlogComponent;
  let fixture: ComponentFixture<SHowBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SHowBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SHowBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
