import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WorldweatherService {

  constructor(private _HttpClient:HttpClient) { }
  flagIcon: string = 'flag-icon-';
  getWeather(city:string):Observable<any>
  {
    return this._HttpClient.get(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=ca99870a796841efbbb204449222605&q=${city}&format=json&num_of_days=3`);
  }
  getUserCity():Observable<any>
  {
    return this._HttpClient.get(`https://api.ipregistry.co/?key=42ep5mel054rioc2`);
  }
  getPast(city:string,date:string):Observable<any>
  {
    return this._HttpClient.get(`http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ca99870a796841efbbb204449222605&q=${city}&format=json&date=${date}`);
  }

}
