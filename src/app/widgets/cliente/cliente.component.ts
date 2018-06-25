import { Component, OnInit } from '@angular/core';
import { clientes } from '../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { ClienteService } from '../../servicios/cliente.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { contactos } from '../../models/contacto';
import { tarifarios } from '../../models/tarifarios';
import { recorrido } from '../../models/recorrido';
import swal from 'sweetalert2';
import { NativeDateAdapter } from "@angular/material";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { SortablejsModule } from 'angular-sortablejs';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}


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
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [ClienteService,
    { provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }, { provide: MAT_DATE_LOCALE, useValue: 'ars-ARS' }]

})
export class ClienteComponent implements OnInit {

  constructor(private _ClienteService: ClienteService) {

  }
  private identity;
  public clientes;
  public recorrido;
  public dataTable: DataTable;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public selectpropia;
  public categoria;
  public sindicato;
  public contactos;
  public contactosarray = [];
  public tarifarios;
  public tarifariosarray = [];
  public tipounidades;
  public tipotarifario = [];
  public modalContactoshow;
  public modalcontactomensaje;
  public recorridoarray = [];
  public tipoVuelta;
  public tipoServicioar;
  ngOnInit() {
    $(".kmDesde").attr("hidden", "true");
    $(".kmHasta").attr("hidden", "true");
    $(".Locacion").attr("hidden", "true");


    this.modalcontactomensaje = true;
    this.selectpropia = [
      { value: true, viewValue: 'Si' },
      { value: false, viewValue: 'No' },

    ];
    this.tipoServicioar = [
      {'value': 'chofer', viewValue: 'chofer'},
      {'value': 'asistente', viewValue: 'asistente'},

    ];
    this.tipoVuelta = [
      {'value': '', viewValue: ''},
      {'value': '2da', viewValue: '2da'},
      {'value': '3ra', viewValue: '3ra'},
      {'value': '4ta', viewValue: '4ta'},

    ];
    this.tipotarifario = [
      { 'value': 'Kilometraje', 'viewValue': 'Kilometraje' },
      { 'value': 'Recorrido', 'viewValue': 'Recorrido' },
      { 'value': 'Rango Kilometraje', 'viewValue': 'Rango Kilometraje' },

    ];

    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';

    $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item active';
    this.ideliminado = '';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.clientes = {
      'id': '',
      'cliente': '',
      'activo': true,
      'contactos': [],
      'tarifarios': [],
      'cuit':''
    };
    this.contactos = {
      'nombre': '',
      'cargo': '',
      'telefono': '',

    };
    this.tarifarios = {
      'tarifario': '',
      'tipo': 'Kilometraje',
      'tipoUnidad_id': '',
      'importe': 0,
      'vigenteDesde': new Date(),
      'vigenteHasta': new Date(),
      'recorrido': [],
      'kmDesde': 0,
      'kmHasta': 0,
      'activo': true,
      'vuelta':'',
      'tipoServicio':''

    };
    this.recorrido = {
      'locacion_id': ''
    };
    this.getTipoUnidad();
    this.getLocacionAll();
    this.All();

  }
  public test;
  onContacto() {
    if (this.contactos.nombre != '') {
      this.contactosarray.push(this.contactos);
      this.contactos = {
        'nombre': '',
        'cargo': '',
        'telefono': '',

      };
      this.completecampo = null;

    }
    else {
      this.completecampo = "Complete los campos";

    }

  }
  onRecorrido() {
    this.recorridoarray.push(this.recorrido);
    this.recorrido = {
      'locacion_id': ''
    };


  }
  onTarifario() {
    if (this.tarifarios.tarifario != '') {
      this.tarifarios.recorrido = this.recorridoarray;
      if (this.tarifarios.tipoUnidad_id == '') {
        this.tarifarios.tipoUnidad_id = '111111111111111111111111';

      }
      this.tarifariosarray.push(this.tarifarios);
      this.recorridoarray = [];
      this.tarifarios = {
        'tarifario': '',
        'tipo': 'Kilometraje',
        'tipoUnidad_id': '',
        'importe': 0,
        'vigenteDesde': new Date(),
        'vigenteHasta': new Date(),
        'recorrido': [],
        'kmDesde': 0,
        'kmHasta': 0,
        'activo': true,
        'vuelta':'',
        'tipoServicio':''

      };
      console.log(this.tarifariosarray);
      this.completecampo = null;

    }
    else {
      this.completecampo = "Complete los campos";

    }

  }

  onSubmit() {
    this.clientes.contactos = this.contactosarray;
    this.clientes.tarifarios = this.tarifariosarray;

    var mainPanel = document.getElementById('myModal');
    if (this.clientes.cliente != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      console.log(this.clientes);
      this._ClienteService.crear(this.clientes, identity.token).subscribe(
        response => {
          console.log(response);
          this.completecampo = null;
          if (response.estado != "ERROR") {
            this.tarifariosarray = [];
            this.contactosarray = [];
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.clientes = {
              'id': '',
              'cliente': '',
              'activo': true,
              'contactos': [],
              'tarifarios': [],
              'cuit':''

            };
            $("#myModal").modal("hide");
            this.donttable = true;

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
    else {
      this.completecampo = "Complete los campos";
    }

  }
  /// headerRow: ['apellido','nombre','categoria','propio','basicoSindicato','comision', 'curso','lnh','registro','estado','borrado','time','Borrar'],

  public All() {
    this._ClienteService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.dataTable = {
            headerRow: ['Cliente', 'Contactos', 'Tarifarios', 'Estado', 'Borrar'],
            footerRow: ['Cliente', 'Contactos', 'Tarifarios', 'Estado', 'Borrar'],
            dataRows: response
          }
          console.log(this.dataTable);
          this.donttable = true;
        } else {
          this.donttable = false;

          this.dataTable = {
            headerRow: ['Cliente', 'Contactos', 'Tarifarios', 'Estado', 'Borrar'],
            footerRow: ['Cliente', 'Contactos', 'Tarifarios', 'Estado', 'Borrar'],

            dataRows: [['', '']]
          }
          this.showNotification('top', 'center', response.mensaje, 'warning');

        }

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  }
  public editar(id) {
    this._ClienteService.getId(id, this.identity.token).subscribe(
      response => {

        this.clientes = {
          'id': response.id,
          'cliente': response.cliente,
          'activo': true,
          'contactos': [],
          'tarifarios': [],
          'cuit':response.cuit

        };

        this.contactos = {
          'nombre': '',
          'cargo': '',
          'telefono': '',

        };
        this.tarifarios = {
          'tarifario': '',
          'tipo': 'Kilometraje',
          'tipoUnidad_id': '',
          'importe': 0,
          'vigenteDesde': new Date(),
          'vigenteHasta': new Date(),
          'recorrido': [],
          'kmDesde': 0,
          'kmHasta': 0,
          'activo': true,
          'vuelta':'',
          'tipoServicio':''

        };
        if (response.contactos != undefined) {
          this.contactosarray = response.contactos;

        }
        else {
          this.contactosarray = [];
        }
        if (response.tarifarios != undefined) {
          this.tarifariosarray = response.tarifarios;

        }
        else {
          this.tarifariosarray = [];
        }

        //this.recorridoarray=this.modaltarifarios[0].recorrido;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  onEdit() {
    if (this.clientes.cliente != '') {
      this.clientes.contactos = this.contactosarray;
      this.clientes.tarifarios = this.tarifariosarray;

      const identity = JSON.parse(localStorage.getItem('identity'));
      this._ClienteService.editar(this.clientes, identity.token, this.clientes.id).subscribe(
        response => {
          if (response.estado != "ERROR") {
            this.completecampo = null;
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.clientes = {
              'id': '',
              'cliente': '',
              'activo': true,
              'contactos': [],
              'tarifarios': [],
              'cuit':''

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
    this._ClienteService.desabilitar(id, this.identity.token).subscribe(
      response => {
        this.All();
        this.showNotification('top', 'center', response.mensaje, 'danger');

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  public habilitar(id) {
    this._ClienteService.habilitar(id, this.identity.token).subscribe(
      response => {
        this.All();
        this.showNotification('top', 'center', response.mensaje, 'success');

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public ideliminado;
  public eliminar(id) {
    this.ideliminado = id;
    this._ClienteService.eliminar(id, this.identity.token).subscribe(
      response => {
        this.All();
        this.showNotificationEliminar('top', 'center', response.mensaje, 'danger', id);
        $("#myModalEDITAR").modal("hide");
        this.showrecuperar = true;
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

  showNotificationEliminar(from: any, align: any, text: any, color: any, id) {

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
        template: '<div id="recuperarid" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +

          '</div>'
      });
  }

  public Recuperar() {
    if (this.ideliminado != '') {
      this._ClienteService.recuperar(this.ideliminado, this.identity.token).subscribe(
        response => {
          this.All();
          this.showNotification('top', 'center', response.mensaje, 'success');
          this.showrecuperar = false;

        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      );
    }
    else {
      this.showNotification('top', 'center', 'No hay documento para recuperar', 'warning');

    }
  }


  ngAfterViewInit() {
    $('#datatables').DataTable({
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
      //   language: {
      //     search: "_INPUT_",
      //     searchPlaceholder: "Buscar",
      //   }

    });
    // Delete a record
    $( ".dt-buttons" ).hide();

    //$('.card .material-datatables label').addClass('form-group');
  }
  public remove(row) {
    // const table = $('#contactotable').DataTable();

    // const $tr = $(this).closest('tr');
    // table.row($tr).remove().draw();
    // e.preventDefault();

    for (let index = 0; index < this.contactosarray.length; index++) {
      if (row == this.contactosarray[index].telefono) {
        this.contactosarray.splice(index, 1);

      }
    }

  }
  public removeTarifario(row) {

    for (let index = 0; index < this.tarifariosarray.length; index++) {
      if (row == this.tarifariosarray[index].tarifario) {
        this.tarifariosarray.splice(index, 1);

      }
    }

  }

  public clear() {
    this.clientes = {
      'id': '',
      'cliente': '',
      'activo': true,
      'contactos': [],
      'tarifarios': [],
      'cuit':''

    };
    this.contactosarray = [];
    this.tarifariosarray = [];
    this.recorridoarray = [];
  }
  public getTipoUnidad() {
    this._ClienteService.getTipoUnidad(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.tipounidades = response;

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
  public getlocaciones;
  public getLocacionAll() {
    this._ClienteService.getLocacionAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.getlocaciones = response;
          console.log(this.getlocaciones);
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
  public modalContacto(id) {
    this._ClienteService.getId(id, this.identity.token).subscribe(
      response => {
        if (response.contactos != undefined) {
          this.modalContactoshow = response.contactos;
          this.modalcontactomensaje = true;
        }
        else {
          this.modalContactoshow = [];

          this.modalcontactomensaje = "No tiene cargado contactos";

        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public modaltarifarios;
  public modalTarifario(id) {
    this._ClienteService.getId(id, this.identity.token).subscribe(
      response => {
        if (response.tarifarios != undefined) {
          this.modaltarifarios = response.tarifarios;

          this.modalcontactomensaje = true;
        }
        else {
          this.modaltarifarios = [];

          this.modalcontactomensaje = "No tiene cargado tarifarios";

        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public modalRecorrido(row) {
    for (let index = 0; index < this.modaltarifarios.length; index++) {
      if (row == this.modaltarifarios[index].tarifario) {
        this.recorridoarray = this.modaltarifarios[index].recorrido;

      }
    }
    $("#myModalTarifario").modal("hide");

  }



  onChange(deviceValue) {
    if (deviceValue.value == 'Kilometraje') {
      $(".kmDesde").attr("hidden", "true");
      $(".kmHasta").attr("hidden", "true");
      $(".Locacion").attr("hidden", "true");
      this.recorridoarray = [];


    }
    else if (deviceValue.value == "Recorrido") {
      $(".kmDesde").attr("hidden", "true");
      $(".kmHasta").attr("hidden", "true");
      $(".Locacion").removeAttr('hidden');

    }
    else {
      $(".Locacion").attr("hidden", "true");
      this.recorridoarray = [];

      $(".kmDesde").removeAttr('hidden');
      $(".kmHasta").removeAttr('hidden');

    }
  }
  public showSwal(id) {
    swal({
      title: 'Estás seguro?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success ',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'No',

      buttonsStyling: false
    }).then((isConfirm) => {

      if (isConfirm.value == true) {
        this.eliminar(id);

      }
    }
    ).catch(swal.noop);
  }

}
