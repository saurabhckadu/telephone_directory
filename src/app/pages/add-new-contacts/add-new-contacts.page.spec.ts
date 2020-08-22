import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewContactsPage } from './add-new-contacts.page';

describe('AddNewContactsPage', () => {
  let component: AddNewContactsPage;
  let fixture: ComponentFixture<AddNewContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
