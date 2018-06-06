import { Component, OnInit } from '@angular/core';
import { Unidad } from '../../models/unidad';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { AutorizacionService } from '../../servicios/autorizacion.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import swal from 'sweetalert2';
import { NativeDateAdapter } from "@angular/material";


declare const $: any;
export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      //return date.toDateString();
    }
  }
}
export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
      dateInput: 'input',
      monthYearLabel: { year: 'numeric', month: 'numeric' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
  };
@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.scss'],
  providers: [AutorizacionService, {provide: DateAdapter, useClass: AppDateAdapter},{provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},{provide: MAT_DATE_LOCALE, useValue: 'ars-ARS'}]

})
export class AutorizacionComponent implements OnInit {

  constructor(private _AutorizacionService: AutorizacionService) { }
  private identity;
  public Unidad;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public selectpropia;
  public autorizacionArray;
  public autorizar;
  public arrayOptions;
  ngOnInit() {
    this.arrayOptions = [
      {value: 'Pendiente', viewValue: 'Pendiente'},
      {value: 'Autorizado', viewValue: 'Autorizado'},
      {value: 'Rechazado', viewValue: 'Rechazado'}

    ];
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    // $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item ';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.autorizar = {
      'id': '',
      'FechaHora':  '',
      'Recorrido': '',
      'Km':  '',
      'Titular':  '',
      'Tarifario':  '',
      'Sugerido':  '',
      'Solicitante': '',
      'Autorizante': '',
      'importe':  ''
    };
    this.All('Pendiente');

  }
  public test;
  onSubmit() {
    

  }
  public teste;
  public All(estado) {
    this._AutorizacionService.getAll(this.identity.token,estado).subscribe(
      response => {
        console.log(response);

        if (response.estado != "ERROR") {
            this.autorizacionArray=response;
          this.donttable = true;

        } else {
          this.donttable = false;

         
          this.showNotification('top', 'center', response.mensaje, 'warning');

        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public editar(id) {
    this._AutorizacionService.getId(id, this.identity.token).subscribe(
      response => {
        if(response.estado != 'Pendiente'){
          $("#importe").attr("disabled", true);
        }else{
          $("#importe").attr("disabled", false);
        }
        console.log(response);
        this.autorizar = {
          'id': response.id,
          'FechaHora': response.fechaHora,
          'Recorrido':response.recorrido,
          'Km': response.kilometraje,
          'Titular': response.titular,
          'Tarifario': response.importeTarifario,
          'Estado':  response.estado,
          'Sugerido': response.importeSugerido,
          'Solicitante': response.solicitante,
          'Autorizante': response.autorizante,
          'importe': response.importeAutorizado
        };
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  onEdit() {
    
    console.log(this.autorizar.id);
    if (this.autorizar.importe != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      console.log(this.autorizar.importe);
      this._AutorizacionService.AutorizacionAutorizar(this.autorizar.id, identity.token, this.autorizar.importe).subscribe(
        response => {
          console.log(response);
          if (response.estado != "ERROR") {
            this.completecampo = null;
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All('Pendiente');
            this.autorizar = {
              'id': '',
              'FechaHora':  '',
              'Recorrido': '',
              'Km':  '',
              'Titular':  '',
              'Tarifario':  '',
              'Estado':  '',
              'Sugerido':  '',
              'Solicitante': '',
              'Autorizante': '',
              'importe':  ''
            };
            $("#myModalEDITAR").modal("hide");
          } else {
            this.showNotification('top', 'center', response.mensaje, 'danger');

          }


        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      );
    }
    else {
      this.completecampo = "Complete el campo";
    }

  }
  public desabilitar(id) {
    this._AutorizacionService.desabilitar(id, this.identity.token).subscribe(
      response => {
        this.All('Pendiente');
        this.showNotification('top', 'center', response.mensaje, 'danger');
        $("#myModalEDITAR").modal("hide");

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }




  showNotification(from: any, align: any, text: any, color: any) {

    $.notify({
      icon: 'notifications',
      message: text
    }, {
        type: color,
        timer: 5000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }




  ngAfterViewInit() {
    // $('#datatables').DataTable({
    //   dom: 'Bfrtip',
    //   "bPaginate": true,
    //   "lengthMenu": [
    //     [10, 25, 50, -1],
    //     [10, 25, 50, "todos"]
    //   ],

    //   "order": [[ 0, "desc" ]],

    //   "language": {
    //       "sProcessing": "Procesando...",
    //       "sLengthMenu": "Mostrar _MENU_ documentos",
    //       "sZeroRecords": "No se encontraron documentos",
    //       "sEmptyTable": "Ningún dato disponible en esta tabla",
    //       "sInfo": "_TOTAL_ documentos",
    //       "sInfoEmpty": " 0 documentos",
    //       "sInfoFiltered": "(filtrado de un total de _MAX_ documentos)",
    //       "sInfoPostFix": "",
    //       "sSearch": "Buscar:",
    //       "sUrl": "",
    //       "sInfoThousands": ",",
    //       "sLoadingRecords": "Cargando...",
    //       "oPaginate": {
    //           "sFirst": "Primero-",
    //           "sLast": "Último",
    //           "sNext": ">>",
    //           "sPrevious": "<<"
    //       },
    //       "oAria": {
    //           "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
    //           "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    //       }

    //   },
    //   responsive: false,
    //   //   language: {
    //   //     search: "_INPUT_",
    //   //     searchPlaceholder: "Buscar",
    //   //   }

    // });

    // const table = $('#datatables').DataTable();
    // $('.card .material-datatables label').addClass('form-group');



    //$('.card .material-datatables label').addClass('form-group');
  }
  public clear() {
    this.Unidad = {
      'unidad': '',
      'vtv': new Date(),
      'ruta': new Date(),
      'poliza': new Date(),
      'seguro': new Date(),
      'propia': '',
      'activo': true
    };
  }
  onChange(deviceValue) {
      this.All(deviceValue.value )
      console.log(deviceValue);
  } 

}

