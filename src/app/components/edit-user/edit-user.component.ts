import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  currentUserEvents: Event[];
  user: User = {};
  id: string;

  constructor(
    private _userService: UserService,
    private _toastr: ToastsManager,
    private _router: Router,
    private _eventService: EventService
  ) {}

  /**
   * On load fetches user's ugly_id from local storage and user's events.
   *
   *
   * @memberOf EditUserComponent
   */
  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('currentUser'));
    this._userService.getUserProfile(this.id).subscribe(currentUser => {
      this.user = currentUser[0];
    });

    this._eventService.getEventsByUid(this.id).subscribe(userEvents => {
      this.currentUserEvents = userEvents;
    });
  }

  /**
   * Updates user profile and user events on submitEditProfile().
   *
   * @param {{ value: User; valid: boolean }} { value, valid }
   *
   * @memberOf EditUserComponent
   */
  submitEditProfile({ value, valid }: { value: User; valid: boolean }) {
    if (valid) {
      this._userService.updateUserProfile(this.id, value);
      this.currentUserEvents.forEach(event => {
        event.hostName = value.fullName;
        this._eventService.updateEvents(event.$key, event);
      });
      this._toastr.success('Profile & events successfully updated!!!');
      this._router.navigate(['/user-detail']);
    }
  }
}
