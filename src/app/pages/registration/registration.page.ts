import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { HttpService } from 'src/app/services/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public signinForm: FormGroup;
  result:any

  constructor(public formBuilder: FormBuilder, private commonFunction:CommonFunctionService, private http:HttpService,private navCtrl:NavController) {

    this.signinForm = formBuilder.group({
      user_name: new FormControl('', Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      password: new FormControl('', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9]{6,}$/)])),
    });
}

ngOnInit() {
  this.http.fetchUsers()
  .subscribe((data) => {
    this.result = data.map(value => {
      return {
        id: value.payload.doc.id,
        user_name: value.payload.doc.data()['user_name'],
        password: value.payload.doc.data()['password'],
        email:value.payload.doc.data()['email'],
        contacts:value.payload.doc.data()['contacts'],
      }
    });
    console.log(this.result)
  });
}
register() {
if(this.signinForm.invalid){
  this.commonFunction.presentToast("Please enter valid credentials")
}
else{
  let flag=0
  for(let i=0;i<this.result.length;i++){
    if(this.result[i].user_name==this.signinForm.value.email){
      this.commonFunction.presentToast("Email already taken")
      flag=0
      break
    }
    else{
      flag=1
    }
  }
  if(flag==1){
    let reqParameter={"user_name":this.signinForm.value.user_name,"password":this.signinForm.value.password,"contacts":[]}
    this.http.createUser(reqParameter)
    localStorage.clear()
    this.commonFunction.presentToast("Registered!!")
    this.navCtrl.navigateRoot('/login')
  }
}
}
}
