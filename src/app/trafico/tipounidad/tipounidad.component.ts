import { Component } from '@angular/core';
import { tipounidad } from '../../models/tipounidad';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { TipounidadService } from '../../servicios/tipounidad.service';
import 'rxjs/add/operator/map';
import { OnInit, AfterViewInit } from '@angular/core';

import swal from 'sweetalert2';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;


@Component({
    selector: 'tipo-unidad-cmp',
    templateUrl: 'tipounidad.component.html',
    providers: [TipounidadService]

})

export class TipoUnidadComponent {
    public tipounidad;
    public token;
    public errorMessage;
    public completecampo;
    public dataTipounidad;
    private identity;
    public ideliminado;
    public donttable;
    public showrecuperar;

    public dataTable: DataTable;

    constructor(
        private _TipoUnidadService: TipounidadService) {

    }
    public key = [];
    ngOnInit() {
        this.donttable = true;
        $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';

        $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item active';

        this.completecampo = null;
        this.identity = JSON.parse(localStorage.getItem('identity'));
        this.tipounidad = {
            'tipo_unidad': '',
            'activo': true
        };
        this.All();


    }

    onSubmit() {
        var mainPanel = document.getElementById('myModal');

        if (this.tipounidad.tipo_unidad != '') {
            const identity = JSON.parse(localStorage.getItem('identity'));
            this._TipoUnidadService.crear(this.tipounidad, identity.token).subscribe(
                response => {
                    this.completecampo = null;
                    if (response.estado != "ERROR") {
                        this.showNotification('top', 'center', response.mensaje, 'success');
                        this.tipounidad = {
                            'tipo_unidad': '',
                            'activo': true
                        };
                        this.donttable = true;
                        $("#myModal").modal("hide");
                        this.All();

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
            this.completecampo = "Complete el campo";
        }

    }


    public All() {
        this._TipoUnidadService.getAll(this.identity.token).subscribe(
            response => {
                if (response.estado != "ERROR") {
                    this.dataTable = {
                        headerRow: ['Tipo unidad', 'Estado', 'Borrar'],
                        footerRow: ['Tipo unidad', 'Estado', 'Borrar'],

                        dataRows: response
                    }
                    console.log(response);
                    
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
        this._TipoUnidadService.gettipounidad(id, this.identity.token).subscribe(
            response => {

                this.tipounidad = {
                    'id': response.id,
                    'tipo_unidad': response.tipo_unidad,
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
        if (this.tipounidad.tipo_unidad != '') {
            const identity = JSON.parse(localStorage.getItem('identity'));
            this._TipoUnidadService.editar(this.tipounidad, identity.token, this.tipounidad.id).subscribe(
                response => {
                    if (response.estado != "ERROR") {
                        this.completecampo = null;
                        this.showNotification('top', 'center', response.mensaje, 'success');
                        this.All();
                        this.tipounidad = {
                            'tipo_unidad': '',
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
        this._TipoUnidadService.desabilitar(id, this.identity.token).subscribe(
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
        this._TipoUnidadService.habilitar(id, this.identity.token).subscribe(
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
        this._TipoUnidadService.eliminar(id, this.identity.token).subscribe(
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

    public Recuperar() {
        if (this.ideliminado != '') {
            this._TipoUnidadService.recuperar(this.ideliminado, this.identity.token).subscribe(
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
            "order": [[ 0, "desc" ]],

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

    // this._TipoUnidadService.recuperar(id, this.identity.token).subscribe(
    //     response => {
    //         this.All();
    //         this.showNotification('top','center',response.mensaje,'success');

    //     },
    //     error => {
    //         this.errorMessage = <any>error;
    //         if (this.errorMessage != null) {
    //         }
    //     }
    // );


    public clear() {
        this.tipounidad = {
            'tipo_unidad': '',
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
