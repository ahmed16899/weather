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
  ) { }
  allResponseData: any = {};
  city!: string;
  country!: string;
  countryCode!: string;
  icon!: string;
  flagIcon: string = 'flag-icon-';
  countryCodelower!: string;
  staties: any[] = [];
  countries: any[] = [];



  ngOnInit(): void {
     this.countries=Country.getAllCountries()
     //detect country of user
     this._ActivatedRoute.data.subscribe((data) => {
      this.countryCode = data['city'].location.country.code
      this.country = data['city'].location.country.name
      this.countryCodelower = this.countryCode.toLowerCase();
      this.flagIcon += this.countryCodelower;
      this.staties = State.getStatesOfCountry(this.countryCode);
    })
         //get weather of this country
    this._worldweatherService.getWeather(this.country).subscribe((response) => {
      this.allResponseData = response.data
      this.icon = response.data.current_condition[0].weatherIconUrl[0].value;
    })
  }
selectCountry(countryNew:any)
{
    this.country =countryNew.name
    this.countryCode=countryNew.isoCode
    this.countryCodelower = this.countryCode.toLowerCase();
    this.flagIcon='flag-icon-';
    this.flagIcon += this.countryCodelower;
    this.staties = State.getStatesOfCountry(this.countryCode);
    this._worldweatherService.getWeather(this.country).subscribe((response) => {
    this.allResponseData = response.data
    this.icon = response.data.current_condition[0].weatherIconUrl[0].value;
   
  })
}

}
