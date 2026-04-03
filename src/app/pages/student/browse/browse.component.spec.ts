import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBrowseComponent } from './browse.component';

describe('BrowseComponent', () => {
  let component: StudentBrowseComponent;
  let fixture: ComponentFixture<StudentBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBrowseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
