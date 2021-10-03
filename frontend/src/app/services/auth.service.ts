import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated$: BehaviorSubject<any> = new BehaviorSubject(false);

  public authenticate() {
    this.authenticated$.next(true);
  }

  public deauthenticate() {
    this.authenticated$.next(false);
  }
}
