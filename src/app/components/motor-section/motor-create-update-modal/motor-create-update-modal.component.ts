import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { MotorErrorNotificationService } from 'src/app/services/motor/motor-error-notification/motor-error-notification.service';
import { MotorService } from 'src/app/services/motor/motor.service';
import { ICreateMotorDTO, IMotor, IUpdateMotorDTO } from 'src/app/interfaces/motor';

@Component({
  selector: 'app-motor-create-update-modal',
  templateUrl: './motor-create-update-modal.component.html',
  styleUrls: ['./motor-create-update-modal.component.scss']
})
export class MotorCreateUpdateModalComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private _motorService: MotorService,
    private _motorErrorNotification: MotorErrorNotificationService,
    private toastr: ToastrService
  ) {
    this.motorForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      brand: ['', Validators.required],
      numberMotor: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      power: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() isUpdate: boolean = false;
  @Input() idMotorClicked: string | null = null;
  @Input() idBoatSelected: string | null = null;

  motorForm: FormGroup;

  clickModal: boolean = false;
  titleText: string = "";
  btnText: string = "";

  isLoading: boolean = false;

  createMotorSubscription: Subscription | undefined;
  updateMotorSubscription: Subscription | undefined;
  getMotorByIdSubscription: Subscription | undefined;

  public ngOnInit(): void {

    this.titleText = "AÑADIR MOTOR";
    this.btnText = "AÑADIR";

    if (this.isUpdate && this.idMotorClicked) {
      this.getMotorByIdSubscription = this.getMotorById(this.idMotorClicked);

      this.titleText = "EDITAR MOTOR";
      this.btnText = "EDITAR"

    }
  }

  public ngOnDestroy(): void {
    this.createMotorSubscription?.unsubscribe();
    this.updateMotorSubscription?.unsubscribe();
    this.getMotorByIdSubscription?.unsubscribe();
  }

  public closeModal(isSendRequest: boolean = false): void {
    if (this.clickModal == false && !this.isLoading) {

      this.motorForm.reset();
      this.closeModalEvent.emit(isSendRequest);
    }

    this.clickModal = false;
  }

  public onSubmit(): void {
    let motor: ICreateMotorDTO | IUpdateMotorDTO = this.getFormData();

    if (this.isUpdate && this.idMotorClicked) {
      motor = {
        idMotor: this.idMotorClicked,
        ...motor
      };

      this.updateMotorSubscription = this.updateMotor(motor);
      return;
    }

    this.createMotorSubscription = this.createMotor(motor);
  }

  private getMotorById(idMotor: string): Subscription {
    this.isLoading = true;

    return this._motorService.getMotorById(idMotor).subscribe({
      next: response => {
        const motor: IMotor = response.data;

        this.isLoading = false;
        this.setFormValues(motor);
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._motorErrorNotification.getById();
      }
    });
  }

  private createMotor(motor: ICreateMotorDTO): Subscription {
    this.isLoading = true;
    return this._motorService.createMotor(motor).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Motor creado.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._motorErrorNotification.create();
      }
    });
  }

  private updateMotor(motor: IUpdateMotorDTO): Subscription {
    this.isLoading = true;

    return this._motorService.updateMotor(motor).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Motor actualizado.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._motorErrorNotification.update();
      }
    });
  }

  private getFormData(): ICreateMotorDTO {

    const motor: ICreateMotorDTO = {
      idBoat: this.idBoatSelected == null ? "" : this.idBoatSelected,
      quantity: this.motorForm.get('quantity')?.value,
      brand: this.motorForm.get('brand')?.value,
      numberMotor: this.motorForm.get('numberMotor')?.value,
      model: this.motorForm.get('model')?.value,
      type: this.motorForm.get('type')?.value,
      power: this.motorForm.get('power')?.value,
      location: this.motorForm.get('location')?.value
    };

    return motor;
  }

  private setFormValues(motor: IMotor): void {
    this.motorForm.get('quantity')?.setValue(`${motor.Quantity}`);
    this.motorForm.get('brand')?.setValue(`${motor.Brand}`);
    this.motorForm.get('numberMotor')?.setValue(`${motor.NumberMotor}`);
    this.motorForm.get('model')?.setValue(`${motor.Model}`);
    this.motorForm.get('type')?.setValue(`${motor.Type}`);
    this.motorForm.get('power')?.setValue(`${motor.Power}`);
    this.motorForm.get('location')?.setValue(`${motor.Location}`);
  }

}
