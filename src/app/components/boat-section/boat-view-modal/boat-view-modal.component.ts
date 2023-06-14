import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoat } from 'src/app/interfaces/boat';
import { BoatErrorNotificationService } from 'src/app/services/boat/boat-error-notification/boat-error-notification.service';
import { BoatService } from 'src/app/services/boat/boat.service';

@Component({
  selector: 'app-boat-view-modal',
  templateUrl: './boat-view-modal.component.html',
  styleUrls: ['./boat-view-modal.component.scss']
})
export class BoatViewModalComponent implements OnInit, OnDestroy {

  constructor(
    private _boatService: BoatService,
    private _boatErrorNotification: BoatErrorNotificationService,
  ) {

  }

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() idBoatClicked: string | null = null;

  clickModal: boolean = false;
  isLoading: boolean = false;

  boat: IBoat = {
    IdBoat: '',
    IdCompany: 0,
    BoatName: '',
    Enrollment: '',
    DistinguishingMark: '',
    HullMaterial: '',
    BoatType: '',
    Service: '',
    SpecificExploitation: '',
    EnrollmentDate: 0,
    ConstructionDate: 0,
    NAT: 0,
    NAN: 0,
    Eslora: 0,
    Manga: 0,
    Puntal: 0,
    PeopleTransported: 0,
    BoatPower: '',
    ElectricPower: '',
    IsDeleted: null,
    TimeSave: null,
    TimeDeleted: null,
    TimeLastUpdate: null
  }

  getBoatByIdSubscription: Subscription | undefined;

  public ngOnInit(): void {
    
    const idBoat = this.idBoatClicked;
    if(idBoat){
      this.getBoatByIdSubscription = this.getBoatById(idBoat);
    }

  }

  public ngOnDestroy(): void {
    this.getBoatByIdSubscription?.unsubscribe();
  }

  public closeModal(): void {
    this.clickModal = false;
    if (this.clickModal == false) {
      this.closeModalEvent.emit();
    }
    
  }

  private getBoatById(idBoat:string):Subscription{
    this.isLoading = true;
    return this._boatService.getBoatById(idBoat).subscribe({
      next: response => {
        this.isLoading = false;
        this.boat = response.data;
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._boatErrorNotification.getById();
      }
    });
  }

}
