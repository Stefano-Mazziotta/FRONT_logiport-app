import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BoatErrorNotificationService {

  constructor(private toastr:ToastrService) { }

  private codes = {
    notFound: 404,
  }
  
  private notificationInternalError = {
    title: "Error!",
    message: "Error inesperado.",
  }

  public getAll(status: number): void {


    if (status === this.codes.notFound) {

      let notification = {
        title: "Sin resultados.",
        message: "No existen lanchas.",
      }

      this.toastr.info(notification.message, notification.title);

      return;
    }

    const internalError = this.notificationInternalError
    this.toastr.error(internalError.message, internalError.title);
  }

  public getById(): void {
    const notification = {
      title: "Error.",
      message: "Error al obtener la lancha.",
    }
    this.toastr.error(notification.message, notification.title);
  }

  public create(): void {
    let notification = {
      title: "Error.",
      message: "Error al crear la lancha.",
    }
    this.toastr.error(notification.message, notification.title);
  }

  public update(): void {

    let notification = {
      title: "Error.",
      message: "Error al editar la lancha.",
    }
    this.toastr.error(notification.message, notification.title);

  }

  public delete(): void{
    let notification = {
      title: "Error.",
      message: "Error al eliminar la lancha.",
    }
    this.toastr.error(notification.message, notification.title);
  }

  public search(status: number): void{
    if (status === this.codes.notFound) {

      let notification = {
        title: "Sin resultados.",
        message: "No se encontraron lanchas.",
      }

      this.toastr.info(notification.message, notification.title);

      return;
    }

    const internalError = this.notificationInternalError
    this.toastr.error(internalError.message, internalError.title);
  }
}
