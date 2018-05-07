import { Component, OnInit } from '@angular/core';
import { Unidad } from '../../models/unidad';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UnidadService } from '../../servicios/unidad.service';
import {MatDatepickerModule} from '@angular/material/datepicker';



declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss'],
  providers:[UnidadService]
})

export class UnidadComponent implements OnInit {


  constructor(private _UnidadService: UnidadService) { }
  private identity;
  public Unidad;
  public dataTable: DataTable;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  ngOnInit() {
    
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
         
    $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item active';
    this.ideliminado='';
    this.showrecuperar=false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.Unidad = {
      'unidad': '',
      'vtv': new Date(),
      'ruta':new Date(),
      'poliza':new Date(),
      'seguro':new Date(),
      'propia':true,
      'activo': true
    };
    this.All();

  }
  public test;
  onSubmit() {
    // this.Unidad = {
    //   'unidad': this.Unidad.unidad,
    //   'vtv': new Date(this.Unidad.vtv),
    //   'ruta':new Date(this.Unidad.ruta),
    //   'poliza':new Date(this.Unidad.poliza),
    //   'seguro':new Date(this.Unidad.seguro),
    //   'propia':this.Unidad.propia,
    //   'activo': true
    // };
 
    
    var mainPanel = document.getElementById('myModal');
    if (this.Unidad.unidad != '' && this.Unidad.propia != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._UnidadService.crear(this.Unidad, identity.token).subscribe(
        response => {
          this.completecampo = null;
          console.log(response);
          if (response.estado != "ERROR") {
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.Unidad = {
              'unidad': '',
              'vtv':new Date(),
              'ruta':new Date(),
              'poliza':new Date(),
              'seguro':new Date(),
              'propia':'',
              'activo': true
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
  public All() {
    this._UnidadService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.dataTable = {
            headerRow: ['cuentaGasto', 'Estado','Borrar'],
            footerRow: ['cuentaGasto', 'Estado','Borrar'],

            dataRows: response
          }
          this.donttable = true;

        } else {
          this.donttable = false;

          this.dataTable = {
            headerRow: ['cuentaGasto', 'Estado','Borrar'],
            footerRow: ['cuentaGasto', 'Estado','Borrar'],

            dataRows: [['', '', '']]
          }
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
    this._UnidadService.getId(id, this.identity.token).subscribe(
      response => {
        this.Unidad = {
          'id':response.id,
          'unidad': response.unidad,
          'vtv':new Date(response.vtv),
          'ruta':new Date(response.ruta),
          'poliza':new Date(response.poliza),
          'seguro':new Date(response.seguro),
          'propia':response.propia,
          'activo': response.activo
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
    if (this.Unidad.unidad != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._UnidadService.editar(this.Unidad, identity.token, this.Unidad.id).subscribe(
        response => {
          if (response.estado != "ERROR") {
            this.completecampo = null;
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.Unidad = {
              'unidad': '',
              'vtv':new Date(),
              'ruta':new Date(),
              'poliza':new Date(),
              'seguro':new Date(),
              'propia':'',
              'activo': true
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
    this._UnidadService.desabilitar(id, this.identity.token).subscribe(
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
    this._UnidadService.habilitar(id, this.identity.token).subscribe(
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
    this._UnidadService.eliminar(id, this.identity.token).subscribe(
      response => {
        this.All();
        this.showNotificationEliminar('top', 'center', response.mensaje, 'danger', id);
        $("#myModalEDITAR").modal("hide");
        this.showrecuperar=true;
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
    if(    this.ideliminado != ''    ){
      this._UnidadService.recuperar( this.ideliminado, this.identity.token).subscribe(
        response => {
          this.All();
          this.showNotification('top', 'center', response.mensaje, 'success');
          this.showrecuperar=false;

        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      );
    }
    else{
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

      "language": {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
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
      responsive: true,
      //   language: {
      //     search: "_INPUT_",
      //     searchPlaceholder: "Buscar",
      //   }

    });

    const table = $('#datatables').DataTable();



    //$('.card .material-datatables label').addClass('form-group');
  }
  public clear() {
    this.Unidad = {
      'unidad': '',
      'vtv':new Date(),
      'ruta':new Date(),
      'poliza':new Date(),
      'seguro':new Date(),
      'propia':'',
      'activo': true
    };
  }
}

