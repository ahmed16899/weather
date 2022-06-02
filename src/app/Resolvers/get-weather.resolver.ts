import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WorldweatherService } from '../Services/worldweather.service';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherResolver implements Resolve<boolean> {
  constructor(private _worldweatherService:WorldweatherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const city = JSON.stringify(route.paramMap.get('city')) ;
    console.log(city);
    return this._worldweatherService.getWeather(city);
  }
}