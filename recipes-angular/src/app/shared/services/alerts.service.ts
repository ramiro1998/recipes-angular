import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }


  loading() {
    let timerInterval: any;
    Swal.fire({
      title: "Cargando...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    })
  }

  deleteAlert(name: string, object: string): Observable<boolean> {
    const subject = new Subject<boolean>();

    Swal.fire({
      title: `¿Está seguro que quiere eliminar ${object}: ${name}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      customClass: {
        popup: 'sweet-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        subject.next(true);
      } else {
        subject.next(false);
      }
      subject.complete();
    });

    return subject.asObservable();
  }

  createDeleteAlert(name: string, state: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: `${name} ${state}`,
        icon: 'success'
      }).then((result) => {
        observer.next(result.isConfirmed);
        observer.complete();
      });
    });
  }

  errorAlert(name: string) {
    Swal.fire({
      title: `Error en el guardado de la ${name}`,
      icon: 'error'
    });
  }


}
