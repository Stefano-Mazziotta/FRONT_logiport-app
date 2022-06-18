import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent implements OnInit {

  constructor(
    private _companyService: CompanyService,
    private renderer: Renderer2
  ) { }
  
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('crossResetSelect') crossResetSelect!: ElementRef;
  @ViewChild('resultWrap') resultWrap!: ElementRef;

  companies: Company[] = [];
  companySelected: Company | null = null;


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
      searchInput.value = this.companySelected.comRazSoc;
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
            this.companies = result;
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
    
    let company = this.companies.find( elem => elem.comRazSoc == companyName );
    if(company != null){
      this.companySelected = company;
      localStorage.setItem('companySelected', JSON.stringify(this.companySelected));
    
      searchInput.value = this.companySelected.comRazSoc;
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
