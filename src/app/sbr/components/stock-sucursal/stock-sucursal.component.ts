import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { SucursalService } from '../../services/sucursal.service';
import { Articulo } from '../../models/articulo';
import { Promo } from '../../models/promo';
import { StockService } from '../../services/stock.service';

import swal from 'sweetalert2';
import { RubroService } from '../../services/rubro.service';

declare const $: any;

@Component({
  selector: 'app-stock-sucursal',
  templateUrl: './stock-sucursal.component.html',
  styleUrls: ['./stock-sucursal.component.scss'],
  providers: [SucursalService, RubroService,StockService]

})
export class StockSucursalComponent implements OnInit {

 
  constructor(private _SucursalService: SucursalService, private _Stock: StockService) { }

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
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.All();


  }
 
  public sucursal;
  public All() {
    this._SucursalService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.sucursal = response;
          $("#myModalSelect").modal("show");

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

  public SucursalStock;
  selectAriculo(value) {
    this._Stock.getAllSucursal(this.identity.token,value.value).subscribe(
      response => {

        if (response.estado != "ERROR") {
          var table = $('#first-table').DataTable();
          table.clear().draw();
          table.destroy();
          this.SucursalStock=response;

          this.dtTriggerrr.next();
          $("#myModalSelect").modal("hide");

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
}
