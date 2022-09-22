import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { IBoat, ICreateBoatDTO, IUpdateBoatDTO } from 'src/app/interfaces/boat';
import { BoatErrorNotificationService } from 'src/app/services/boat/boat-error-notification/boat-error-notification.service';
import { BoatService } from 'src/app/services/boat/boat.service';

import UtilsDate from 'src/app/utils/utilsDate';

@Component({
  selector: 'app-boat-create-update-modal',
  templateUrl: './boat-create-update-modal.component.html',
  styleUrls: ['./boat-create-update-modal.component.scss']
})
export class BoatCreateUpdateModalComponent implements OnInit {

  constructor(
    private _boatService: BoatService,
    private _boatErrorNotification: BoatErrorNotificationService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.boatForm = this.fb.group({
      boatName: ['', Validators.required],
      enrollment: ['', Validators.required],
      distinguishingMark: ['', Validators.required],
      hullMaterial: ['', Validators.required],
      boatType: ['', Validators.required],
      service: ['', Validators.required],
      specificExploitation: ['', Validators.required],
      enrollmentDate: ['', Validators.required],
      constructionDate: ['', Validators.required],
      nat: ['', Validators.required],
      nan: ['', Validators.required],
      eslora: ['', Validators.required],
      manga: ['', Validators.required],
      puntal: ['', Validators.required],
      peopleTransported: ['', Validators.required],
      boatPower: ['', Validators.required],
      electricPower: ['', Validators.required]
    })
  }

  @Input() isUpdate!: boolean;
  @Input() idBoatClicked: string | null = null;
  @Input() idCompanySelected: string | null = null;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  clickModal: boolean = false;
  titleText: string = "";
  btnText: string = "";

  isLoading: boolean = false;

  boatForm: FormGroup;

  createBoatSubscription: Subscription | undefined;
  updateBoatSubscription: Subscription | undefined;
  getBoatByIdSubscription: Subscription | undefined;


  public ngOnInit(): void {

    this.titleText = "AÑADIR LANCHA";
    this.btnText = "AÑADIR";

    if (this.isUpdate && this.idBoatClicked) {

      this.titleText = "EDITAR LANCHA";
      this.btnText = "EDITAR"

      this.getBoatByIdSubscription = this.getBoatById(this.idBoatClicked);
    }
  }

  public ngOnDestroy(): void {
    this.createBoatSubscription?.unsubscribe();
    this.updateBoatSubscription?.unsubscribe();
    this.getBoatByIdSubscription?.unsubscribe();
  }

  public closeModal(isSendRequest: boolean = false): void {

    if (this.clickModal == false && !this.isLoading) {

      this.boatForm.reset();
      this.closeModalEvent.emit(isSendRequest);
    }
    this.clickModal = false;
  }

  public onSubmit(): void {

    let boat: ICreateBoatDTO | IUpdateBoatDTO = this.getFormData();

    if (this.isUpdate && this.idBoatClicked) {
      boat = {
        idBoat: this.idBoatClicked,
        ...boat
      };

      this.updateBoatSubscription = this.updateBoat(boat);
      return;
    }

    this.createBoatSubscription = this.createBoat(boat);
  }


  private createBoat(boat: ICreateBoatDTO): Subscription {
    this.isLoading = true;
    return this._boatService.createBoat(boat).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Lancha creada.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._boatErrorNotification.create();
      }
    });
  }

  private updateBoat(boat: IUpdateBoatDTO): Subscription {
    this.isLoading = true;

    return this._boatService.updateBoat(boat).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Lancha actualizada.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._boatErrorNotification.update();
      }
    })
  }

  private getBoatById(idBoat: string): Subscription {
    this.isLoading = true;
    return this._boatService.getBoatById(idBoat).subscribe({
      next: response => {
        const boat: IBoat = response.data;

        this.isLoading = false;
        this.setFormValues(boat);
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._boatErrorNotification.getById();
      }
    })
  }

  private getFormData(): ICreateBoatDTO {

    let enrollmentDate: string = this.boatForm.get('enrollmentDate')?.value;
    let constructionDate: string = this.boatForm.get('constructionDate')?.value;
    enrollmentDate = UtilsDate.formatDateToYYYYMMDD(enrollmentDate);
    constructionDate = UtilsDate.formatDateToYYYYMMDD(constructionDate);

    const enrollmentTimestamp: number = UtilsDate.dateToTimestamp(new Date(enrollmentDate));
    const constructionTimestamp: number = UtilsDate.dateToTimestamp(new Date(constructionDate));

    const boat: ICreateBoatDTO = {
      idCompany: this.idCompanySelected == null ? "" : this.idCompanySelected,
      boatName: this.boatForm.get('boatName')?.value,
      enrollment: this.boatForm.get('enrollment')?.value,
      distinguishingMark: this.boatForm.get('distinguishingMark')?.value,
      hullMaterial: this.boatForm.get('hullMaterial')?.value,
      boatType: this.boatForm.get('boatType')?.value,
      service: this.boatForm.get('service')?.value,
      specificExploitation: this.boatForm.get('specificExploitation')?.value,
      enrollmentDate: enrollmentTimestamp,
      constructionDate: constructionTimestamp,
      nat: parseInt(this.boatForm.get('nat')?.value),
      nan: parseInt(this.boatForm.get('nan')?.value),
      eslora: this.boatForm.get('eslora')?.value,
      manga: this.boatForm.get('manga')?.value,
      puntal: this.boatForm.get('puntal')?.value,
      peopleTransported: this.boatForm.get('peopleTransported')?.value,
      boatPower: this.boatForm.get('boatPower')?.value,
      electricPower: this.boatForm.get('electricPower')?.value,
    };

    return boat;
  }

  private setFormValues(boat: IBoat): void {
    let enrollmentTimestamp = boat.EnrollmentDate
    let constructionTimestamp = boat.ConstructionDate;

    let enrollmentDate: string = "";
    let constructionDate: string = "";

    if (enrollmentTimestamp) {
      enrollmentDate = UtilsDate.timestampToDate(enrollmentTimestamp);
    }
    if (constructionTimestamp) {
      constructionDate = UtilsDate.timestampToDate(constructionTimestamp);
    }

    this.boatForm.get('boatName')?.setValue(`${boat.BoatName}`);
    this.boatForm.get('enrollment')?.setValue(`${boat.Enrollment}`);
    this.boatForm.get('distinguishingMark')?.setValue(`${boat.DistinguishingMark}`);
    this.boatForm.get('hullMaterial')?.setValue(`${boat.HullMaterial}`);
    this.boatForm.get('boatType')?.setValue(`${boat.BoatType}`);
    this.boatForm.get('service')?.setValue(`${boat.Service}`);
    this.boatForm.get('specificExploitation')?.setValue(`${boat.SpecificExploitation}`);
    this.boatForm.get('enrollmentDate')?.setValue(`${enrollmentDate}`);
    this.boatForm.get('constructionDate')?.setValue(`${constructionDate}`);
    this.boatForm.get('nat')?.setValue(`${boat.NAT}`);
    this.boatForm.get('nan')?.setValue(`${boat.NAN}`);
    this.boatForm.get('eslora')?.setValue(`${boat.Eslora}`);
    this.boatForm.get('manga')?.setValue(`${boat.Manga}`);
    this.boatForm.get('puntal')?.setValue(`${boat.Puntal}`);
    this.boatForm.get('peopleTransported')?.setValue(`${boat.PeopleTransported}`);
    this.boatForm.get('boatPower')?.setValue(`${boat.BoatPower}`);
    this.boatForm.get('electricPower')?.setValue(`${boat.ElectricPower}`);

  }
}
