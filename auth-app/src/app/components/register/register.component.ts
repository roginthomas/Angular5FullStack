import { Component, OnInit } from '@angular/core';
import { ValidateService}  from '../../services/validate.service';
import {FlashMessage} from 'angular-flash-message';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username: String;
  email: String ;
  password: String ;
  role : String;

  constructor(
    //Everytime when we use Service on the component we need to inject it on the constructor 
    private validateService:ValidateService, 
    private authService:AuthService, 
    private flashMessage: FlashMessage,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  onRegisterSubmit(){
    //Here we are getting data from the form   name: this.name
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role ='level1'

    }
    //console.log(this.role);
    //Required Field Checking if all the fields have data in the form 
    if(!this.validateService.validateRegister(user)){
      //console.log('Please fill in all fields');
      this.flashMessage.danger('Please fill in all fields');
       return false;
     }

     //Required Field check if the email is in a good format 
     if(!this.validateService.validateEmail(user.email)){
      //console.log('Please fill vaild email');
      this.flashMessage.danger('Please use a valid email');
      return false;
    }

    
    //Register User 
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.success('You are now registered and can Login');
        this.router.navigate(['/login'])
      }else{
        this.flashMessage.danger('something went wrong ');
        this.router.navigate(['/register'])
      }
    })
    
     
  }


   


}
