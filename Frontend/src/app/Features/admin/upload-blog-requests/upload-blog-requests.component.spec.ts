import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBlogRequestsComponent } from './upload-blog-requests.component';

describe('UploadBlogRequestsComponent', () => {
  let component: UploadBlogRequestsComponent;
  let fixture: ComponentFixture<UploadBlogRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadBlogRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBlogRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
