import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-add-new-contacts',
  templateUrl: './add-new-contacts.page.html',
  styleUrls: ['./add-new-contacts.page.scss'],
})
export class AddNewContactsPage implements OnInit {
 photo=""
 added_date=""
 edited_date=""
 sendRequest:any
 results:any
 contactDetails:any
 public fieldForm: FormGroup;
 constructor(private http:HttpService,private commonFunction:CommonFunctionService,private navCtrl:NavController,private formBuilder:FormBuilder,private camera: Camera, private actionSheetController: ActionSheetController) {
  this.fieldForm = this.formBuilder.group({
    fname: new FormControl('', Validators.compose([Validators.required,Validators.pattern(/^\S+\w{1,15}/)])),
    mname: new FormControl(''),
    lname: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
    mobile: new FormControl('', Validators.compose([Validators.pattern(/^[6-9]\d{9}$/),Validators.required])),
    landline: new FormControl('', Validators.compose([Validators.pattern(/\d{3}([- ]*)\d{7}/)])),
    notes: new FormControl(''),
  });
  }

 ngOnInit() {
   try {
     this.results = this.commonFunction.getData()
     if(this.commonFunction.getSelectedPage()=="view"){
       this.contactDetails=this.commonFunction.getContactDetails()
       console.log(this.contactDetails)
      this.fieldForm = this.formBuilder.group({
        fname:this.contactDetails.details.name.fname,
        mname: this.contactDetails.details.name.mname,
        lname: this.contactDetails.details.name.lname,
        email:this.contactDetails.details.email,
        mobile:this.contactDetails.details.mobile,
        landline:this.contactDetails.details.landline,
        notes:this.contactDetails.details.notes
      });
     }
   }
   catch (error) {
     console.error();
   }
 }
 submitValue(){
   if(this.fieldForm.valid){
     if(this.commonFunction.getSelectedPage()=="home"){
      this.added_date=moment(new Date(Date.now()).toLocaleString().split(',')[0], "MM/DD/YYYY").format("DD/MM/YYYY");
    let contactValue={"added_date":this.added_date,"edited_date":this.edited_date,"email":this.fieldForm.value.email,"landline":this.fieldForm.value.landline,"mobile":this.fieldForm.value.mobile,"name":{"fname":this.fieldForm.value.fname,"lname":this.fieldForm.value.lname,"mname":this.fieldForm.value.mname},"viewcount":[],"notes":this.fieldForm.value.notes}
    console.log(contactValue)
     this.results.result.contacts.push(contactValue)
      this.http.addContact(this.results.result.id,this.results.result.contacts)
      this.commonFunction.setSelectedPage("home")
   this.navCtrl.navigateRoot('/home')
     }
     else{
      this.added_date=moment(new Date(Date.now()).toLocaleString().split(',')[0], "MM/DD/YYYY").format("DD/MM/YYYY");
      let contactValue={"added_date":this.contactDetails.details.added_date,"edited_date":this.added_date,"email":this.fieldForm.value.email,"landline":this.fieldForm.value.landline,"mobile":this.fieldForm.value.mobile,"name":{"fname":this.fieldForm.value.fname,"lname":this.fieldForm.value.lname,"mname":this.fieldForm.value.mname},"viewcount":this.contactDetails.details.viewcount,"notes":this.fieldForm.value.notes}
      console.log(contactValue)
      this.results.result.contacts[this.contactDetails.index]=contactValue
        this.http.addContact(this.results.result.id,this.results.result.contacts)
        this.commonFunction.setSelectedPage("home")
     this.navCtrl.navigateRoot('/home')
     }
   }
   else{
     this.commonFunction.presentToast('Please fill all required field')
   }
 }
 openHomePage(){
  this.commonFunction.setSelectedPage("home")
  this.navCtrl.navigateRoot('/home')
 }
 async getImage(){
  const actionSheet = await this.actionSheetController.create({
    cssClass: 'my-custom-class',
    mode: "ios",
    buttons: [{
      text: 'Camera',
      handler: () => {
        this.openCamera()
      }
    }, {
      text: 'Gallery',
      handler: () => {
        this.openCamera()
      }
    },
    {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
 }
 openCamera(){
   const options: CameraOptions = {
  quality: 50,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 let base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {

});
 }
}
