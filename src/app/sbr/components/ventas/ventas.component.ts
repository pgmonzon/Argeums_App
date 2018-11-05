import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { IngresoSucursalService } from '../../services/ingreso-sucursal.service';
import { Venta } from '../../models/venta';
import { SucursalService } from '../../services/sucursal.service';
import { Time } from '../../models/time';
import { VentasService } from '../../services/ventas.service';


declare const $: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [IngresoSucursalService, SucursalService,VentasService]

})
export class VentasComponent implements OnInit {

  private identity;
  public formaPagoArray;
  public errorMessage;
  public time: number;
  public sucursales;
  public sucursal={sucursal_id:null,sucursal:null};
  public venta=new Venta();
  public users;
  dtTriggerrr: Subject<any> = new Subject();
  dtOptionss: any = {};

 
  constructor(private _SucursalService: SucursalService,private _VentasService: VentasService ) { this.time = Time.time }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.GetSucursal();
    this.GetUsuarios();

    this.formaPagoArray = [
      { value: 'Efectivo', viewValue: 'Efectivo' },
      { value: 'Tarjeta', viewValue: 'Tarjeta' },  
    ];
  }
  
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
  GetUsuarios() {
    this._VentasService.usuariosEmpresa(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.users=response;
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
  public idSucursal;
  public deSucursalSelect;
  public selectSucursal(sucursalId) {
    this.All(sucursalId.value);
    this.sucursal.sucursal = sucursalId.source.triggerValue;
     this.sucursal.sucursal_id = sucursalId.value;
    $("#myModalSucursal").modal("hide");

  }

  public ventas;
  All(idSucursal) {
    this._VentasService.getAll(idSucursal, this.identity.token).subscribe(
      response => {
        console.log(response);
        if (response.estado != "ERROR") {
          var table = $('#first-table').DataTable();
          table.clear().draw();
          table.destroy();
          this.ventas = response;
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
  agregar(){
    this._VentasService.sbrVentas(this.sucursal, this.identity.token).subscribe(
      response => {
        this.All(this.sucursal.sucursal_id);

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

  public detallesArray=[];
  newVenta(id){
    this.detallesArray=[];
    this._VentasService.sbrVentasDetalleTraer(id, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          console.log(response);
          this.detallesArray=response;
        }
 

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
    this.venta.sbrVentas_id=id;
    this.venta.sucursal_id=this.sucursal.sucursal_id;
    this.venta.sucursal=this.sucursal.sucursal;
    this.venta.formaPago=null;
    this.venta.importe=null;
    this.venta.descuento=null;
    this.venta.cobrado=null;


  }

  onSubmitVenta(){
    this._VentasService.sbrVentasDetalle(this.venta, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.newVenta(this.venta.sbrVentas_id);
          $("#codigoB").val("");
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
    this._VentasService.getCodigoArticulo(codigo.target.value, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.venta.importe=response.precio;
          this.venta.sbrArticulo=response.articulo;
          this.venta.sbrArticulo_id=response.id;
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public DescuentoChange(descuento) {
    this.venta.cobrado=this.venta.importe-  descuento.target.value;
  }

  deleteDetalle(index){
    var detalle= this.detallesArray[index];
    this._VentasService.deleteDetalle(detalle.id,detalle, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.newVenta(this.venta.sbrVentas_id);
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  public selectUser(user) {
     this.venta.vendedor=user.source.triggerValue;
     this.venta.vendedor_id=user.value;
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

}
