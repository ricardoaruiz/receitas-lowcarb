import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from './model/usuario.model';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public login(): void {
    let usuario: Usuario = this.formLogin.value;
    this.loginService.login(usuario)
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        (erro) => {
          console.log(erro);
        }
      )
  }

  public cleanForm(): void {
    this.formLogin.reset();
  }

  private buildForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['ricardo.almendro.ruiz@gmail.com', []],
      senha: ['123456',[]]
    });
  }

}
