import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopuComponent } from './topu.component';

describe('TopuComponent', () => {
  let component: TopuComponent;
  let fixture: ComponentFixture<TopuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
