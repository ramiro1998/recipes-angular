import { Injectable } from '@angular/core';
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

  deleteAlert(name: string, object: string) {
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
        Swal.fire({
          title: "Receta eliminada!",
          icon: "success",
          customClass: {
            popup: 'sweet-popup'
          }
        });
      }
    });
  }


  createDeleteAlert(name: string, state: string) {
    Swal.fire({
      title: `${name} ${state}`,
      icon: 'success'
    });
  }

  errorAlert(name: string) {
    Swal.fire({
      title: `Error en el guardado de la ${name}`,
      icon: 'error'
    });
  }


}
