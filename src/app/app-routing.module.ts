import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityweatherComponent } from './components/cityweather/cityweather.component';
import { HomeComponent } from './components/home/home.component';
import { GetWeatherResolver } from './Resolvers/get-weather.resolver';
import { HomerResolver } from './Resolvers/homer.resolver';

const routes: Routes = [
  {path:'',component:HomeComponent,resolve:{city:HomerResolver}}, //
  {path:'weather/:code/:country/:city',component:CityweatherComponent,resolve:{weather:GetWeatherResolver}} //


  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
