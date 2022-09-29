import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorSectionComponent } from './generator-section.component';

describe('GeneratorSectionComponent', () => {
  let component: GeneratorSectionComponent;
  let fixture: ComponentFixture<GeneratorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
