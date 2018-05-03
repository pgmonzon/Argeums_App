import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public user;
    public identity;
    public token;
    public errorMessage;
    public accountDontExist;
    public camposIncorrectos;

    constructor(
        private element: ElementRef, 
        private _loginService: LoginService ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }

    ngOnInit() {
        this.accountDontExist=null;
        this.camposIncorrectos=null;
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
        this.user = {
            'usuario': '',
            'clave': '',
            'audience':'app_desarrollo',
          };
    }

    onSubmit() {
        this._loginService.generateToken(this.user).subscribe(
          response => {
                this.sendlogin(response.token);
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                this.showNotification('top','center','Completá los campos');
            }
        }
        );
      }

    sendlogin(token){
        this._loginService.signup(token).subscribe(
            response => {
                    const identity = response;
                    if(identity.estado!= "ERROR"){
                        this.identity = identity;
                        localStorage.setItem('identity', JSON.stringify(identity));
                        window.location.href = '';

                    }
                    else{
                        this.showNotification('top','center',identity.mensaje);

                    }
            

          },
          error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                this.showNotification('top','center','Usuario o clave incorrecta');

              }
          }
          );
    }



    showNotification(from: any, align: any,text: any) {
    
        $.notify({
            icon: 'notifications',
            message: text
        }, {
            type: 'danger',
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
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }
}
