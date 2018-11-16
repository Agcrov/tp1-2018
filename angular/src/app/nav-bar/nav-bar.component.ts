import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private auth: AuthService) {
    this.isLoggedIn = this.auth.validateToken;
  }

  ngOnInit() {
    //TODO: find the way to always get isLoggedIn value, when you have a token stored and enter it doesn't get the value.
    //Subscribe don't get a value change if is the same as the previous value....
    this.auth.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  logout():void {
    this.auth.logOut();
  }

}
