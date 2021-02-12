import { Component, OnInit } from "@angular/core";
import { ViajesService } from "../../servicios/viajes.service";
import swal from "sweetalert2";

import { NativeDateAdapter } from "@angular/material";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
}
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" },
  },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "numeric" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  },
};

@Component({
  selector: "app-viajes",
  templateUrl: "./viajes.component.html",
  styleUrls: ["./viajes.component.scss"],
  providers: [
    ViajesService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
  ],
})
export class ViajesComponent implements OnInit {
  date: Date = new Date();

  constructor(private _ViajesService: ViajesService) {}
  private identity;
  public Viajes;
  public paradas;
  public dataTable: DataTable;
  public donttable;
  public errorMessage;
  public completecampo;
  public showrecuperar;
  public ValorViaje;
  public modalestado = "";
  public modalValorDistinto = "";
  public modalCostoDistinto = "";
  public Observaciones;
  public arrayvueltas = [];
  public arraytipo = [];
  public direccionPersonal;
  public autblock = 1;
  public fechaDesde;
  public fechaHasta;
  public fecha;
  public loader = false;
  ngOnInit() {
    $.fn.dataTable.ext.classes.sPageButton = "page-item active mat-button";
    this.ValorViaje = {
      importe: "",
    };
    this.Observaciones = {
      observacion: "",
    };
    this.fecha = { date: new Date() };

    this.arrayvueltas = [
      { value: "", viewValue: "" },
      { value: "2da", viewValue: "2da" },
      { value: "3ra", viewValue: "3ra" },
      { value: "4ta", viewValue: "4ta" },
      { value: "horas extras", viewValue: "horas extras" },
      {
        value: "adicional larga distancia",
        viewValue: "adicional larga distancia",
      },
      { value: "vuelta con devolución", viewValue: "vuelta con devolución" },
      { value: "reparto", viewValue: "reparto" },
    ];
    this.arraytipo = [
      { value: "", viewValue: "" },
      { value: "chofer", viewValue: "chofer" },
      { value: "asistente", viewValue: "asistente" },
    ];
    $.fn.dataTable.ext.classes.sPageButtonActive = "page-item active";
    this.ideliminado = "";
    this.showrecuperar = false;
    this.identity = JSON.parse(localStorage.getItem("identity"));
    this.Viajes = {
      fechaHora: new Date(),
      cliente_id: "",
      cliente: "",
      tipoUnidad_id: "",
      tipoUnidad: "",
      transportista_id: "",
      transportista: "",
      unidad_id: "",
      unidad: "",
      personal_id: "",
      personal: "",
      peajes: 0,
      observaciones: "",
      kilometraje: 0,
      paradas: [],
      vuelta: "",
      celular: "",
      tipo: "",
      adicional: "",
      importe: 0,
      regreso: 0,
      remitosDetalle: "",
    };
    this.paradas = {
      locacion_id: "",
      locacion: "",
    };
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();

    this.fechaDesde.setHours(0, 0, 0);
    this.fechaHasta.setHours(23, 59, 59);
    this.All(this.fechaDesde, this.fechaHasta);
    this.getClienteAll();
    this.getTipoUnidadAll();
    this.getTransportistaAll();
    this.getUnidadAll();
    this.getPersonalAll();
    this.getLocacionesAll();
  }
  public locacionesArray = [];
  public block = 0;
  public mapArray = [];
  public total = 0;
  public kmAnterior;
  onLocaciones() {
    if (this.paradas.locacion_id != "") {
      this.locacionesAll.forEach((element) => {
        if (element.id == this.paradas.locacion_id) {
          this.paradas.locacion = element.locacion;
          this.locacionesArray.push(this.paradas);
          this.mapArray.push(element.direccion);
          this.paradas = {
            locacion_id: "",
            locacion: "",
          };

          if (this.mapArray.length > 1) {
            this.loader = true;

            this._ViajesService
              .map(
                this.mapArray[this.mapArray.length - 2],
                this.mapArray[this.mapArray.length - 1]
              )
              .subscribe(
                (response) => {
                  this.kmAnterior = response.rows[0].elements[0].distance.value;
                  this.total =
                    this.total + response.rows[0].elements[0].distance.value;
                  $("#kilometraje").val(this.total / 1000 + " km");
                  this.Viajes.kilometraje = Math.round(this.total / 1000);
                  this.loader = false;
                },
                (error) => {
                  this.errorMessage = <any>error;
                  if (this.errorMessage != null) {
                  }
                }
              );
          } else {
          }
        }
      });
    }
    this.block = 1;
  }

  clearLocacion() {
    this.locacionesArray = [];
    this.block = 0;
    this.mapArray = [];
    $("#kilometraje").val(0);
    this.Viajes.kilometraje = 0;
  }

  //eliminar locaciones
  locacionArrayDelete(id) {
    this.loader = true;

    for (let index = 0; index < this.locacionesArray.length; index++) {
      if (id == this.locacionesArray[index].locacion_id) {
        this.locacionesArray.splice(index, 1);
        if (this.locacionesArray.length > 1) {
          this.total = this.total - this.kmAnterior;
          $("#kilometraje").val(this.total / 1000 + " km");
          this.Viajes.kilometraje = Math.round(this.total / 1000);
        } else {
          this.total = 0;
          $("#kilometraje").val(0);
          this.Viajes.kilometraje = 0;
        }

        this.loader = false;
      }
    }
    this.locacionesAll.forEach((element) => {
      if (element.id == id) {
        for (var i = 0; i < this.mapArray.length; i++) {
          if (element.direccion == this.mapArray[i]) {
            this.mapArray.splice(i, 1);
          }
        }
      }
    });
  }
  onSubmit() {
    if (this.Viajes.cliente_id != "") {
      this.clienteAll.forEach((element) => {
        if (element.id == this.Viajes.cliente_id) {
          this.Viajes.cliente = element.cliente;
        }
      });
    } else {
      this.Viajes.cliente_id = "111111111111111111111111";
    }
    if (this.Viajes.tipoUnidad_id != "") {
      this.tipoUnidadAll.forEach((element) => {
        if (element.id == this.Viajes.tipoUnidad_id) {
          this.Viajes.tipoUnidad = element.tipo_unidad;
        }
      });
    } else {
      this.Viajes.tipoUnidad_id = "111111111111111111111111";
    }
    if (this.Viajes.transportista_id != "") {
      this.transportistaAll.forEach((element) => {
        if (element.id == this.Viajes.transportista_id) {
          this.Viajes.transportista = element.transportista;
        }
      });
    } else {
      this.Viajes.transportista_id = "111111111111111111111111";
    }
    if (this.Viajes.unidad_id != "") {
      this.unidadAll.forEach((element) => {
        if (element.id == this.Viajes.unidad_id) {
          this.Viajes.unidad = element.unidad;
        }
      });
    } else {
      this.Viajes.unidad_id = "111111111111111111111111";
    }
    if (this.Viajes.personal_id != "") {
      this.autblock = 2;
      this.personalAll.forEach((element) => {
        if (element.id == this.Viajes.personal_id) {
          this.Viajes.personal = element.apellido;
          this.Viajes.celular = element.celular;
          this.direccionPersonal = element.direccion;
          if (this.direccionPersonal != "") {
            if (this.mapArray.length <= 0) {
              this.Viajes.regreso = 0;
            } else {
              this._ViajesService
                .map(
                  this.direccionPersonal,
                  this.mapArray[this.mapArray.length - 1]
                )
                .subscribe(
                  (response) => {
                    this.total = response.rows[0].elements[0].distance.value;
                    this.Viajes.regreso = Math.round(this.total / 1000);
                    this.altaviaje();
                  },
                  (error) => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                    }
                  }
                );
            }
          } else {
            this.Viajes.regreso = 0;
            this.autblock = 1;
          }
        }
      });
    } else {
      this.Viajes.personal_id = "111111111111111111111111";
    }
    if (this.autblock == 1) {
      this.altaviaje();
    }
  }
  public altaviaje() {
    this.Viajes.paradas = this.locacionesArray;
    //modulo de hora
    var hora = $("#hora").val();
    var explit = hora.split(":");
    var fecha = new Date(this.Viajes.fechaHora);
    fecha.setHours(parseInt(explit[0]));
    fecha.setMinutes(parseInt(explit[1]));
    this.Viajes.fechaHora = fecha;
    //fin modulo
    const identity = JSON.parse(localStorage.getItem("identity"));
    this._ViajesService.crear(this.Viajes, identity.token).subscribe(
      (response) => {
        this.completecampo = null;
        if (response.estado != "ERROR") {
          this.showNotification("top", "center", response.mensaje, "success");
          this.Viajes = {
            id: "",
            fechaHora: new Date(),
            cliente_id: "",
            cliente: "",
            tipoUnidad_id: "",
            tipoUnidad: "",
            transportista_id: "",
            transportista: "",
            unidad_id: "",
            unidad: "",
            personal_id: "",
            personal: "",
            peajes: 0,
            observaciones: "",
            kilometraje: 0,
            paradas: [],
            vuelta: "",
            celular: "",
            tipo: "",
            adicional: "",
            importe: 0,
            regreso: 0,
            remitosDetalle: "",
          };
          this.locacionesArray = [];
          this.block = 0;
          this.mapArray = [];
          this.total = 0;
          $("#myModal").modal("hide");
          this.donttable = true;
          this.All(this.fechaDesde, this.fechaHasta);
          this.autblock = 1;
        } else {
          this.donttable = false;

          this.showNotification("top", "center", response.mensaje, "danger");
        }
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public viajesArray;

  public All(desde, hasta) {
    this._ViajesService.getAll(this.identity.token, desde, hasta).subscribe(
      (response) => {
        if (response.estado != "ERROR") {
          this.viajesArray = response;
          this.donttable = true;
        } else {
          this.donttable = false;

          this.showNotification("top", "center", response.mensaje, "warning");
        }
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public clientEDIT;
  public clienteEstado;
  public editar(id) {
    this.viajesArray.forEach((element) => {
      if (element.id == id) {
        // element.paradas.forEach(paradas => {
        //   this.locacionesAll.forEach(locaciones => {
        //     if (locaciones.id == paradas.locacion_id) {
        //       this.mapArray.push(locaciones.direccion);

        //     }
        //   });
        // });
        this.locacionesArray = element.paradas;
        var fecha = new Date(element.fechaHora);
        // var hora = element.fechaHora.split("T");
        // var horaMinuto = hora[1].split(":");

        $("#horaedit").val(
          (fecha.getHours() < 10 ? "0" : "") +
            fecha.getHours() +
            ":" +
            (fecha.getMinutes() < 10 ? "0" : "") +
            fecha.getMinutes()
        );

        this.clientEDIT = element.editable;
        this.clienteEstado = element.estado;
        this.Viajes = {
          id: element.id,
          fechaHora: new Date(element.fechaHora),
          cliente_id: element.cliente_id,
          cliente: element.cliente,
          tipoUnidad_id: element.tipoUnidad_id,
          tipoUnidad: element.tipo_unidad,
          transportista_id: element.transportista_id,
          transportista: element.transportista,
          unidad_id: element.unidad_id,
          unidad: element.unidad,
          personal_id: element.personal_id,
          personal: element.personal,
          peajes: element.peajes,
          observaciones: element.observaciones,
          kilometraje: element.kilometraje,
          paradas: [],
          vuelta: element.vuelta,
          celular: element.celular,
          tipo: element.tipo,
          adicional: element.adicional,
          importe: element.importe,
          regreso: element.regreso,
          remitosDetalle: element.remitosDetalle,
        };
      }
    });
  }

  onEdit() {
    if (this.Viajes.cliente_id != "") {
      this.clienteAll.forEach((element) => {
        if (element.id == this.Viajes.cliente_id) {
          this.Viajes.cliente = element.cliente;
        }
      });
    } else {
      this.Viajes.cliente_id = "111111111111111111111111";
    }
    if (this.Viajes.tipoUnidad_id != "") {
      this.tipoUnidadAll.forEach((element) => {
        if (element.id == this.Viajes.tipoUnidad_id) {
          this.Viajes.tipoUnidad = element.tipo_unidad;
        }
      });
    } else {
      this.Viajes.tipoUnidad_id = "111111111111111111111111";
    }
    if (this.Viajes.transportista_id != "") {
      this.transportistaAll.forEach((element) => {
        if (element.id == this.Viajes.transportista_id) {
          this.Viajes.transportista = element.transportista;
        }
      });
    } else {
      this.Viajes.transportista_id = "111111111111111111111111";
    }
    if (this.Viajes.unidad_id != "") {
      this.unidadAll.forEach((element) => {
        if (element.id == this.Viajes.unidad_id) {
          this.Viajes.unidad = element.unidad;
        }
      });
    } else {
      this.Viajes.unidad_id = "111111111111111111111111";
    }
    if (this.Viajes.personal_id != "") {
      this.autblock = 2;
      this.personalAll.forEach((element) => {
        if (element.id == this.Viajes.personal_id) {
          this.Viajes.personal = element.apellido;
          this.Viajes.celular = element.celular;
          this.direccionPersonal = element.direccion;
          if (this.direccionPersonal != "") {
            if (this.locacionesArray.length <= 0) {
              this.Viajes.regreso = 0;
            } else {
              var dire = this.locacionesArray[this.locacionesArray.length - 1];

              this.locacionesAll.forEach((loca) => {
                if (loca.id == dire.locacion_id) {
                  var direccion = loca.direccion;
                  this._ViajesService
                    .map(this.direccionPersonal, direccion)
                    .subscribe(
                      (response) => {
                        this.total =
                          response.rows[0].elements[0].distance.value;
                        this.Viajes.regreso = Math.round(this.total / 1000);
                        this.guardarViaje();
                      },
                      (error) => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                          this.autblock = 1;
                        }
                      }
                    );
                }
              });
            }
          } else {
            this.Viajes.regreso = 0;
            this.autblock = 1;
          }
        } else {
          this.autblock = 1;
        }
      });
    } else {
      this.Viajes.personal_id = "111111111111111111111111";
      this.autblock = 1;
    }
    if (this.autblock == 1) {
      this.guardarViaje();
    }
  }
  public guardarViaje() {
    this.Viajes.paradas = this.locacionesArray;
    // this.Viajes.fechaHora=new Date(this.Viajes.fechaHora);
    //modulo de hora
    var hora = $("#horaedit").val();
    var explit = hora.split(":");
    var fecha = new Date(this.Viajes.fechaHora);
    fecha.setHours(parseInt(explit[0]));
    fecha.setMinutes(parseInt(explit[1]));
    this.Viajes.fechaHora = fecha;
    //fin modulo
    const identity = JSON.parse(localStorage.getItem("identity"));
    this._ViajesService
      .editar(this.Viajes, identity.token, this.Viajes.id)
      .subscribe(
        (response) => {
          if (response.estado != "ERROR") {
            this.completecampo = null;
            this.showNotification("top", "center", response.mensaje, "success");
            this.All(this.fechaDesde, this.fechaHasta);
            this.Viajes = {
              id: "",
              fechaHora: new Date(),
              cliente_id: "",
              cliente: "",
              tipoUnidad_id: "",
              tipoUnidad: "",
              transportista_id: "",
              transportista: "",
              unidad_id: "",
              unidad: "",
              personal_id: "",
              personal: "",
              peajes: 0,
              observaciones: "",
              kilometraje: 0,
              paradas: [],
              vuelta: "",
              celular: "",
              tipo: "",
              adicional: "",
              importe: 0,
              regreso: 0,
              remitosDetalle: "",
            };
            this.autblock = 1;

            $("#myModalEDITAR").modal("hide");
          } else {
            this.showNotification("top", "center", response.mensaje, "danger");
          }
        },
        (error) => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      );
  }
  public desabilitar(id) {
    this._ViajesService.desabilitar(id, this.identity.token).subscribe(
      (response) => {
        this.All(this.fechaDesde, this.fechaHasta);
        this.showNotification("top", "center", response.mensaje, "danger");
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  public habilitar(id) {
    this._ViajesService.habilitar(id, this.identity.token).subscribe(
      (response) => {
        this.All(this.fechaDesde, this.fechaHasta);
        this.showNotification("top", "center", response.mensaje, "success");
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public ideliminado;
  public eliminar(id) {
    this.ideliminado = id;
    this._ViajesService.eliminar(id, this.identity.token).subscribe(
      (response) => {
        this.All(this.fechaDesde, this.fechaHasta);
        this.showNotificationEliminar(
          "top",
          "center",
          response.mensaje,
          "danger",
          id
        );
        $("#myModalEDITAR").modal("hide");
        this.showrecuperar = true;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  showNotification(from: any, align: any, text: any, color: any) {
    $.notify(
      {
        icon: "notifications",
        message: text,
      },
      {
        type: color,
        timer: 5000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }

  showNotificationEliminar(from: any, align: any, text: any, color: any, id) {
    $.notify(
      {
        icon: "notifications",
        message: text,
      },
      {
        type: color,
        timer: 5000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div id="recuperarid" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          "</div>",
      }
    );
  }

  public Recuperar() {
    if (this.ideliminado != "") {
      this._ViajesService
        .recuperar(this.ideliminado, this.identity.token)
        .subscribe(
          (response) => {
            this.All(this.fechaDesde, this.fechaHasta);
            this.showNotification("top", "center", response.mensaje, "success");
            this.showrecuperar = false;
          },
          (error) => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
            }
          }
        );
    } else {
      this.showNotification(
        "top",
        "center",
        "No hay documento para recuperar",
        "warning"
      );
    }
  }

  ngAfterViewInit() {}
  public clear() {
    this.Viajes = {
      fechaHora: new Date(),
      cliente_id: "",
      cliente: "",
      tipoUnidad_id: "",
      tipoUnidad: "",
      transportista_id: "",
      transportista: "",
      unidad_id: "",
      unidad: "",
      personal_id: "",
      personal: "",
      peajes: 0,
      observaciones: "",
      kilometraje: 0,
      paradas: [],
      vuelta: "",
      celular: "",
      tipo: "",
      adicional: "",
      importe: 0,
      regreso: 0,
      remitosDetalle: "",
    };
    this.locacionesArray = [];
  }
  public showSwal(id) {
    swal({
      title: "Estás seguro?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success ",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "No",

      buttonsStyling: false,
    })
      .then((isConfirm) => {
        if (isConfirm.value == true) {
          this.eliminar(id);
        }
      })
      .catch(swal.noop);
  }
  public tipoUnidadAll;
  public getTipoUnidadAll() {
    this._ViajesService.getTipoUnidadAll(this.identity.token).subscribe(
      (response) => {
        this.tipoUnidadAll = response;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public clienteAll;
  public getClienteAll() {
    this._ViajesService.getClienteAll(this.identity.token).subscribe(
      (response) => {
        this.clienteAll = response;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public transportistaAll;
  public getTransportistaAll() {
    this._ViajesService.getTransportistaAll(this.identity.token).subscribe(
      (response) => {
        this.transportistaAll = response;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public unidadAll;
  public getUnidadAll() {
    this._ViajesService.getUnidadAll(this.identity.token).subscribe(
      (response) => {
        this.unidadAll = response;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public personalAll;
  public getPersonalAll() {
    this._ViajesService.getPersonalAll(this.identity.token).subscribe(
      (response) => {
        this.personalAll = response;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public locacionesAll;
  public getLocacionesAll() {
    this._ViajesService.getLocacionesAll(this.identity.token).subscribe(
      (response) => {
        this.locacionesAll = response;
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }
  public modalParadas;
  public ModalParadas(id) {
    this.viajesArray.forEach((element) => {
      if (element.id == id) {
        this.modalParadas = element.paradas;
      }
    });
  }

  // MODULO DE VALOR VIAJE

  public ValorViajeDistinto(id) {
    this.viajesArray.forEach((element) => {
      if (element.id == id) {
        this.modalValorDistinto = element;
      }
    });
  }
  public idValorViaje;
  public ValorViajeIgual(id) {
    this.idValorViaje = id;
    this.ValorViaje = {
      importe: "",
    };
  }
  onValorViajeIgualForm() {
    if (this.ValorViaje.importe != "") {
      this._ViajesService
        .viajeAutValor(this.ValorViaje, this.identity.token, this.idValorViaje)
        .subscribe(
          (response) => {
            this.showNotification("top", "center", response.mensaje, "warning");
            $("#ValorViajeIgual").modal("hide");
          },
          (error) => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
            }
          }
        );
    }
  }

  // MODULO DE COSTO
  public CostoViajeDistinto(id) {
    this.viajesArray.forEach((element) => {
      if (element.id == id) {
        this.modalCostoDistinto = element;
      }
    });
  }

  public idCosto;
  public CostoViajeIgual(id) {
    this.idCosto = id;
    this.ValorViaje = {
      importe: "",
    };
  }
  onCostoIgualForm() {
    if (this.ValorViaje.importe != "") {
      this._ViajesService
        .viajeAutCosto(this.ValorViaje, this.identity.token, this.idCosto)
        .subscribe(
          (response) => {
            this.showNotification("top", "center", response.mensaje, "warning");
            $("#CostoViajeIgual").modal("hide");

            this.All(this.fechaDesde, this.fechaHasta);
          },
          (error) => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
            }
          }
        );
    }
  }
  public estado(id) {
    this.viajesArray.forEach((element) => {
      if (element.id == id) {
        this.modalestado = element;
      }
    });
  }
  public modalremito = "";
  public remito(id) {
    this.viajesArray.forEach((element) => {
      if (element.id == id) {
        this.modalremito = element;
      }
    });
  }

  public remitosAuth(id) {
    swal({
      title: "Estás seguro?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success ",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "No",

      buttonsStyling: false,
    })
      .then((isConfirm) => {
        if (isConfirm.value == true) {
          this._ViajesService.remito(this.identity.token, id).subscribe(
            (response) => {
              this.showNotification(
                "top",
                "center",
                response.mensaje,
                "success"
              );
              this.All(this.fechaDesde, this.fechaHasta);
            },
            (error) => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
              }
            }
          );
        }
      })
      .catch(swal.noop);
  }
  onObservacion() {
    this._ViajesService
      .estadoAuth(
        this.identity.token,
        this.cancelviajeestado,
        this.Observaciones
      )
      .subscribe(
        (response) => {
          this.showNotification("top", "center", response.mensaje, "success");
          $("#CANCELARMODAL").modal("hide");
          this.All(this.fechaDesde, this.fechaHasta);
          this.cancelviajeestado = "";
        },
        (error) => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
        }
      );
  }
  public cancelviajeestado;
  public cancelarestado(id) {
    this.cancelviajeestado = "";
    this.Observaciones = {
      observacion: "",
    };
    this.cancelviajeestado = id;
  }
  public telefonopersona;
  public telefono(id) {
    this.viajesArray.forEach((element) => {
      if ((element.id = id)) {
        this.telefonopersona = element.celular;
      }
    });
  }
  public fechaChange;
  onSubmitFecha() {
    this.fechaDesde = new Date(this.fecha.date);
    this.fechaHasta = new Date(this.fecha.date);
    this.fechaDesde.setHours(0, 0, 0);
    this.fechaHasta.setHours(23, 59, 59);
    this.All(this.fechaDesde, this.fechaHasta);
  }
}
