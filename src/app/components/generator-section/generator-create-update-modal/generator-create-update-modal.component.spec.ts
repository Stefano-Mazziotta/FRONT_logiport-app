import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorCreateUpdateModalComponent } from './generator-create-update-modal.component';

describe('GeneratorCreateUpdateModalComponent', () => {
  let component: GeneratorCreateUpdateModalComponent;
  let fixture: ComponentFixture<GeneratorCreateUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorCreateUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorCreateUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
