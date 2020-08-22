import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;
  dateResult = [];
  result:any
  counts=[]
  totalCount=""
  createdDate=""
  updatedDate=""
  constructor(private commonFunction:CommonFunctionService,private nativePageTransitions: NativePageTransitions,private navCtrl:NavController) { }

  ngOnInit() {
    this.result=this.commonFunction.getContactDetails().details
    console.log(this.result)
    this.last7Days ()
  }
  ionViewDidEnter() {
    this.createBarChart();
  }
  findCount(){

  }
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dateResult.reverse(),
        datasets: [{
          label: 'last 7 days view',
          data: this.counts.reverse(),
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }
  
  last7Days () {
    let count=0;
    let tcount=0;
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        let date=d.toLocaleString().split(',')[0].split("/")
        this.dateResult.push(date[1]+"/"+date[0])
        this.result.viewcount.filter(value=>{
          if(value==d.toLocaleString().split(',')[0]){
            count++
            tcount++
          }
        });
        this.counts.push(count)
        count=0
    }
    this.totalCount="Total count : "+tcount
    this.createdDate="Created date : "+this.result.added_date
    this.updatedDate="Updated date : "+this.result.edited_date
}
closePage(){
  let option: NativeTransitionOptions={
    direction:'up',
    duration:600
  }
  this.nativePageTransitions.flip(option);
  this.navCtrl.navigateRoot('/view-details-modal')
}
}
