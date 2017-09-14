import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';

@Injectable()
export class EventService {
  events: FirebaseListObservable<Event[]>;
  event: FirebaseObjectObservable<any>;

  constructor(private _af: AngularFireDatabase) {
    this.events = this._af.list('/events');
  }

  getEvents(){
    return this.events;
  }
}