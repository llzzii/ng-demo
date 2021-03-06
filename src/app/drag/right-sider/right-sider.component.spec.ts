import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSiderComponent } from './right-sider.component';

describe('RightSiderComponent', () => {
  let component: RightSiderComponent;
  let fixture: ComponentFixture<RightSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
