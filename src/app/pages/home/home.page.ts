import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  result: any
  result1: any
  name: any = []
  copyData:any=[]
  constructor(private http: HttpService, private commonFunction: CommonFunctionService, private actionSheetController: ActionSheetController, private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {
    this.commonFunction.setSelectedPage("home")
    try {
      this.result1 = this.commonFunction.getData()
      this.http.fetchUsers()
        .subscribe((data) => {
          this.result = data.map(value => {
            return {
              id: value.payload.doc.id,
              user_name: value.payload.doc.data()['user_name'],
              password: value.payload.doc.data()['password'],
              email: value.payload.doc.data()['email'],
              contacts: value.payload.doc.data()['contacts'],
            }
          });
          this.name=[]
          if(this.result[this.result1.index].contacts !=undefined &&  this.result[this.result1.index].contacts.length>0){
          this.result[this.result1.index].contacts.filter(value => {
            console.log(value.name.fname + " " + value.name.lname)
            this.name.push({ "name": value.name.fname + " " + value.name.lname, "date": value.added_date,"mobile":value.mobile })
          });
          this.name.sort((a, b) => a.name.localeCompare(b.name))
          this.copyData=this.name
        }
        })
    }
    catch (error) {
      console.error();
    }
    
  }
  addContacts() {
    this.navCtrl.navigateForward('/add-new-contacts')
  }
  async sortList() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort by',
      cssClass: 'my-custom-class',
      mode: "ios",
      buttons: [{
        text: 'Name',
        handler: () => {
          this.copyData.sort((a, b) => a.name.localeCompare(b.name))
        }
      }, {
        text: 'Date',
        handler: () => {
          this.copyData.sort(function(a, b){
            var aa = a.date.split('/').reverse().join(),
                bb = b.date.split('/').reverse().join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });
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

  async viewDetails(item) {
    console.log(this.result[this.result1.index].contacts)
    let index=this.result[this.result1.index].contacts.map(e => e.mobile).indexOf(item.mobile);
    // .filter(term => {
    //   return term.mobile.toString().toLowerCase().trim().indexOf(item.mobile.toString().trim().toLowerCase()) > -1;
    // });
    console.log(index)
    let contactDetails = this.result[this.result1.index].contacts[index]
    this.result[this.result1.index].contacts[index].viewcount.push(new Date(Date.now()).toLocaleString().split(',')[0])
    this.http.addContact(this.result[this.result1.index].id, this.result[this.result1.index].contacts)
    console.log(contactDetails)
    this.commonFunction.setContactDetails({ "details": contactDetails, "index": index })
    this.navCtrl.navigateForward('/view-details-modal')
  }
  logout(){
    localStorage.clear()
    this.navCtrl.navigateRoot('/login')
  }
  searchList(ev: CustomEvent) {
    this.reasignData()
    const val = ev.detail.value;
    if( /^[a-zA-Z ]+$/.test(val.toString().trim())){
      if (val && val.trim() !== '') {
        this.copyData = this.copyData.filter(term => {
        return term.name.toLowerCase().trim().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
    }
    else{
      if (val && val.trim() !== '') {
        this.copyData = this.copyData.filter(term => {
        return term.mobile.toString().trim().toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
    }
  }
  reasignData(){
    this.copyData=this.name
     }
}
