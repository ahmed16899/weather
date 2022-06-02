import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { WorldweatherService } from 'src/app/Services/worldweather.service';

@Component({
  selector: 'app-cityweather',
  templateUrl: './cityweather.component.html',
  styleUrls: ['./cityweather.component.css']
})
export class CityweatherComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute,private _worldweatherService:WorldweatherService ) { }
  climateAverages: any[] = []
  allResponseData:any={};
  svg!: any;
  icons!: string;
  city:string="";
  margin: number = 50;
  width: number = 450 - (this.margin * 2);
  height: number = 400 - (this.margin * 2);
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((response)=>{
      console.log(response['city']);
      console.log(response['code']);   
      this.icons = this._worldweatherService.flagIcon+response['code']
      console.log(this.icons)
      this.city=response['city'];
    })
    this._ActivatedRoute.data.subscribe((data) => {
    //  console.log(data['weather'].data) //ClimateAverages
      this.allResponseData=data['weather'].data;
      console.log( this.allResponseData)
      //this.city=data['city'].location.city
      this.climateAverages = data['weather'].data.ClimateAverages[0].month
      //console.log( this.staties)
    })
    this.createSvg('#bar');
    this.drawBars(this.climateAverages,'absMaxTemp');
    this.createSvg('#bar1');
    this.drawBars(this.climateAverages,'avgMinTemp');
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

  drawBars(data: any[],type:string): void
   {
    // Create the X-axis band scale
     const x =  d3.scaleBand()
     .range([0, this.width])
     .domain(data.map(d => d.name))
     .padding(0.2);
    /*if(window.innerWidth>770)
    {
       x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);
    }
    else
    {
        x = d3.scaleBand()
      .range([0, this.width/2])
      .domain(data.map(d => d.name))
      .padding(0.2);
    }
    /*window.addEventListener('resize',function(){
    });*/

   

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
  print(date:string)
  {
    console.log(this.city )
   
   
    this._worldweatherService.getPast(this.city,date).subscribe((response)=>{
      console.log(response)
    });
  }

}
