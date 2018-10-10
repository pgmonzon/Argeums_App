import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { IngresoSucursalService } from '../../services/ingreso-sucursal.service';
import { IngresoSucursal } from '../../models/ingresoSucursal';
import { SucursalService } from '../../services/sucursal.service';
import { Login } from '../../models/login';
import { DetalleIngresoSucursal } from '../../models/detalleIngresoSucursal';
import { Time } from '../../models/time';

declare const $: any;

@Component({
  selector: 'app-ingreso-sucursal',
  templateUrl: './ingreso-sucursal.component.html',
  styleUrls: ['./ingreso-sucursal.component.scss'],
  providers: [IngresoSucursalService, SucursalService]

})
export class IngresoSucursalComponent implements OnInit {
  public time: number;

  constructor(private _IngresoSucursalService: IngresoSucursalService, private _SucursalService: SucursalService, ) {this.time = Time.time }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  private identity;
  public errorMessage;
  public IngresoSucursal = new IngresoSucursal();
  public login = new Login();
  public DetalleIngresoSucursal = new DetalleIngresoSucursal();

  public loginIngresa = true;
  public FormActive = false;
  public loginRecibe = false;

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
    this.GetSucursal();


  }
  public sucursales;
  GetSucursal() {
    this._SucursalService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.sucursales = response;
          $("#myModalSucursal").modal("show");

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
  public error;
  onSubmit() {
    if(this.DetalleIngresoSucursal.cantidad >0 && this.DetalleIngresoSucursal.articulo !=null ){
      this.IngresoSucursal.detalle.push(this.DetalleIngresoSucursal);
      this.DetalleIngresoSucursal = new DetalleIngresoSucursal();
      $("#codigoB").val("");
      this.error=null;

    }else{
      this.error="Complete los campos";
    }
  
  }
  public articulos;
  All(idSucursal) {
    this._IngresoSucursalService.getAll(idSucursal, this.identity.token).subscribe(
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

  showNotification(from: any, align: any, text: any, color: any) {

    $.notify({
      icon: 'notifications',
      message: text
    }, {
        type: color,
        timer: this.time,
        delay: this.time,
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
      order: [[ 0, "desc" ]],


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
    // this.Articulo = new Articulo();
    // this.Articulo.promos = [];
    // this.selectPromoActive = false;
    this.login = new Login();
    this.IngresoSucursal.detalle = [];
    this.loginIngresa = true;
    this.FormActive = true;

    this.IngresoSucursal.sucursal = this.deSucursalSelect;
    this.IngresoSucursal.sucursal_id =this.idSucursal;
  }

  public idSucursal;
  public deSucursalSelect;
  public selectSucursal(sucursalId) {
    this.All(sucursalId.value);
    this.IngresoSucursal.sucursal_id = sucursalId.value;
    this.IngresoSucursal.sucursal = sucursalId.source.triggerValue;
    this.deSucursalSelect = sucursalId.source.triggerValue;
    this.idSucursal = sucursalId.value;
    $("#myModalSucursal").modal("hide");

  }
  public onSubmitLogin() {
    this._IngresoSucursalService.checkUser(this.login, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.IngresoSucursal.ingresante = response.usuario;
          this.IngresoSucursal.ingresante_id = response.id;
          this.loginIngresa = false;
          this.FormActive = true;

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

  public CodigoBarra(codigo) {
    this._IngresoSucursalService.getCodigoArticulo(codigo.target.value, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.DetalleIngresoSucursal.articulo_id = response.id;
          this.DetalleIngresoSucursal.articulo = response.articulo;

        }

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  borrarAriticulo(index) {
    this.IngresoSucursal.detalle.splice(index, 1);

  }
  onSubmitRecibe() {
    this._IngresoSucursalService.checkUser(this.login, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.IngresoSucursal.recibio = response.usuario;
          this.IngresoSucursal.recibio_id = response.id;
          this.FormActive = false;
          this.altaDeIngreso();

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

  altaDeIngreso() {
    this._IngresoSucursalService.crear(this.IngresoSucursal, this.identity.token).subscribe(
      response => {
        if (response.estado = "OK") {
          this.showNotification('top', 'center', response.mensaje, 'success');
          $("#myModal").modal("hide");
          this.IngresoSucursal = new IngresoSucursal();
          this.All(this.idSucursal);
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

  public detalle;
  getDetalle(id) {
    this.detalle = [];
    this._IngresoSucursalService.getId(id, this.identity.token).subscribe(
      response => {
        if (response.estado = "OK") {
          this.detalle = response.detalle;
          console.log(this.detalle);
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

  finalizarCarga() {

    this.FormActive = false;
    this.loginRecibe = true;
    this.login = new Login();
  }
}
