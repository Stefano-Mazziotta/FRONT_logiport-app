import { Component, Input, OnInit } from '@angular/core';
import { IExpiration } from 'src/app/interfaces/expiration';

@Component({
  selector: 'status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.scss']
})
export class StatusDetailComponent implements OnInit {

  constructor() { }

  @Input() daysToExpiration: number = 0;
  @Input() status: string = "";

  isHoverStatus: boolean = false;
  

  ngOnInit(): void {
  }

}
