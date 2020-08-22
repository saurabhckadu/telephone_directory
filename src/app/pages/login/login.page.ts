import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NavController } from '@ionic/angular';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  result:any
  userName:string="saurabh"
  password:string="SaurabhKadu20"
  isChecked=false
  loginValidate: FormGroup;
  constructor(private http:HttpService,private navCtrl:NavController,private commonFunction:CommonFunctionService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    if(localStorage.getItem('rememberMe')=="1"){
      this.userName=localStorage.getItem('name')
      this.password=localStorage.getItem('password')
      this.isChecked=true
    }
    else{
      this.userName=""
      this.password=""
      this.isChecked=false
    }
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
  ionViewWillEnter(){
    console.log("call")
  }
  login(){
    if(this.isChecked){
      localStorage.setItem('name',this.userName)
      localStorage.setItem('password',this.password)
      localStorage.setItem('rememberMe',"1")
    }
    let flag=0
    for(let i=0;i<this.result.length;i++){
      if(this.result[i].user_name==this.userName ){
        if(this.result[i].password==this.password ){
            flag=0;
            this.commonFunction.setData({"result":this.result[i],"index":i})
            break;
        }
        else{
            flag=1;
        }
      }
      else{
          flag=2;
      }
    }
    if(flag==0){
      this.navCtrl.navigateRoot('/home')
    }
    else if(flag==1){
      this.commonFunction.presentToast("Password is invalid")
    }
    else if(flag==2){
      this.commonFunction.presentToast("Username is invalid")
    }
  }
  rememberMe(event){
    console.log(event.detail.checked)
    if(event.detail.checked && this.userName !="" && this.password !=""){
      localStorage.setItem('name',this.userName)
      localStorage.setItem('password',this.password)
      localStorage.setItem('rememberMe',"1")
    }
    else{
      localStorage.setItem('rememberMe',"0")
    }
  }

}
