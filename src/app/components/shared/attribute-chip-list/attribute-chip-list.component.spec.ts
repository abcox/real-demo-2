import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeChipListComponent } from './attribute-chip-list.component';

describe('AttributeChipListComponent', () => {
  let component: AttributeChipListComponent;
  let fixture: ComponentFixture<AttributeChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeChipListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
