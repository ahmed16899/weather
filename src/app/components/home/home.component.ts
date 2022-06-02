import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City, Country, State } from 'country-state-city';
import { WorldweatherService } from 'src/app/Services/worldweather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _worldweatherService: WorldweatherService
    , private _ActivatedRoute: ActivatedRoute
    , private _router: Router
  ) { }
  allResponseData: any = {};
  city!: string;
  country!: string;
  countryCode!: string;
  icon!: string;
  /*tempC!: string;
  icon!: string;
  windspeedKmph!: string;
  windspeedMiles!: string;
  winddir16Point!: string;
  humidity!: string;
  winddirDegree!: string;
  visibility!: string;
  pressure!: string;
  precipMM!: string;
  date!: string;
  avgtempC!: string;
  mintempC!: string;
  maxtempC!: string;
  sunHour!: string;
  totalSnow_cm!: string;*/
  flagIcon: string = 'flag-icon-';
  countryCodelower!: string;



  arr: any[] = [1, 2, 3]
  staties: any[] = [];
  cities: any = [];


  ngOnInit(): void {
    /* console.log(Country.getAllCountries() , "city")
     console.log(State.getStatesOfCountry('NL') , "city")
     console.log(City.getCitiesOfCountry('NL') , "city")*/

    this._ActivatedRoute.data.subscribe((data) => {
      //console.log(data)
      this.city = data['city'].location.city
      console.log(data['city'].location.country.name)
      this.countryCode = data['city'].location.country.code
      this.country = data['city'].location.country.name
      this.countryCodelower = this.countryCode.toLowerCase();
      this.flagIcon += this.countryCodelower;
      console.log(this.flagIcon);
      this.staties = State.getStatesOfCountry(this.countryCode);
    })
    //Get Yesterday Date
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    console.log(yesterdayDate.getDate(),yesterdayDate.getMonth()+1,yesterdayDate.getFullYear());

    this._worldweatherService.getWeather(this.city).subscribe((response) => {
      this.allResponseData = response.data
      this.icon = response.data.current_condition[0].weatherIconUrl[0].value;
      /*console.log(response.data)
      
      console.log(response.data.ClimateAverages)
      console.log(response.data.current_condition)
      this.tempC=response.data.current_condition[0].temp_C;//weatherDesc
      this.icon=response.data.current_condition[0].weatherIconUrl[0].value;
      this.windspeedKmph=response.data.current_condition[0].windspeedKmph; 
      this.windspeedMiles=response.data.current_condition[0].windspeedMiles;
      this.winddir16Point=response.data.current_condition[0].winddir16Point; 
      this.humidity=response.data.current_condition[0].humidity;
      this.winddirDegree=response.data.current_condition[0].winddirDegree;
      this.visibility=response.data.current_condition[0].visibility;
      this.pressure=response.data.current_condition[0].pressure;
      this.precipMM=response.data.current_condition[0].precipMM;
      
      console.log(response.data.request)
      console.log(response.data.weather)
      this.date=response.data.weather[0].date;
      this.avgtempC=response.data.weather[0].avgtempC;
      this.mintempC=response.data.weather[0].mintempC;
      this.maxtempC=response.data.weather[0].maxtempC;
      this.sunHour=response.data.weather[0].sunHour;
      this.totalSnow_cm=response.data.weather[0].totalSnow_cm;*/
    })
  }
  getdate() {
    let yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    console.log(yesterdayDate.toString());

    /*const timeStamp = new Date().getTime();
    const yesterdayTimeStamp = timeStamp - 24*60*60*1000;
    const yesterdayDate = new Date(yesterdayTimeStamp);
    console.log(new Date(new Date().getTime() - 24*60*60*1000));*/


    /*const today = new Date()
    const yesterday = new Date(today)
    
    yesterday.setDate(yesterday.getDate() - 1)
    
    today.toDateString()
    yesterday.toDateString()
    console.log(yesterday.getFullYear());*/




  }


}
