import { Component, OnInit, AfterViewInit } from '@angular/core';
import { basicosindicato } from '../../models/basicosindicato';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { SindicatoService } from '../../servicios/sindicato.service';
import swal from 'sweetalert2';


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;


@Component({
  selector: 'app-sindicato',
  templateUrl: './sindicato.component.html',
  styleUrls: ['./sindicato.component.scss'],
  providers: [SindicatoService]

})
export class SindicatoComponent implements OnInit {
  public dataTable: DataTable;
  private identity;
  public sindicato;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public ideliminado;
  constructor(
    private _SindicatoService: SindicatoService
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

    this._SindicatoService.getAll(this.identity.token).subscribe(
      response => {
        console.log(response);
        if (response.estado != "ERROR") {
          this.dataTable = {
            headerRow: ['Sindicato', 'Estado', 'Borrar'],
            footerRow: ['Sindicato', 'Estado', 'Borrar'],

            dataRows: response
          }
          this.donttable = true;
        } else {
          this.donttable = false;

          this.dataTable = {
            headerRow: ['Sindicato', 'Estado', 'Borrar'],
            footerRow: ['Sindicato', 'Estado', 'Borrar'],

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
  onSubmit() {
    var mainPanel = document.getElementById('myModal');
    if (this.sindicato.basico_sindicato != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._SindicatoService.crear(this.sindicato, identity.token).subscribe(
        response => {
          this.completecampo = null;
          console.log(response);
          if (response.estado != "ERROR") {
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.sindicato = {
              'categoria': '',
              'activo': true
            };
            $("#myModal").modal("hide");
            this.donttable = true;

          }
          else {
            this.donttable = false;

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
  public All() {
    this._SindicatoService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.dataTable = {
            headerRow: ['Sindicato', 'Estado', 'Borrar'],
            footerRow: ['Sindicato', 'Estado', 'Borrar'],

            dataRows: response
          }
          this.clear();
        } else {
          this.dataTable = {
            headerRow: ['Sindicato', 'Estado', 'Borrar'],
            footerRow: ['Sindicato', 'Estado', 'Borrar'],

            dataRows: [['', '']]
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


  public desabilitar(id) {
    this._SindicatoService.desabilitar(id, this.identity.token).subscribe(
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
    this._SindicatoService.habilitar(id, this.identity.token).subscribe(
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
  public eliminar(id) {
    this.ideliminado = id;
    this._SindicatoService.eliminar(id, this.identity.token).subscribe(
      response => {
        this.All();
        this.showNotification('top', 'center', response.mensaje, 'danger');
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
  public Recuperar() {
    if (this.ideliminado != '') {
      this._SindicatoService.recuperar(this.ideliminado, this.identity.token).subscribe(
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
  public editar(id) {
    this._SindicatoService.getId(id, this.identity.token).subscribe(
      response => {

        this.sindicato = {
          'id': response.id,
          'basico_sindicato': response.basico_sindicato,
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
    if (this.sindicato.basico_sindicato != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._SindicatoService.editar(this.sindicato, identity.token, this.sindicato.id).subscribe(
        response => {
          if (response.estado != "ERROR") {
            this.completecampo = null;
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();

            this.sindicato = {
              'id': '',

              'basico_sindicato': '',
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

    const table = $('#datatables').DataTable();
    $( ".dt-buttons" ).hide();



    //$('.card .material-datatables label').addClass('form-group');
  }
  public clear() {
    this.sindicato = {
      'basico_sindicato': '',
      'activo': true
    };
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
