import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorViewModalComponent } from './generator-view-modal.component';

describe('GeneratorViewModalComponent', () => {
  let component: GeneratorViewModalComponent;
  let fixture: ComponentFixture<GeneratorViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorViewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
