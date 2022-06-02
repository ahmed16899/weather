import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { WorldweatherService } from '../Services/worldweather.service';

@Injectable({
  providedIn: 'root'
})
export class HomerResolver implements Resolve<boolean> {
  constructor(private _worldweatherService:WorldweatherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._worldweatherService.getUserCity();
  }
}
