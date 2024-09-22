import { Component, Input, OnInit } from '@angular/core';
import { DashboardFilter } from '../../models/dashboard-request.model';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit {
  @Input() description: string;
  @Input() value: number;
  @Input() filters: DashboardFilter[];
  @Input() color: string = "black";

  constructor() { }

  ngOnInit(): void {
  }
}
