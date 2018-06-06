import { Component, OnInit } from '@angular/core';
import { Facturacion } from '../../models/factura';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { FacturacionService } from '../../servicios/facturacion.service';
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
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss'],
  providers: [FacturacionService, { provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }, { provide: MAT_DATE_LOCALE, useValue: 'ars-ARS' }]

})
export class FacturacionComponent implements OnInit {

  constructor(private _FacturacionService: FacturacionService) { }
  private identity;
  public Unidad;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public selectpropia;
  public autorizacionArray;
  public factura;
  public arrayOptions;
  public tablatotal=0;
  ngOnInit() {
    this.donttable = false;

    this.arrayOptions = [
      { value: 'Pendiente', viewValue: 'Pendiente' },
      { value: 'Autorizado', viewValue: 'Autorizado' },
      { value: 'Rechazado', viewValue: 'Rechazado' }

    ];
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    // $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item ';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.factura = {
      'letra': '',
      'suc': '',
      'numero': '',
      'fecha': new Date(),
      'vencimiento': new Date(),
      'cliente_id': '',
      'cliente': '',
      'descripcion': '',
      'neto': '',
      'iva105': '',
      'iva21': '',
      'total': '',
      'cuentaIngreso': '',
      'viajesFact': []
    };

    this.All();
    this.getClienteAll();

  }
  public test;
  onSubmit() {
      this.factura.viajesFact=this.viajesFactArray;
      if (this.factura.cliente_id != '') {
        this.clienteAll.forEach(element => {
          if (element.id == this.factura.cliente_id) {
            this.factura.cliente = element.cliente;
  
          }
        });
      }
      console.log(this.factura);

    this._FacturacionService.crear(this.factura,this.identity.token).subscribe(
      response => {
        console.log(response);
        if (response.estado != "ERROR") {
          this.showNotification('top', 'center', response.mensaje, 'success');
          this.clear();
          this.viajesFactArray=[];
          this.All();
          $("#myModal").modal("hide");

        } else {
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


  public teste;
  public All() {
    this._FacturacionService.getAll(this.identity.token).subscribe(
      response => {
        console.log(response);

        if (response.estado != "ERROR") {
          this.autorizacionArray = response;
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
  


  public clienteAll;
  public getClienteAll() {
    this._FacturacionService.getClienteAll(this.identity.token).subscribe(
      response => {
        this.clienteAll = response;

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
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

    //   "order": [[0, "desc"]],

    //   "language": {
    //     "sProcessing": "Procesando...",
    //     "sLengthMenu": "Mostrar _MENU_ documentos",
    //     "sZeroRecords": "No se encontraron documentos",
    //     "sEmptyTable": "Ningún dato disponible en esta tabla",
    //     "sInfo": "_TOTAL_ documentos",
    //     "sInfoEmpty": " 0 documentos",
    //     "sInfoFiltered": "(filtrado de un total de _MAX_ documentos)",
    //     "sInfoPostFix": "",
    //     "sSearch": "Buscar:",
    //     "sUrl": "",
    //     "sInfoThousands": ",",
    //     "sLoadingRecords": "Cargando...",
    //     "oPaginate": {
    //       "sFirst": "Primero-",
    //       "sLast": "Último",
    //       "sNext": ">>",
    //       "sPrevious": "<<"
    //     },
    //     "oAria": {
    //       "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
    //       "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    //     }

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
    this.factura = {
      'letra': '',
      'suc': '',
      'numero': '',
      'fecha': new Date(),
      'vencimiento': new Date(),
      'cliente_id': '',
      'cliente': '',
      'descripcion': '',
      'neto':'',
      'iva105': '',
      'iva21': '',
      'total': '',
      'cuentaIngreso': '',
      'viajesFact': []
    };
    this.viajesFactArray = [];

  }
  public facturasViajes;
  onChange(deviceValue) {
    console.log(deviceValue.value);
    this._FacturacionService.getViajesFacturasAll(deviceValue.value, this.identity.token).subscribe(
      response => {
        if (response.estado != 'ERROR') {

          console.log(response);
          this.facturasViajes = response;
          this.tablatotal=0;

        } else {
          this.facturasViajes = [];
          this.tablatotal=0;

          console.log(response);
          this.showNotification('top', 'center', response.mensaje, 'warning');

        }

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  }

  public viajesFactArray = [];
  public agregarFactura(id, fechaHora, recorrido, valor,peaje,adicional, deviceValue) {
    if (deviceValue.target.checked) {
      this.viajesFactArray.push({ 'viaje_id': id, 'fechaHora': fechaHora, 'recorrido': recorrido, 'valor': valor+peaje+adicional });
      this.tablatotal=this.tablatotal + valor+ peaje+adicional;
    } else {
      this.tablatotal=this.tablatotal - valor -peaje -adicional;

      for (let index = 0; index < this.viajesFactArray.length; index++) {
        if (id == this.viajesFactArray[index].viaje_id) {
          this.viajesFactArray.splice(index, 1);
        }
      }
    }
  
  }
  public verviajesFacturas;
  public verviajeFact(id){
    this.verviajesFacturas=[];
      this.autorizacionArray.forEach(element => {
        if (element.id == id) {
          this.verviajesFacturas= element.viajesFact;

        }
      });
    
  }

}
