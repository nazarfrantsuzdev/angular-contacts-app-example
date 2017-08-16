import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../../core/models/contact';
import {ActionsSubject, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

import * as contactsActions from '../store/actions/contacts-actions'
import * as fromRootStore from '../../../store';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass']
})
export class ContactNewComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;

  constructor(
    private store: Store<fromRootStore.State>,
    private router: Router,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit() {
    this.redirectSub = this.actionsSubject
        .asObservable()
        .filter(action => action.type === contactsActions.CREATE_SUCCESS)
        .subscribe((action: contactsActions.CreateSuccess) => this.router.navigate(['/contacts', action.payload.id]));

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new contactsActions.Create(contact));
  }

}