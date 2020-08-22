import { Injectable } from '@angular/core';
import { ToastController, iosTransitionAnimation } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {
  contactData:any
  contactDetails:any
  page=""
  constructor(private toastController:ToastController) { }

  
    async presentToast(message){
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position:"bottom",
        mode:"ios",
        color:"medium"
      });
      toast.present();
    }
  getData(){
    return this.contactData
  }
  setData(data){
    this.contactData=data
  }
  getContactDetails(){
    return this.contactDetails
  }
  setContactDetails(details){
    this.contactDetails=details
  }
  setSelectedPage(pageName){
    this.page=pageName
  }
  getSelectedPage(){
    return this.page
  }
}
