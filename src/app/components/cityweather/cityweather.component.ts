import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorldweatherService } from 'src/app/Services/worldweather.service';

@Component({
  selector: 'app-cityweather',
  templateUrl: './cityweather.component.html',
  styleUrls: ['./cityweather.component.css']
})
export class CityweatherComponent implements OnInit , OnDestroy {

  constructor(private _ActivatedRoute: ActivatedRoute,private _worldweatherService:WorldweatherService ) { }
  climateAverages: any[] = []
  allResponseData:any={};
  allResponseHistoryData!:any;
  pastDate:string=''
  icons!: string;
  city:string="";
  subscription = new Subscription;
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((response)=>{
      this.icons = this._worldweatherService.flagIcon+response['code']
      this.city=response['city'];
    })
    //get data of weather of selected city
    this._ActivatedRoute.data.subscribe((data) => {
      this.allResponseData=data['weather'].data;
      this.climateAverages = data['weather'].data.ClimateAverages[0].month
    })
    //call drawing graphs functions
    this._worldweatherService.createSvg('#bar');
    this._worldweatherService.drawBars(this.climateAverages,'absMaxTemp');
    this._worldweatherService.createSvg('#bar1');
    this._worldweatherService.drawBars(this.climateAverages,'avgMinTemp');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPastWeather(date:any)
  {
    this.pastDate=date
    this._worldweatherService.getPast(this.city,date).subscribe((response)=>{
      this.allResponseHistoryData=response;
    });
  }

}
