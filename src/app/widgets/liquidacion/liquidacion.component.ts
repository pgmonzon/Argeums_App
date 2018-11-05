import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { liquidaciones } from '../../models/liquidacion';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { LiquidacionService } from '../../servicios/liquidacion.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import swal from 'sweetalert2';
import { Subject } from 'rxjs';

import { NativeDateAdapter } from "@angular/material";
import { count } from 'rxjs/operators';
declare const $: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

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
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss'],
  providers: [LiquidacionService, { provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }, { provide: MAT_DATE_LOCALE, useValue: 'ars-ARS' }]

})
export class LiquidacionComponent implements OnDestroy, OnInit {

  constructor(private _LiquidacionService: LiquidacionService) { }
  private identity;
  public Unidad;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public selectpropia;
  public autorizacionArray;
  public liquidaciones;
  public arrayOptions;
  public tablatotal = 0;
  public dataTable: DataTable;
  public facturaCliente;
  dtTrigger: Subject<any> = new Subject();
  dtTriggerr: Subject<any> = new Subject();

  dtOptions: any = {};
  dtOptionss: any = {};

  ngOnInit() {
    this.donttable = false;


    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    // $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item ';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.liquidaciones = {
      'liquidacion': '',
      'fecha': new Date(),
      'transportista_id': '',
      'transportista': '',
      'descripcion': '',
      'neto': '',
      'iva105': '',
      'iva21': '',
      'total': '',
      'cuentaIngreso': '',
      'viajesLiq': []
    };
    this.facturaCliente = { 'facturaTransportista': '' };
    this.All();
    this.getTransportistaAll();

  }
  public test;
  onSubmit() {
    this.liquidaciones.viajesLiq = this.viajesFactArray;

    if (this.liquidaciones.transportista_id != '') {
      this.transportistaAll.forEach(element => {
        if (element.id == this.liquidaciones.transportista_id) {
          this.liquidaciones.transportista = element.transportista;

        }
      });
    } else {
      this.liquidaciones.transportista_id = '111111111111111111111111';

    }
    console.log(this.liquidaciones);
   
    this.liquidaciones.iva105=parseFloat($('#iva105').val());
    this.liquidaciones.iva21=parseFloat($('#iva21').val());
    this.liquidaciones.neto=parseFloat($('#neto').val());
    this.liquidaciones.total=parseFloat($('#total').val()) ;
    this.liquidaciones.liquidacion=0;
    this._LiquidacionService.crear(this.liquidaciones, this.identity.token).subscribe(
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
    this._LiquidacionService.getAll(this.identity.token).subscribe(
      response => {
        console.log(response);

        if (response.estado != "ERROR") {
          // var table = $('#first-table').DataTable();
          // table.clear().draw();
          this.dtTriggerr.next();
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





  public transportistaAll;
  public getTransportistaAll() {
    this._LiquidacionService.getTransportistaAll(this.identity.token).subscribe(
      response => {
        this.transportistaAll = response;
        console.log(this.transportistaAll);
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
    $('#table').DataTable({
      dom: 'Bfrtip',
      "bPaginate": true,
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "todos"]
      ],

      "order": [[0, "desc"]],

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
      responsive: false,


    });

    const table = $('#tablee').DataTable();
    $('.card .material-datatables label').addClass('form-group');



    $('.card .material-datatables label').addClass('form-group');
    this.dtOptions = {
      dom: 'Bfrtip',
      paging: false,
      searching: true,


      // Configure the buttons
      buttons: [
        'print',
        'excel',
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
    this.liquidaciones = {
      'liquidacion': '',
      'fecha': new Date(),
      'transportista_id': '',
      'transportista': '',
      'descripcion': '',
      'neto': '',
      'iva105': '',
      'iva21': '',
      'total': '',
      'cuentaIngreso': '521131',
      'viajesLiq': []
    };
    this.viajesFactArray = [];
  }
  public facturasViajes;
  public tipofactura;
  onChange(deviceValue) {
    this._LiquidacionService.getViajesLiquidarsAll(deviceValue.value, this.identity.token).subscribe(
      response => {
        if (response.estado != 'ERROR') {

          console.log(response);
          this.facturasViajes = response;
          this.tipofactura = response.factura;
          this.tablatotal = 0;
          this.viajesFactArray = [];

        } else {
          console.log(response);
          this.facturasViajes = [];
          this.tablatotal = 0;
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
  public agregarFactura(id, fechaHora, recorrido, valor,peajes, deviceValue) {
    console.log(peajes);
    if (deviceValue.target.checked) {
      this.viajesFactArray.push({ 'viaje_id': id, 'fechaHora': fechaHora, 'recorrido': recorrido, 'valor': valor +peajes});
      this.tablatotal = this.tablatotal + valor+ peajes;
      if (this.tipofactura == "A") {
        $('#iva105').val(0);
        $('#iva21').val(this.tablatotal * 0.21);
        $('#neto').val(this.tablatotal);
        $('#total').val(this.tablatotal + (this.tablatotal * 0.21));

      } else {
        $('#iva105').val(0);
        $('#iva21').val(0);
        $('#neto').val(this.tablatotal);
        $('#total').val(this.tablatotal);
      }
    } else {
      this.tablatotal = this.tablatotal - valor - peajes;

      for (let index = 0; index < this.viajesFactArray.length; index++) {
        if (id == this.viajesFactArray[index].viaje_id) {
          this.viajesFactArray.splice(index, 1);
        }
      }
      if (this.tipofactura == "A") {
        $('#iva105').val(0);
        $('#iva21').val(this.tablatotal * 0.21);
        $('#neto').val(this.tablatotal);
        $('#total').val(this.tablatotal + (this.tablatotal * 0.21));

      } else {
        $('#iva105').val(0);
        $('#iva21').val(0);
        $('#neto').val(this.tablatotal);
        $('#total').val(this.tablatotal);
      }
    }

  }
  public verviajesFacturas;
  public verviajeFact(id) {
    this.verviajesFacturas = [];

    this._LiquidacionService.getViajeExel(id, this.identity.token).subscribe(
      response => {
        this.verviajesFacturas = response;
        console.log(this.verviajesFacturas);
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  

  }
  public idLiquidacion;
  public guardaId(id) {
    this.idLiquidacion = id;
    this.autorizacionArray.forEach(element => {
      if (element.id == id) {
        this.facturaCliente.facturaTransportista = element.facturaTransportista;
      }
    });

  }
  onSubmitFactura() {
    this._LiquidacionService.autorizaFactura(this.identity.token, this.idLiquidacion, this.facturaCliente).subscribe(
      response => {
        this.showNotification('top', 'center', response.mensaje, 'success');
        this.facturaCliente = { 'facturaTransportista': '' };
        $("#modalFactura").modal("hide");

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public exportTable;
  public block = 0;
  public getExport(id) {
    this.block++;
    this._LiquidacionService.getViajeExel(id, this.identity.token).subscribe(
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

}
