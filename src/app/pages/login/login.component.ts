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

    constructor(
        private element: ElementRef, 
        private _loginService: LoginService ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }

    ngOnInit() {
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
            'name': '',
            'password': '',
            'iat':new Date(),
          };
    }

    onSubmit() {
        console.log(this.user);
    
    
        this._loginService.login(this.user).subscribe(
          response => {
              //const identity = response;
              //this.identity = identity;
           console.log(response);
            //localStorage.setItem('identity', JSON.stringify(identity));
            // GET TOKEN
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
            }
        }
        );
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