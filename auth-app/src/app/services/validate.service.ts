import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  
  //If any of those are indefined we Return False Else True 
  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

//Here we are validating Email format if it's correct .. it will return True if its a good email false if it's wrong 
  validateEmail(email){
    const  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
