import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesDetilsComponent } from './reques-detils.component';

describe('RequesDetilsComponent', () => {
  let component: RequesDetilsComponent;
  let fixture: ComponentFixture<RequesDetilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequesDetilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequesDetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
