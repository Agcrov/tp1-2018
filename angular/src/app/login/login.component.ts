import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages/module/flash-messages.service";
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor( private authService: AuthService, private flashService: FlashMessagesService, private router: Router) { }

  ngOnInit() {
  }
  onLogin(): void{
    if (this.user.validateEmail() && this.user.password !== undefined){
      this.authService.authenticate(this.user.email,this.user.password).subscribe(res =>{
        if(res.success) {
          this.router.navigate(['/home']).catch(err => console.error(err));
        } else {
          this.flashService.show(`Error! ${res.message}.`, { cssClass: 'flash-minimal-error' , timeout: 3000 });
        }
      });


    }
  }
}
