import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { RubroService } from '../../services/rubro.service';
import { Rubro } from '../../models/rubro';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss'],
  providers: [RubroService]

})
export class RubroComponent implements OnInit {

  constructor(private _RubroService: RubroService) { }
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  private identity;
  public errorMessage;
  public rubrolData = new Rubro();
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
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';
    this.identity = JSON.parse(localStorage.getItem('identity'));


    this.All();

  }
  public test;
  onSubmit() {
    this.rubrolData.activo = true;
    console.log(this.rubrolData);
    this._RubroService.crear(this.rubrolData, this.identity.token).subscribe(
      response => {
        if (response.estado = "OK") {
          this.showNotification('top', 'center', response.mensaje, 'success');
          $("#myModal").modal("hide");
          this.rubrolData = new Rubro();
          this.All();
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
  public editar(id) {
    this._RubroService.getId(id, this.identity.token).subscribe(
      response => {
        this.rubrolData=response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  onEdit() {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._RubroService.editar(this.rubrolData, identity.token, this.rubrolData.id).subscribe(
        response => {
          if (response.estado != "ERROR") {
            this.showNotification('top', 'center', response.mensaje, 'success');
            $("#myModalEdit").modal("hide");
            this.All();
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
  public rubros;
  public All() {
    this._RubroService.getAll(this.identity.token).subscribe(
      response => {
        this.rubros=[];
        if (response.estado != "ERROR") {
          var table = $('#first-table').DataTable();
          table.clear().draw();
          table.destroy();
          this.rubros = response;
          this.dtTriggerrr.next();
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
  public desabilitar(id) {
    this._RubroService.desabilitar(id, this.identity.token).subscribe(
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
    this._RubroService.habilitar(id, this.identity.token).subscribe(
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

  showNotification(from: any, align: any, text: any, color: any) {

    $.notify({
      icon: 'notifications',
      message: text
    }, {
        type: color,
        timer: 2000,
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
    this.rubrolData = new Rubro();


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
  public recuperar;
  public showrecuperar = false;
  eliminar(id) {
    this.recuperar = id;
    this._RubroService.eliminar(id, this.identity.token).subscribe(
      response => {
        this.showNotification('top', 'center', response.mensaje, 'danger');
        this.showrecuperar = true;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
    this.All();

  }
  public Recuperar() {
    if (this.recuperar != '') {
      this._RubroService.recuperar(this.recuperar, this.identity.token).subscribe(
        response => {
          this.All();
          this.showNotification('top', 'center', response.mensaje, 'success');
          this.showrecuperar = false;
          console.log(response);

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

}
