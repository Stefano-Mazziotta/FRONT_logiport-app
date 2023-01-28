import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IBoat, IBoatSelected, ISearchBoatDTO } from 'src/app/interfaces/boat';
import { BoatErrorNotificationService } from 'src/app/services/boat/boat-error-notification/boat-error-notification.service';
import { BoatService } from 'src/app/services/boat/boat.service';

@Component({
  selector: 'app-boat-selector',
  templateUrl: './boat-selector.component.html',
  styleUrls: ['./boat-selector.component.scss']
})
export class BoatSelectorComponent implements OnDestroy {

  constructor(
    private _boatService: BoatService,
    private _boatErrorNotification: BoatErrorNotificationService
  ) { }

  @Output() boatSelectedEvent = new EventEmitter<IBoatSelected | null>();
  @Input() idCompanySelected: string | null = null; 

  boats: IBoat[] = [];

  inputSearchValue:string = "";

  isLoading: boolean = false;
  isSelected: boolean = false;

  searchBoatSubscription: Subscription | undefined; 

  ngOnDestroy(): void {
    this.searchBoatSubscription?.unsubscribe();
  }

  private searchBoat(searchParams:ISearchBoatDTO): Subscription {
    this.isLoading = true;
    
    return this._boatService.searchBoat(searchParams).subscribe({
      next: result => {
        this.boats = result.data;
        this.isLoading = false;
      },
      error: error => {
        const {status} = error;
        this.isLoading = false;
        this._boatErrorNotification.search(status);
      }
    });
  }

  public typingInputSearch(focusout: any): void {
    const idCompany = this.idCompanySelected;
    if(idCompany){
      this.boats = [];
      
      const boatName:string = focusout.target.value;
      const searchParams:ISearchBoatDTO = {
        idCompany,
        boatName
      }


      if (boatName.length >= 3) {
        this.searchBoatSubscription = this.searchBoat(searchParams);
      }
    }

  }

  public selectBoat(click: any): void {

    const boatName: string = click.target.innerHTML;
    const boat = this.boats.find(elem => elem.BoatName == boatName);

    if (boat) {
      this.isSelected = true;
      this.inputSearchValue = boat.BoatName;

      const companySelected:IBoatSelected = {
        idBoat: boat.IdBoat,
        boatName: boat.BoatName
      }

      this.boatSelectedEvent.emit(companySelected);
    }
  }

  public removeBoatSelected(): void {
    
    this.boats = [];
    this.isSelected = false;
    this.inputSearchValue = "";

    this.boatSelectedEvent.emit(null);
  }

}
