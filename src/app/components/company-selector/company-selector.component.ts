import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ICompany } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.scss']
})
export class CompanySelectorComponent implements OnInit {

  constructor(
    private _companyService: CompanyService,
    private renderer: Renderer2
  ) { }
  
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('crossResetSelect') crossResetSelect!: ElementRef;
  @ViewChild('resultWrap') resultWrap!: ElementRef;

  companies: ICompany[] = [];
  companySelected: ICompany | null = null;


  ngOnInit(): void {    
    let company = localStorage.getItem("companySelected");
    
    if(company != null && company != ""){
      this.companySelected = JSON.parse(company);
    }    
  }

  ngAfterViewInit(){
    const searchInput = this.searchInput.nativeElement;
    const crossResetSelect = this.crossResetSelect.nativeElement;
    const resultWrap = this.resultWrap.nativeElement;

    if(this.companySelected != null){
      searchInput.value = this.companySelected.RazonSocial;
      searchInput.disabled = true;

      this.renderer.addClass(resultWrap, 'hidden');
      this.renderer.removeClass(crossResetSelect, 'hidden');
    }
  }

  public searchCompany(event: any) {
    let searchValue = event.target.value;
    if (searchValue.length >= 3) {

      this._companyService.searchCompany(searchValue)
        .subscribe({
          next: result => {
            this.companies = result.data;
          },
          error: error => {
            console.log(error);
          }
        })

      return;
    }
    this.companies = [];
  }

  // get company by "razon social"
  public selectCompany(event: any){
    let companyName:string = event.target.innerHTML;
    
    const searchInput = this.searchInput.nativeElement;
    const crossResetSelect = this.crossResetSelect.nativeElement;
    const resultWrap = this.resultWrap.nativeElement;
    
    let company = this.companies.find( elem => elem.RazonSocial == companyName );
    if(company != null){
      this.companySelected = company;
      localStorage.setItem('companySelected', JSON.stringify(this.companySelected));
    
      searchInput.value = this.companySelected.RazonSocial;
      searchInput.disabled = true;

      this.renderer.addClass(resultWrap, 'hidden');
      this.renderer.removeClass(crossResetSelect, 'hidden');
    }

  }

  // when click in cross of searchCompany, reset company-selected.
  public resetSelectCompany(){
    const searchInput = this.searchInput.nativeElement;
    const crossResetSelect = this.crossResetSelect.nativeElement;
    const resultWrap = this.resultWrap.nativeElement;

    this.companies = [];
    this.companySelected = null;
    localStorage.setItem('companySelected', JSON.stringify(this.companySelected));
    
    searchInput.value = "";
    searchInput.disabled = false;
    this.renderer.removeClass(resultWrap, 'hidden');
    this.renderer.addClass(crossResetSelect, 'hidden');
  }
}
