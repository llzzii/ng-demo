import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSiderComponent } from './left-sider.component';

describe('LeftSiderComponent', () => {
  let component: LeftSiderComponent;
  let fixture: ComponentFixture<LeftSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
