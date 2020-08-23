import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrinksComponent } from './create-drinks.component';

describe('CreateDrinksComponent', () => {
  let component: CreateDrinksComponent;
  let fixture: ComponentFixture<CreateDrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
