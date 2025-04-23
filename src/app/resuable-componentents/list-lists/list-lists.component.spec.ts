import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListsComponent } from './list-lists.component';

describe('ListListsComponent', () => {
  let component: ListListsComponent;
  let fixture: ComponentFixture<ListListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
