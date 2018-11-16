import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages/module/flash-messages.service";
import {User} from "../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  confirmationPassword: string;

  constructor( private authService: AuthService, private flashService: FlashMessagesService, private  router: Router) {
    this.confirmationPassword = null;
  }

  ngOnInit() {
  }

  checkPassword(): boolean {
    return this.user.password === this.confirmationPassword;
  }
  onRegisterSubmit(): void {
   this.flashService.grayOut(true);
    if (this.user.validateUser()){
     if (this.user.validateEmail()){
       if(this.checkPassword()){
        this.authService.register(this.user).subscribe(res => {
          if(res.success){
            this.flashService.show(`Success! Welcome ${this.user.username}.`, { cssClass: 'flash-minimal-success' , timeout: 3000 });
            this.router.navigate(['/login']).catch(err => console.error(err));
          }else {
            this.flashService.show(`Error! ${res.message}`, { cssClass: 'flash-minimal-error' , timeout: 3000 });
          }
        });
       }else {
         this.flashService.show(`Error! Passwords doesn't match, please make sure to confirm your password.`, { cssClass: 'flash-minimal-error' , timeout: 3000 });
       }
     }else {
       this.flashService.show(`Error! Please use a valid email address. This format ${this.user.email} is invalid.`, { cssClass: 'flash-minimal-error' , timeout: 3000 });

     }
    }else {
      this.flashService.show('Error! Please fill all the fields.', { cssClass: 'flash-minimal-error' , timeout: 3000 });
    }
  }

}
