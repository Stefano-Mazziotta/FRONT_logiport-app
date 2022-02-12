import { Component, OnInit } from '@angular/core';
import { Renderer2, ViewChild, ElementRef } from '@angular/core';
import {OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company-popup-view',
  templateUrl: './company-popup-view.component.html',
  styleUrls: ['./company-popup-view.component.scss']
})
export class CompanyPopupViewComponent implements OnInit, OnChanges {

  @Input() isOpenView!:boolean;
  @Input() company!:Company;

  @Output() closePopup = new EventEmitter<boolean>();

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('dataContainer') dataContainer!: ElementRef;

  @ViewChild('idCompany') idCompany!: ElementRef;
  @ViewChild('razSocialCompany') razSocialCompany!: ElementRef;
  @ViewChild('CUITCompany') CUITCompany!: ElementRef;

  clickPopup:boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit():void{

  }

  ngOnChanges():void{
    if (this.isOpenView == true){
      this.open_popup();
    }
  }

  // open_popup() -> abre el popup mediante DOM y setea la info correspondiente.
  private open_popup():void{
    // acceder a cada elemento [html] del componente.
    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const dataContainer = this.dataContainer.nativeElement;

    const idCompanyParaph = this.idCompany.nativeElement;
    const razSocialCompanyParaph = this.razSocialCompany.nativeElement;
    const CUITCompanyParaph = this.CUITCompany.nativeElement;

    // agrega la clase '.active' para mostrar el modal view-company.
    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(dataContainer,'active');

    // cambiar los valores de los <p> correspondientes a cada info. de la company.
    this.renderer.setProperty(idCompanyParaph, 'innerHTML', this.company.comID);
    this.renderer.setProperty(razSocialCompanyParaph, 'innerHTML', this.company.comRazSoc);
    this.renderer.setProperty(CUITCompanyParaph, 'innerHTML', this.company.comCUIT);
  }

  // close_popup() -> cierra el popup y emite el nuevo valor de isOpen al parent component.
  public close_popup(){

    if(this.clickPopup == false){

      const overlay = this.overlay.nativeElement;
      const popup = this.popup.nativeElement;
      const title = this.title.nativeElement;
      const dataContainer = this.dataContainer.nativeElement;


      this.renderer.removeClass(overlay,'active')
      this.renderer.removeClass(popup,'active')
      this.renderer.removeClass(title,'active');
      this.renderer.removeClass(dataContainer,'active');

      this.isOpenView = false;
      this.closePopup.emit(this.isOpenView);
    }
    this.clickPopup = false;
  }




}
