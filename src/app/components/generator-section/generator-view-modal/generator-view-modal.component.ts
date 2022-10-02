import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IGenerator } from 'src/app/interfaces/generator'; 
import { GeneratorErrorNotificationService } from 'src/app/services/generator/generator-error-notification/generator-error-notification.service'; 
import { GeneratorService } from 'src/app/services/generator/generator.service';

@Component({
  selector: 'app-generator-view-modal',
  templateUrl: './generator-view-modal.component.html',
  styleUrls: ['./generator-view-modal.component.scss']
})
export class GeneratorViewModalComponent implements OnInit, OnDestroy {

  constructor(
    private _generatorService: GeneratorService,
    private _generatorErrorNotification: GeneratorErrorNotificationService
  ) { }

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() idGeneratorClicked: string | null = null;

  clickModal: boolean = false;
  isLoading: boolean = false;

  generator:IGenerator = {
    IdGenerator: '',
    IdBoat: '',
    Quantity: '',
    Brand: '',
    NumberGenerator: 0,
    Model: '',
    Type: '',
    Power: '',
    TimeSave: 0,
    TimeLastUpdate: 0,
    IsDeleted: false,
    TimeDeleted: 0
  }

  getGeneratorByIdSubscription: Subscription | undefined;

  ngOnInit(): void {
    const idGenerator = this.idGeneratorClicked;
    if(idGenerator){
      this.getGeneratorByIdSubscription = this.getGeneratorById(idGenerator);
    }
  }

  ngOnDestroy(): void {
    this.getGeneratorByIdSubscription?.unsubscribe();
  }

  public closeModal(): void {

    if (this.clickModal == false) {
      this.closeModalEvent.emit();
    }
    this.clickModal = false;
  }

  private getGeneratorById(idGenerator:string):Subscription{
    this.isLoading = true;
    return this._generatorService.getGeneratorById(idGenerator).subscribe({
      next: response => {
        this.isLoading = false;
        this.generator = response.data;
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._generatorErrorNotification.getById();
      }
    });
  }

}
