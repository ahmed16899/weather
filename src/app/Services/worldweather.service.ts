import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient} from '@angular/common/http';
import * as d3 from 'd3';


@Injectable({
  providedIn: 'root'
})
export class WorldweatherService {

  constructor(private _HttpClient:HttpClient) { }
  svg!: any;

  margin: number = 50;
    width: number = 450 - (this.margin * 2);
    height: number = 400 - (this.margin * 2);
  flagIcon: string = 'flag-icon-';
  getWeather(city:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=ca99870a796841efbbb204449222605&q=${city}&format=json&num_of_days=3`);
  }
  getUserCity():Observable<any>
  {
    return this._HttpClient.get(`https://api.ipregistry.co/?key=42ep5mel054rioc2`);
  }
  getPast(city:string,date:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ca99870a796841efbbb204449222605&q=${city}&format=json&date=${date}`);
  }
  createSvg(id:string): void 
  {
    this.svg = d3.select(id)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  drawBars(data: any[],type:string)
   {
    // Create the X-axis band scale
     const x =  d3.scaleBand()
     .range([0, this.width])
     .domain(data.map(d => d.name))
     .padding(0.2);
    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 50])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    if(type=='absMaxTemp')
    {
      this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { name: string; }) => x(d.name))
      .attr("y", (d: { absMaxTemp: d3.NumberValue; }) => y(d.absMaxTemp))
      .attr("width", x.bandwidth())
      .attr("height", (d: { absMaxTemp: d3.NumberValue; }) => this.height - y(d.absMaxTemp))
      .attr("fill", "#d04a35");
    }
    else
    {
      this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { name: string; }) => x(d.name))
      .attr("y", (d: { avgMinTemp: d3.NumberValue; }) => y(d.avgMinTemp))
      .attr("width", x.bandwidth())
      .attr("height", (d: { avgMinTemp: d3.NumberValue; }) => this.height - y(d.avgMinTemp))
      .attr("fill", "#2b8ae3");
    }
    
  }

}
