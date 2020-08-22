import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import {DomSanitizer}from '@angular/platform-browser';

@Component({
  selector: 'app-view-details-modal',
  templateUrl: './view-details-modal.page.html',
  styleUrls: ['./view-details-modal.page.scss'],
})
export class ViewDetailsModalPage implements OnInit {
  photo="../../../assets/icon/defaultIcon.png"
result:any
index:any
phone=""
landline=""
email=""
notes=""
name="Saurabh Kadu"
date="Created : 20 Mar 2020"
totalView="Total view count : 20"

  constructor(private commonFunction:CommonFunctionService,private navCtrl:NavController,private http:HttpService,private nativePageTransitions: NativePageTransitions,private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.commonFunction.setSelectedPage("view")
    this.result=this.commonFunction.getContactDetails().details
    this.index=this.commonFunction.getContactDetails().index
    this.name=this.result.name.fname+" "+this.result.name.lname
    this.phone=this.result.mobile
    this.landline=this.result.landline
    this.email=this.result.email
    this.notes=this.result.notes
    this.photo=this.result.photo
    var newDate = moment(this.result.added_date, "DD/MM/YYYY").format("Do MMM YYYY");
    this.date="Created : "+newDate
    console.log(this.result+" "+this.index)
  }
  openHomePage(){
    this.commonFunction.setSelectedPage('home')
    this.navCtrl.navigateRoot('/home')
  }

  openEditPage(){
    this.commonFunction.setSelectedPage('view')
    this.navCtrl.navigateRoot('/add-new-contacts')
  }
  deleteContacts(){
    let fullResult=this.commonFunction.getData()
    console.log(fullResult.contacts)
    if (this.index > -1) {
      fullResult.result.contacts.splice(this.index, 1);
    }
    this.http.addContact(fullResult.result.id,fullResult.result.contacts)
    this.commonFunction.setSelectedPage('home')
    this.navCtrl.navigateRoot('/home')
  }
  viewHistory(){
    let option: NativeTransitionOptions={
      direction:'up',
      duration:600
    }
    this.nativePageTransitions.flip(option);
    this.navCtrl.navigateForward('/history')
  }
  sanatizeBase64Image(image) {
    if(image) {
      return this.DomSanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64,"+image);
    }
  }
}
