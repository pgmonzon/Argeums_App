import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo';
import { Promo } from '../../models/promo';
import { StockService } from '../../services/stock.service';

import swal from 'sweetalert2';
import { RubroService } from '../../services/rubro.service';
import { Time } from '../../models/time';

declare const $: any;

@Component({
  selector: 'app-stock-articulo',
  templateUrl: './stock-articulo.component.html',
  styleUrls: ['./stock-articulo.component.scss'],
  providers: [ArticuloService, RubroService, StockService]

})
export class StockArticuloComponent implements OnInit {
  public time: number;
  constructor(private _ArticuloService: ArticuloService, private _Stock: StockService) { this.time = Time.time }

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

  public articulos;


  public All() {
    this._ArticuloService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          var table = $('#first-table').DataTable();
          table.clear().draw();
          table.destroy();

          this.articulos = response;
          this.articulos.sort(function (a, b) {
            const genreA = a.articulo.toUpperCase();
            const genreB = b.articulo.toUpperCase();

            let comparison = 0;
            if (genreA > genreB) {
              comparison = 1;
            } else if (genreA < genreB) {
              comparison = -1;
            }
            return comparison;
          });

          this.dtTriggerrr.next();
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

  public ArticuloStock;
  selectAriculo(value) {
    console.log(value.target.value);
    this._Stock.getAllArticulos(this.identity.token, value.target.value).subscribe(
      response => {

        if (response.estado != "ERROR") {
          var table = $('#first-table').DataTable();
          table.clear().draw();
          table.destroy();
          this.ArticuloStock = response;
          console.log(this.ArticuloStock);
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
