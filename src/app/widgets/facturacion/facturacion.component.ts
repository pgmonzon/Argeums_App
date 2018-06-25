import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Facturacion } from '../../models/factura';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { FacturacionService } from '../../servicios/facturacion.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import swal from 'sweetalert2';
import { NativeDateAdapter } from "@angular/material";
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';

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
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
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
  public tablatotal = 0;
  public tipoSucursal;
  public fecha;
  // Utilizamos este desencadenante porque la búsqueda de la lista de personas puede ser bastante larga,
  // Por lo tanto, aseguramos que los datos se obtienen antes de renderizar
  dtTrigger: Subject<any> = new Subject();
  dtTriggerr: Subject<any> = new Subject(); 
  dtTriggerrr: Subject<any> = new Subject();


  dtOptions: any = {};
  dtOptionss: any = {};

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {

    this.fecha = { 'desde': new Date(), 'hasta': new Date() };

    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'print',
        'excel',
        'csv',
      ],
      "language": {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ documentos",
        "sZeroRecords": "No se encontraron documentos",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "_TOTAL_ documentos",
        "sInfoEmpty": " 0 documentos",
        "sInfoFiltered": "(filtrado de un total de _MAX_ documentos)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
          "sFirst": "Primero-",
          "sLast": "Último",
          "sNext": ">>",
          "sPrevious": "<<"
        },
        "oAria": {
          "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
      },
    };

    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';

    this.donttable = false;

    this.arrayOptions = [
      { value: 'Pendiente', viewValue: 'Pendiente' },
      { value: 'Autorizado', viewValue: 'Autorizado' },
      { value: 'Rechazado', viewValue: 'Rechazado' }

    ];
    this.tipoSucursal = [
      { 'value': '0006', viewValue: '0006' },
      { 'value': '0008', viewValue: '0008' }
    ];
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    // $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item ';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.factura = {
      'letra': 'A',
      'suc': '',
      'numero': '',
      'fecha': new Date(),
      'vencimiento': new Date(),
      'cliente_id': '',
      'cliente': '',
      'descripcion': '',
      'neto': '',
      'iva105': '0',
      'iva21': '',
      'total': '',
      'cuentaIngreso': '410100',
      'viajesFact': [],
      'cuit': '',
      'noGravado': '',
    };

    this.All();
    this.getClienteAll();

  }
  public test;
  onSubmit() {
    this.factura.viajesFact = this.viajesFactArray;
    if (this.factura.cliente_id != '') {
      this.clienteAll.forEach(element => {
        if (element.id == this.factura.cliente_id) {
          this.factura.cliente = element.cliente;

        }
      });
    }
    console.log(this.factura);

    this._FacturacionService.crear(this.factura, this.identity.token).subscribe(
      response => {
        console.log(response);
        if (response.estado != "ERROR") {
          this.showNotification('top', 'center', response.mensaje, 'success');
          this.clear();
          this.viajesFactArray = [];
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
          // var table = $('#first-table').DataTable();
          // table.clear().draw();
          this.dtTriggerrr.next();
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
    // @ViewChild(DataTableDirective)
    // dtElement: DataTableDirective;
    this.dtOptionss = {
      dom: 'Bfrtip',
      paging: false,
      searching: true,


      // Configure the buttons
      buttons: [
       
      ],
      "language": {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ documentos",
        "sZeroRecords": "No se encontraron documentos",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "_TOTAL_ documentos",
        "sInfoEmpty": " 0 documentos",
        "sInfoFiltered": "(filtrado de un total de _MAX_ documentos)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
          "sFirst": "Primero-",
          "sLast": "Último",
          "sNext": ">>",
          "sPrevious": "<<"
        },
        "oAria": {
          "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

      },

    };
  }
  public clear() {
    this.factura = {
      'letra': 'A',
      'suc': '',
      'numero': '',
      'fecha': new Date(),
      'vencimiento': new Date(),
      'cliente_id': '',
      'cliente': '',
      'descripcion': '',
      'neto': '',
      'iva105': '0',
      'iva21': '',
      'total': '',
      'cuentaIngreso': '410100',
      'viajesFact': [],
      'cuit': '',
      'noGravado': '',
    };
    this.viajesFactArray = [];

  }
  public facturasViajes;
  onChange(deviceValue) {
    this.clienteAll.forEach(element => {
      if(deviceValue.value==element.id){
        $('#cuitjquery').val(element.cuit)

      }
    });
    this._FacturacionService.getViajesFacturasAll(deviceValue.value, this.identity.token).subscribe(
      response => {
        
        if (response.estado != 'ERROR') {

          this.facturasViajes = response;
          this.tablatotal = 0;

        } else {
          this.facturasViajes = [];
          this.tablatotal = 0;

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
  public totalNoGravado = 0;
  public agregarFactura(id, fechaHora, recorrido, valor, peaje, adicional, deviceValue) {
    if (deviceValue.target.checked) {
      this.viajesFactArray.push({ 'viaje_id': id, 'fechaHora': fechaHora, 'recorrido': recorrido, 'valor': valor + peaje + adicional });
      this.tablatotal = this.tablatotal + valor + adicional;
      this.totalNoGravado = this.totalNoGravado + peaje;
      $('#importe').val(this.tablatotal + this.totalNoGravado);
      $('#iva21').val(this.tablatotal * 0.21);
      $('#total').val((this.tablatotal + this.totalNoGravado) + (this.tablatotal * 0.21));
      $('#NetoNoGravado').val(this.totalNoGravado);


    } else {
      this.tablatotal = this.tablatotal - valor - adicional;
      this.totalNoGravado = this.totalNoGravado - peaje;
      $('#importe').val(this.tablatotal + this.totalNoGravado);
      $('#iva21').val(this.tablatotal * 0.21);
      $('#total').val((this.tablatotal + this.totalNoGravado) + (this.tablatotal * 0.21));
      $('#NetoNoGravado').val(this.totalNoGravado);

      for (let index = 0; index < this.viajesFactArray.length; index++) {
        if (id == this.viajesFactArray[index].viaje_id) {
          this.viajesFactArray.splice(index, 1);
        }
      }
    }

  }
  public verviajesFacturas;
  public verviajeFact(id) {
    this.verviajesFacturas = [];
    this.autorizacionArray.forEach(element => {
      if (element.id == id) {
        this.verviajesFacturas = element.viajesFact;

      }
    });

  }


  public exportTable;
  public block = 1;
  public getExport(id) {

    this._FacturacionService.getViajeExel(id, this.identity.token).subscribe(
      response => {
        var table = $('#DataTables_Table_0').DataTable();
        table.clear().draw();
        table.destroy();
        this.dtTrigger.next();
        this.exportTable = response;
      

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  }
  public exportCsv;
  onSubmitFecha() {
    this.fecha.desde.setHours(0, 0, 0)
    this.fecha.hasta.setHours(23, 59, 59)

    var fd = $("#fd").val().split("-");
    var fh = $("#fh").val().split("-");
    if (fd[1] < 9) {
      var mesFd = 0 + fd[1];
    } else {
      var mesFd = fd[1];
    }
    if (fd[0] < 9) {
      var diaFd = 0 + fd[0];
    } else {
      var diaFd = fd[0];
    }
    if (fh[1] < 9) {
      var mesFh = 0 + fh[1];
    } else {
      var mesFh = fh[1];
    }
    if (fh[0] < 9) {
      var diaFh = 0 + fh[0];
    } else {
      var diaFh = fh[0];
    }
    var fechaDesde = fd[2] + '-' + mesFd + '-' + diaFd + 'T00:00:00.000Z';
    var fechaHasta = fh[2] + '-' + mesFh + '-' + diaFh + 'T23:59:00.000Z';
    this._FacturacionService.getAllRangeFecha(this.identity.token, fechaDesde, fechaHasta).subscribe(
      response => {

        var table = $('#DataTables_Table_0').DataTable();
        table.clear().draw();
        table.destroy();
        this.dtTriggerr.next();

        this.exportCsv = response;


        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      }
    );
  }
}
