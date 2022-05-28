import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-boat-section',
  templateUrl: './boat-section.component.html',
  styleUrls: ['./boat-section.component.scss']
})
export class BoatSectionComponent implements OnInit {

  constructor(
    private _companyService: CompanyService
  ) {
  }

  companies:Company[] = [];

  ngOnInit(): void {
  }

  public searchCompany(event: any){
    let searchValue = event.target.value;
    if(searchValue.length >= 3){

      this._companyService.searchCompany(searchValue)
        .subscribe({
          next: result => {
            this.companies = result;
            this.processSearchResult(result);
          },
          error: error => {
            console.log(error);
          }
        })
        return;
    }
    this.companies = [];
  }

  private processSearchResult(result: Company[]){


  }

}
