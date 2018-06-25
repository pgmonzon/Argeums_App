import { Component, OnInit } from '@angular/core';
import { basicosindicato } from '../../models/basicosindicato';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { RendicionesService } from '../../servicios/rendiciones.service';
import { rendicion } from '../../models/rendicion';
import { Subject } from 'rxjs';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-rendicion',
  templateUrl: './rendicion.component.html',
  styleUrls: ['./rendicion.component.scss'],
  providers: [RendicionesService]

})
export class RendicionComponent implements OnInit {

  public dataTable: DataTable;
  private identity;
  public sindicato;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public ideliminado;
  public idPersonal;
  public rendicion: rendicion;
  public testArreglo=[{"cuentasGasto":null,"egreso":null,"fechaHora":null,"ingreso":null,"observaciones":null,"personal":null,"saldo":null}];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  constructor(
    private _RendicionesService: RendicionesService
  ) { }



  ngOnInit() {
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item active';
    this.ideliminado = '';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.sindicato = {
      'basico_sindicato': '',
      'activo': true
    };
    this.rendicion = {
      'personal_id': '',
      'personal': '',
      'CuentaGasto_id': '',
      'cuentaGasto': '',
      'observaciones': '',
      'Ingreso': '',
      'Egreso': ''
    }
    // this.dataTable = {
    //   headerRow: ['cuentaGasto','egreso','fecha','ingreso','observaciones','personal','saldo'],
    //   footerRow: ['cuentaGasto','egreso','fecha','ingreso','observaciones','personal','saldo'],

    //   dataRows: null
    // }
    this.getPersonal();
    this.getCuentasGastos();
    this.donttable = true;

  }
  public getAll(id) {
    this._RendicionesService.getAll(this.identity.token, id).subscribe(
      response => {
        this.testArreglo=[];
        if (response.estado != "ERROR") {
          var table = $('#DataTables_Table_0').DataTable();
          table.clear().draw();
          table.destroy();
          this.dtTrigger.next();
          response.forEach(element => {
              this.testArreglo.push({"cuentasGasto":element.cuentaGasto,"egreso":element.egreso,"fechaHora":element.fechaHora,"ingreso":element.ingreso,"observaciones":element.observaciones,"personal":element.personal,"saldo":element.saldo});
          });


        } else {

          this.showNotification('top', 'center', response.mensaje, 'warning');

        }

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  }
  onSubmit() {
    this.clienteAll.forEach(element => {
      if (element.id == this.rendicion.personal_id) {
        this.rendicion.personal = element.nombre + " " + element.apellido

      }
    });
    this.cuentasGastosAll.forEach(element => {
      if (element.id == this.rendicion.CuentaGasto_id) {
        this.rendicion.cuentaGasto = element.cuenta_gasto

      }
    });
    const identity = JSON.parse(localStorage.getItem('identity'));
    this._RendicionesService.crear(this.rendicion, identity.token).subscribe(
      response => {
        this.completecampo = null;
        // console.log(response);
        if (response.estado != "ERROR") {
          this.showNotification('top', 'center', response.mensaje, 'success');
          this.getAll(this.rendicion.personal_id);
          this.rendicion = {
            'personal_id': '',
            'personal': '',
            'CuentaGasto_id': '',
            'cuentaGasto': '',
            'observaciones': '',
            'Ingreso': '',
            'Egreso': ''
          }
          $("#myModal").modal("hide");
        }
        else {
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

    this.dtOptions = {
      // dom: 'Bfrtip',
      // Configure the buttons
      // buttons: [
      //   'print',
      //   'excel',
      //   'csv',

      // ],
      dom: 'Bfrtip',
      paging: false,
      searching: true,
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
   
   $( ".dt-buttons" ).hide();


    //const table = $('#datatables').DataTable();



    //$('.card .material-datatables label').addClass('form-group');
  }
  public clear() {
    this.sindicato = {
      'basico_sindicato': '',
      'activo': true
    };
  }

  public fechaChange;
  onSubmitPersonal() {

  }
  public clienteAll;
  public getPersonal() {
    this._RendicionesService.getAllPersonal(this.identity.token).subscribe(
      response => {
        // console.log(response);
        if (response.estado != "ERROR") {
          this.clienteAll = response;
        }
        else {
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
  public cuentasGastosAll;
  public getCuentasGastos() {
    this._RendicionesService.getAllCuentasGastos(this.identity.token).subscribe(
      response => {
        // console.log(response);
        if (response.estado != "ERROR") {
          this.cuentasGastosAll = response;
        }
        else {
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
  onChange(deviceValue) {

    this.getAll(deviceValue.value);
  }

}
