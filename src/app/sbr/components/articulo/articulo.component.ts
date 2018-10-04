import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo';
import { Promo } from '../../models/promo';

import swal from 'sweetalert2';
import { RubroService } from '../../services/rubro.service';

declare const $: any;

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
  providers: [ArticuloService, RubroService]

})
export class ArticuloComponent implements OnInit {

  constructor(private _ArticuloService: ArticuloService, private _RubroService: RubroService) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  private identity;
  public errorMessage;
  public Articulo = new Articulo();
  public Promo = new Promo();

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
    this.GetRubros();


  }
  public rubros;
  GetRubros() {
    this._RubroService.getAll(this.identity.token).subscribe(
      response => {
        this.rubros = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  onSubmit() {
    this.Articulo.activo = true;
    this._ArticuloService.crear(this.Articulo, this.identity.token).subscribe(
      response => {
        if (response.estado = "OK") {
          this.showNotification('top', 'center', response.mensaje, 'success');
          $("#myModal").modal("hide");
          this.Articulo = new Articulo();
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
  public editar(id,articulo) {
    this._ArticuloService.getId(id, this.identity.token).subscribe(
      response => {
        this.Articulo = response;
        this.selectPromoActive = this.Articulo.esPromo;
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
    this._ArticuloService.editar(this.Articulo, identity.token, this.Articulo.id).subscribe(
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
  public articulos;
  public All() {
    this._ArticuloService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          var table = $('#first-table').DataTable();
          table.clear().draw();
          table.destroy();
          this.articulos = response;
          console.log(response);

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
    this._ArticuloService.desabilitar(id, this.identity.token).subscribe(
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
    this._ArticuloService.habilitar(id, this.identity.token).subscribe(
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
    this.Articulo = new Articulo();
    this.Articulo.promos = [];
    this.selectPromoActive = false;


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
    console.log(id);
    this._ArticuloService.eliminar(id, this.identity.token).subscribe(
      response => {
        this.All();
        this.showNotification('top', 'center', response.mensaje, 'danger');
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
    console.log(this.recuperar);
    if (this.recuperar != '') {
      this._ArticuloService.recuperar(this.recuperar, this.identity.token).subscribe(
        response => {
          console.log(response);
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
  selectRubro(rubro) {
    this.Articulo.rubro = rubro.source.triggerValue;
  }
  public selectPromoActive;
  selectPromo(selectPromo) {
    this.selectPromoActive = selectPromo.value;
  }
  public test = [];

  onSubmitPromo() {
    this.Articulo.promos.push(this.Promo);
    this.Promo = new Promo();
  }
  selectArticulo(articulo) {
    this.Promo.articulo = articulo.source.triggerValue;

  }

  EliminarPromo(index) {
    this.Articulo.promos.splice(index, 1);

  }
}
