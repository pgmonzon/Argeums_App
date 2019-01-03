import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { IngresoSucursalService } from '../../services/ingreso-sucursal.service';
import { Venta } from '../../models/venta';
import { Gastos } from '../../models/Gastos';

import { SucursalService } from '../../services/sucursal.service';
import { Time } from '../../models/time';
import { VentasService } from '../../services/ventas.service';
import { ArticuloService } from '../../services/articulo.service';
import { Login } from '../../models/login';

import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [IngresoSucursalService, SucursalService,VentasService,ArticuloService]

})
export class VentasComponent implements OnInit {

  private identity;
  public formaPagoArray;
  public errorMessage;
  public time: number;
  public sucursales;
  public sucursal={sucursal_id:null,sucursal:null};
  public venta=new Venta();
  public gastos=new Gastos();
  public login = new Login();

  public users;
  dtTriggerrr: Subject<any> = new Subject();
  dtOptionss: any = {};
  public articulos=[{id:0,articulo:"",codigoBarras:""}];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 
  constructor(private _ArticuloService: ArticuloService,private _SucursalService: SucursalService,private _VentasService: VentasService ) { this.time = Time.time }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.GetSucursal();
    this.GetUsuarios();
    this.getCuentasGastos();
    this.formaPagoArray = [
      { value: 'Efectivo', viewValue: 'Efectivo' },
      { value: 'Tarjeta', viewValue: 'Tarjeta' },  
    ];



    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'articulo',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 6,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
      closeDropDownOnSelection:true,
      clearSearchFilter:true,
      defaultOpen:true
    };
   // this.AllArticulos();
  }
  onItemSelect(item: any) {
    this.venta.sbrArticulo=item.articulo;
    this.venta.sbrArticulo_id=item.id;
     var codigoBarra=this.articulos.find(x => x.id === item.id).codigoBarras;
    this.CodigoBarra(codigoBarra);


  }


  onFilterChange($event){
    if($event.length > 0){
      this._SucursalService.findByArticulo($event,this.identity.token).subscribe(
        response => {
          if (response.estado != "ERROR") {
            this.articulos = response;
          }
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      );
    }else{
     this.articulos=[{id:0,articulo:"",codigoBarras:""}];
    }
   
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
  public statusVenta;
  newVenta(id,status){
    this.statusVenta = status;
    this.detallesArray=[];
    this._VentasService.sbrVentasDetalleTraer(id, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
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
    this.venta.descuento=0;

  }
  public detallesGastos=[];
  newGastos(id,status){
    this.statusVenta = status;
    this.detallesGastos=[];
    this._VentasService.sbrVentasGastosTraer(id, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.detallesGastos=response;
        }
 

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
    this.gastos.sbrVentas_id=id;
    this.gastos.sucursal_id=this.sucursal.sucursal_id;
    this.gastos.sucursal=this.sucursal.sucursal;
    this.gastos.importe=null;
  }
  //VENTAS
  onSubmitVenta(){ 
    this._VentasService.sbrVentasDetalle(this.venta, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.newVenta(this.venta.sbrVentas_id,this.statusVenta);
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  //GASTOS
  onSubmitGastos(){ 
    this._VentasService.sbrVentasGastos(this.gastos, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.newGastos(this.gastos.sbrVentas_id,this.statusVenta);
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );

  }

  onSubmitLogin(){
    this._VentasService.checkUser(this.login, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          $("#User").modal("hide");
          this.login = new Login();
            this._VentasService.sbrVentasCerrarCaja(this.ventaId,{rendidoA_id:response.id,rendidoA:response.apellido}, this.identity.token).subscribe(
              response => {
                if (response.estado != "ERROR") {
                  this.All(this.sucursal.sucursal_id);
                }
              },
            );
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
  public ventaId;
  UserModal(id){
    this.ventaId=id;
  }
  public CodigoBarra(codigo) {
    this._VentasService.getCodigoArticulo(codigo, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.venta.importe=response.precio;
          //this.venta.sbrArticulo=response.articulo;
          //this.venta.sbrArticulo_id=response.id;
          this.venta.cobrado=response.precio;
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
          this.newVenta(this.venta.sbrVentas_id,this.statusVenta);
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
     this.gastos.vendedor=user.source.triggerValue;
     this.gastos.vendedor_id=user.value;
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
  public showSwal(index) {
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
        this.deleteDetalle(index);

      }
    }
    ).catch(swal.noop);
  }
  public showSwalGastos(index) {
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
        this.deleteGastos(index);

      }
    }
    ).catch(swal.noop);
  }
  deleteGastos(index){
    var detalle= this.detallesGastos[index];
    this._VentasService.deleteGastos(detalle.id,detalle, this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.newGastos(this.gastos.sbrVentas_id,this.statusVenta);
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public cuentasGastos=[];
  getCuentasGastos(){
    this._VentasService.getCuentasGastos(this.identity.token).subscribe(
      response => {
        this.cuentasGastos=response;
        if (response.estado != "ERROR") {
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public selectCuentasGastos(cuentasGastos) {
     this.gastos.cuentaGasto=cuentasGastos.source.triggerValue;
     this.gastos.cuentaGasto_id=cuentasGastos.value;
 }
}
