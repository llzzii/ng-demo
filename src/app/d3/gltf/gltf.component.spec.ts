import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GltfComponent } from './gltf.component';

describe('GltfComponent', () => {
  let component: GltfComponent;
  let fixture: ComponentFixture<GltfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GltfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
