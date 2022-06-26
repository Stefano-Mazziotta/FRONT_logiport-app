import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boat-section',
  templateUrl: './boat-section.component.html',
  styleUrls: ['./boat-section.component.scss']
})
export class BoatSectionComponent implements OnInit {

  constructor(
    private _router: Router,
  ) {
  }

  companySelected: Company | null = null;

  ngOnInit(): void {
    let company = localStorage.getItem("companySelected");
    if(company != null && company != ""){
      this.companySelected = JSON.parse(company);
      console.log(this.companySelected);
      return;
    } 
    this._router.navigateByUrl('/login-empresa');

  }

}
