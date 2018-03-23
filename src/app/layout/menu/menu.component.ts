import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ LoginService ]
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  public logoff(): void {
    this.loginService.logoff()
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
