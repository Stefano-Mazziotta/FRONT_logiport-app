import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective {

  @Input() appLoader!: Type<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private deviceDetectorService: DeviceDetectorService,
  ) { }

  ngOnInit(): void {

    const isDesktop = this.deviceDetectorService.isDesktop();
    const isMobile = this.deviceDetectorService.isMobile();

    const nameComponent = this.appLoader.name;
    const isMobileComponent = nameComponent.includes("Mobile");

    if(isMobile && isMobileComponent){
      this.createComponent(this.appLoader);
    }

    if(isDesktop && !isMobileComponent){
      this.createComponent(this.appLoader);
    }
  }

  private createComponent(component:Type<any>):any{
    this.viewContainerRef.createComponent(component)
  }

}
