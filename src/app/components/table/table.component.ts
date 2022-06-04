import { Component, Input, OnInit } from '@angular/core';
import { WorldweatherService } from 'src/app/Services/worldweather.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private _worldweatherService:WorldweatherService) { }
  @Input() allResponseData!:any;
  @Input() check!:boolean;
   @Input() pastDate!:string;
  // @Input() city!: string;
  @Input() allResponseHistoryData!:any;





  ngOnInit(): void {
   
  }

}
