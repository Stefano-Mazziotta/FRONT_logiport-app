import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICompany, ISearchCompanyDTO } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/companyErrorNotification/company-error-notification.service';

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.scss']
})
export class CompanySelectorComponent implements OnInit {

  constructor(
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService
  ) { }

  @Output() companySelectedEvent = new EventEmitter<string|null>();

  companies: ICompany[] = [];

  inputSearchValue:string = "";

  isLoading: boolean = false;
  isSelected: boolean = false;

  searchCompanySubscription: Subscription | undefined; 

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.searchCompanySubscription?.unsubscribe;
  }

  private searchCompany(razonSocial: string): Subscription {
    this.isLoading = true;

    const searchCompanyDto:ISearchCompanyDTO = {
      razonSocial:razonSocial
    };
    
    return this._companyService.searchCompany(searchCompanyDto).subscribe({
      next: result => {
        this.companies = result.data;
        this.isLoading = false;
      },
      error: error => {
        const {status} = error;
        this.isLoading = false;
        this._companyErrorNotification.search(status);
      }
    });
  }

  public typingInputSearch(focusout: any): void {
    this.companies = [];
    const razonSocial:string = focusout.target.value;

    if (razonSocial.length >= 3) {
      this.searchCompanySubscription = this.searchCompany(razonSocial);
    }
  }

  public selectCompany(click: any): void {

    const companyName: string = click.target.innerHTML;
    const company = this.companies.find(elem => elem.RazonSocial == companyName);

    if (company) {
      this.isSelected = true;
      this.inputSearchValue = company.RazonSocial;

      this.companySelectedEvent.emit(company.IdCompany);
    }
  }

  public removeCompanySelected(): void {
    
    this.companies = [];
    this.isSelected = false;
    this.inputSearchValue = "";

    this.companySelectedEvent.emit(null);
  }
}
