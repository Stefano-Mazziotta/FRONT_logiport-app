import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { IMotor } from 'src/app/interfaces/motor';
import { MotorErrorNotificationService } from 'src/app/services/motor/motor-error-notification/motor-error-notification.service';
import { MotorService } from 'src/app/services/motor/motor.service';

@Component({
  selector: 'app-motor-view-modal',
  templateUrl: './motor-view-modal.component.html',
  styleUrls: ['./motor-view-modal.component.scss']
})
export class MotorViewModalComponent implements OnInit {

  constructor(
    private _motorService: MotorService,
    private _motorErrorNotification: MotorErrorNotificationService
  ) { }

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() idMotorClicked: string | null = null;

  clickModal: boolean = false;
  isLoading: boolean = false;

  motor:IMotor = {
    IdMotor: '',
    IdBoat: '',
    Quantity: '',
    Brand: '',
    NumberMotor: 0,
    Model: '',
    Type: '',
    Power: '',
    Location: '',
    TimeSave: 0,
    TimeLastUpdate: 0,
    IsDeleted: false,
    TimeDeleted: 0
  }

  getMotorByIdSubscription: Subscription | undefined;

  ngOnInit(): void {
    const idMotor = this.idMotorClicked;
    if(idMotor){
      this.getMotorByIdSubscription = this.getMotorById(idMotor);
    }
  }

  ngOnDestroy(): void {
    this.getMotorByIdSubscription?.unsubscribe();
  }

  public closeModal(): void {

    if (this.clickModal == false) {
      this.closeModalEvent.emit();
    }
    this.clickModal = false;
  }

  private getMotorById(idMotor:string):Subscription{
    this.isLoading = true;
    return this._motorService.getMotorById(idMotor).subscribe({
      next: response => {
        this.isLoading = false;
        this.motor = response.data;
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._motorErrorNotification.getById();
      }
    });
  }

}
