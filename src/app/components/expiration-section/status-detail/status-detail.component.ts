import { Component, Input } from '@angular/core';
import { IExpiration } from 'src/app/interfaces/expiration';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.scss']
})
export class StatusDetailComponent {

  constructor() { }

  @Input() daysToExpiration: number = 0;
  @Input() status: string = "";

  isHoverStatus: boolean = false;

}
