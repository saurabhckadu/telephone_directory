import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private collectionName = "users";

  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    
  ) { }

  createUser(formValues) {
    return this.firestore.collection(this.collectionName).add(formValues);
  }

  fetchUsers() {
    return this.firestore.collection(this.collectionName).snapshotChanges()
  }

  fetchUserConcts(id){
    return this.firestore.collection(this.collectionName).doc(id).get()
  }

  addContact(id,updated_array){
    return this.firestore.collection(this.collectionName).doc(id).update({'contacts':updated_array})
    .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  }); 
  }
  
}

