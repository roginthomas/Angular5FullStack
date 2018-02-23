import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FlashMessage} from 'angular-flash-message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//Component properties 
  username : string;
  password: string ;
  constructor(
    private authService:AuthService,
     private router:Router,
     private flashMessage: FlashMessage
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    //console.log(this.username)
    // we will be submithing this to our database 
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      //console.log(data);
          if(data.success){
           this.authService.storeUserData(data.token, data.user);
           this.flashMessage.success("You are now logged in");
           this.router.navigate(['dashboard']);
         }else{
         this.flashMessage.danger(data.msg);
         this.router.navigate(['login']);
         }
    });

  }
}
