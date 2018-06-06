import { Component, OnInit } from '@angular/core';
import { personal } from '../../models/personal';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { PersonalService } from '../../servicios/personal.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import swal from 'sweetalert2';

import { NativeDateAdapter } from "@angular/material";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      //return date.toDateString();
    }
  }
}
export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
      dateInput: 'input',
      monthYearLabel: { year: 'numeric', month: 'numeric' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
  };
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
declare const google: any;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  providers: [PersonalService, { provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }, { provide: MAT_DATE_LOCALE, useValue: 'ars-ARS' }]
})
export class PersonalComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('searchs') public searchsElement: ElementRef;


  constructor(private _PersonalService: PersonalService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  private identity;
  public personal;
  public dataTable: DataTable;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public selectpropia;
  public categoria;
  public sindicato;
  public direccion;


  ngOnInit() {
    $(".editar").attr("hidden", "true");

    this.mapsAPILoader.load().then(
      () => {
        this.direccion = '';
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.address_components === undefined) {
              this.showNotification('top', 'center', 'Seleccione direccion del desplegable', 'danger');
            }
            else {
              if (place.address_components.length >= 4) {

                this.direccion = place.address_components[1].long_name + " " + place.address_components[0].long_name + " " + place.address_components[2].long_name + " " + place.address_components[4].long_name + " " + place.address_components[5].long_name;
                $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.direccion + "+&key=AIzaSyDlQrBuIX1ZWk7jtxyweWc3VMvQG7dtbck&libraries", function (json) {

                  // console.log(json.results[0].geometry);
                  this.hola = json.results[0].geometry.location.lat;
                  this.latitud = json.results[0].geometry.location.lat;
                  this.longitud = json.results[0].geometry.location.lng;
                  $("#latitud").val(this.latitud);
                  $("#longitud").val(this.longitud);

                  const myLatlng = new google.maps.LatLng(this.latitud, this.longitud);
                  const mapOptions = {
                    zoom: 14,
                    center: myLatlng,
                    scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
                    styles: [
                      { 'featureType': 'water', 'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }] },
                      {
                        'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{ 'hue': '#ff0000' },
                        { 'saturation': -100 }, { 'lightness': 99 }]
                      },
                      {
                        'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#808080' },
                        { 'lightness': 54 }]
                      },
                      { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ece2d9' }] },
                      { 'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ccdca1' }] },
                      { 'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#767676' }] },
                      { 'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#ffffff' }] },
                      { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] },
                      {
                        'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' },
                        { 'color': '#b8cb93' }]
                      },
                      { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] },
                      { 'featureType': 'poi.sports_complex', 'stylers': [{ 'visibility': 'on' }] },
                      { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] },
                      { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'simplified' }] }
                    ]
                  };
                  $("#regularMap").removeAttr('hidden');

                  const map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);
                  const Marker = new google.maps.Marker({
                    position: myLatlng,
                    title: 'Aqui estas!'
                  });
                  // To add the marker to the map, call setMap();
                  Marker.setMap(map);
                });
              }
              else {
                this.showNotification('top', 'center', 'Especificar altura', 'danger');
              }

            }

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
    this.mapsAPILoader.load().then(
      () => {
        this.direccion = '';
        let autocomplete = new google.maps.places.Autocomplete(this.searchsElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.address_components === undefined) {
              this.showNotification('top', 'center', 'Seleccione direccion del desplegable', 'danger');
            }
            else {
              if (place.address_components.length >= 4) {
                this.direccion = place.address_components[1].long_name + " " + place.address_components[0].long_name + " " + place.address_components[2].long_name + " " + place.address_components[4].long_name + " " + place.address_components[5].long_name;
                $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.direccion + "+&key=AIzaSyDlQrBuIX1ZWk7jtxyweWc3VMvQG7dtbck&libraries", function (json) {
                
                  // console.log(json.results[0].geometry);

                  this.latitud = json.results[0].geometry.location.lat;
                  this.longitud = json.results[0].geometry.location.lng;
                  $("#editlatitud").val(json.results[0].geometry.location.lat);
                  $("#editlongitud").val(json.results[0].geometry.location.lng);
                  const myLatlng = new google.maps.LatLng(this.latitud, this.longitud);
                  const mapOptions = {
                    zoom: 14,
                    center: myLatlng,
                    scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
                    styles: [
                      { 'featureType': 'water', 'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }] },
                      {
                        'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{ 'hue': '#ff0000' },
                        { 'saturation': -100 }, { 'lightness': 99 }]
                      },
                      {
                        'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#808080' },
                        { 'lightness': 54 }]
                      },
                      { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ece2d9' }] },
                      { 'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ccdca1' }] },
                      { 'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#767676' }] },
                      { 'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#ffffff' }] },
                      { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] },
                      {
                        'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' },
                        { 'color': '#b8cb93' }]
                      },
                      { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] },
                      { 'featureType': 'poi.sports_complex', 'stylers': [{ 'visibility': 'on' }] },
                      { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] },
                      { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'simplified' }] }
                    ]
                  };
                  $("#regularMap").removeAttr('hidden');

                  const map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);
                  const Marker = new google.maps.Marker({
                    position: myLatlng,
                    title: 'Aqui estas!'
                  });
                  // To add the marker to the map, call setMap();
                  Marker.setMap(map);
                });
              }
              else {
                this.showNotification('top', 'center', 'Especificar altura', 'danger');
              }

            }
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
    this.selectpropia = [
      { value: true, viewValue: 'Si' },
      { value: false, viewValue: 'No' },

    ];

    $.fn.dataTable.ext.classes.sPageButton = 'page-item active mat-button';

    $.fn.dataTable.ext.classes.sPageButtonActive = 'page-item active';
    this.ideliminado = '';
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.personal = {
      'id': '',
      'apellido': '',
      'nombre': '',
      'categoria_id': '',
      'propio': '',
      'basicoSindicato_id': '',
      'comision': '',
      'curso': new Date(),
      'lnh': new Date(),
      'registro': new Date(),
      'activo': true,
      'direccion': '',
      'celular': '',
      'latitud': '',
      'longitud': '',
      'fechaAlta': '',
      'fechaBaja': ''

    };
    this.getCategoria();
    this.getSindicato();
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

    this.personal.direccion = this.direccion;
    this.personal.latitud = $("#latitud").val();
    this.personal.longitud = $("#longitud").val();

    var mainPanel = document.getElementById('myModal');

    if (this.personal.apellido != '') {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._PersonalService.crear(this.personal, identity.token).subscribe(
        response => {
          this.completecampo = null;
          console.log(response);
          if (response.estado != "ERROR") {
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.personal = {
              'id': '',
              'apellido': '',
              'nombre': '',
              'categoria_id': '',
              'propio': '',
              'basicoSindicato_id': '',
              'comision': '',
              'curso': new Date(),
              'lnh': new Date(),
              'registro': new Date(),
              'activo': true,
              'direccion': '',
              'celular': '',
              'latitud': '',
              'longitud': '',
              'fechaAlta':new Date(),
              'fechaBaja':new Date()

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
  /// headerRow: ['apellido','nombre','categoria','propio','basicoSindicato','comision', 'curso','lnh','registro','estado','borrado','time','Borrar'],

  public All() {
    this._PersonalService.getAll(this.identity.token).subscribe(
      response => {
        if (response.estado != "ERROR") {
          this.dataTable = {
            headerRow: ['Apellido', 'Nombre','Direccion','Celuar', 'Categoria', 'Propio', 'Sindicato', 'Comision', 'Curso', 'Lnh', 'Registro', 'Estado'],
            footerRow: ['Apellido', 'Nombre','Direccion','Celuar', 'Categoria', 'Propio', 'Sindicato', 'Comision', 'Curso', 'Lnh', 'Registro', 'Estado'],

            dataRows: response
          }
          console.log(response);
          this.donttable = true;
        } else {
          this.donttable = false;

          this.dataTable = {
            headerRow: ['Categoria', 'Estado', 'Borrar'],
            footerRow: ['Categoria', 'Estado', 'Borrar'],

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
  public editar(id) {
    $(".crear").attr("hidden", "true");
    $(".editar").removeAttr('hidden');
    this._PersonalService.getId(id, this.identity.token).subscribe(
      response => {

        this.personal = {
          'id': response.id,
          'apellido': response.apellido,
          'nombre': response.nombre,
          'categoria_id': response.categoria_id,
          'propio': response.propio,
          'basicoSindicato_id': response.basicoSindicato_id,
          'comision': response.comision,
          'curso': new Date(response.curso),
          'lnh': new Date(response.lnh),
          'registro': new Date(response.registro),
          'activo': true,
          'direccion': response.direccion,
          'celular': response.celular,
          'latitud': response.latitud,
          'longitud': response.longitud,
          'fechaAlta': new Date(response.fechaAlta),
          'fechaBaja': new Date(response.fechaBaja)

        };
        $("#editlatitud").val(response.latitud);
        $("#editlongitud").val(response.longitud);
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + response.direccion + "+&key=AIzaSyDlQrBuIX1ZWk7jtxyweWc3VMvQG7dtbck&libraries", function (json) {
          console.log(json.results[0].geometry.location.lat);
          console.log(json.results[0].geometry.location.lng);
          // console.log(json.results[0].geometry);
          this.latitud = json.results[0].geometry.location.lat;
          this.longitud = json.results[0].geometry.location.lng;
          const myLatlng = new google.maps.LatLng(this.latitud, this.longitud);
          const mapOptions = {
            zoom: 14,
            center: myLatlng,
            scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [
              { 'featureType': 'water', 'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }] },
              {
                'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{ 'hue': '#ff0000' },
                { 'saturation': -100 }, { 'lightness': 99 }]
              },
              {
                'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#808080' },
                { 'lightness': 54 }]
              },
              { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ece2d9' }] },
              { 'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ccdca1' }] },
              { 'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#767676' }] },
              { 'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#ffffff' }] },
              { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] },
              {
                'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' },
                { 'color': '#b8cb93' }]
              },
              { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] },
              { 'featureType': 'poi.sports_complex', 'stylers': [{ 'visibility': 'on' }] },
              { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] },
              { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'simplified' }] }
            ]
          };
          $("#regularMap").removeAttr('hidden');

          const map = new google.maps.Map(document.getElementById('regularMap'), mapOptions);
          const Marker = new google.maps.Marker({
            position: myLatlng,
            title: 'Aqui estas!'
          });
          // To add the marker to the map, call setMap();
          Marker.setMap(map);
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  cancelaredit() {
    
    this.completecampo = '';

    $(".editar").attr("hidden", "true");
    $(".crear").removeAttr('hidden');
    $("#regularMap").attr("hidden", "true");
    $("#latitud").val('');
    $("#longitud").val('');
    this.direccion = '';
    
    this.personal = {
   
      'id': '',
      'apellido': '',
      'nombre': '',
      'categoria_id': '',
      'propio': '',
      'basicoSindicato_id': '',
      'comision': '',
      'curso': new Date(),
      'lnh': new Date(),
      'registro': new Date(),
      'activo': true,
      'direccion': '',
      'celular': '',
      'latitud': '',
      'longitud': '',
      'fechaAlta': new Date(),
      'fechaBaja': new Date()
    };
  }
  onEdit() {
    if (this.personal.unidad != '') {
      if (this.direccion != '') {
        this.personal.direccion = this.direccion;
        this.personal.latitud = $("#editlatitud").val();
        this.personal.longitud = $("#editlongitud").val();
      }
      const identity = JSON.parse(localStorage.getItem('identity'));
      this._PersonalService.editar(this.personal, identity.token, this.personal.id).subscribe(
        response => {
          if (response.estado != "ERROR") {
            this.completecampo = null;
            this.showNotification('top', 'center', response.mensaje, 'success');
            this.All();
            this.personal = {
              // 'unidad': '',
              // 'vtv':new Date(),
              // 'ruta':new Date(),
              // 'poliza':new Date(),
              // 'seguro':new Date(),
              // 'propia':'',
              // 'activo': true
              'id': '',
              'apellido': '',
              'nombre': '',
              'categoria_id': '',
              'propio': '',
              'basicoSindicato_id': '',
              'comision': '',
              'curso': new Date(),
              'lnh': new Date(),
              'registro': new Date(),
              'activo': true,
              'direccion': '',
              'celular': '',
              'latitud': '',
              'longitud': '',
              'fechaAlta': '',
              'fechaBaja': ''
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
    this._PersonalService.desabilitar(id, this.identity.token).subscribe(
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
    this._PersonalService.habilitar(id, this.identity.token).subscribe(
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
    this._PersonalService.eliminar(id, this.identity.token).subscribe(
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
    if (this.ideliminado != '') {
      this._PersonalService.recuperar(this.ideliminado, this.identity.token).subscribe(
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


  ngAfterViewInit() {
    $('#datatables').DataTable({
      dom: 'Bfrtip',
      "bPaginate": true,
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "todos"]
      ],

      "order": [[0, "asc"]],

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



    //$('.card .material-datatables label').addClass('form-group');
  }
  public clear() {
    this.personal = {
      'id': '',
      'apellido': '',
      'nombre': '',
      'categoria_id': '',
      'propio': '',
      'basicoSindicato_id': '',
      'comision': '',
      'curso': new Date(),
      'lnh': new Date(),
      'registro': new Date(),
      'activo': true,
      'direccion': '',
      'celular': '',
      'latitud': '',
      'longitud': '',
      'fechaAlta': '',
      'fechaBaja': ''

    };
  }
  public getSindicato() {

    this._PersonalService.getSindicato(this.identity.token).subscribe(
      response => {
        this.sindicato = response;


      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
  }

  public getCategoria() {
    this._PersonalService.getAllCategoria(this.identity.token).subscribe(
      response => {
        this.categoria = response;

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      });
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
