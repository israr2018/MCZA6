
import {Component,OnInit} from '@angular/core';
import {CarAdsFilterPipe} from './car_ads_filter'
import {CarAdService}   from '../services/carAd/carAd.service';
import { ICarAd } from './car_ad';
import { Jsonp } from '@angular/http';
@Component({

 
 templateUrl:'car_ads.component.html'
 

})
export class CarAdsComponent implements OnInit {
pageTitle:string="Car Ads List";
showImage:boolean=true;
adsFilter:string='Toyota';
carAds:any[];
constructor(private _carAdService:CarAdService){
}   
toggleImage():void{
    console.log("You clicked showImage button");
    this.showImage=!this.showImage;
}
ngOnInit(){
   
    this._carAdService.getCarAds().subscribe(resCarAds=>{
       this.carAds=resCarAds;
      
        
    },(error)=>{

        
    });
    
}
}