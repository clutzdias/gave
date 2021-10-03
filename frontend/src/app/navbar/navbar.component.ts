import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(public loginService: LoginService,
              public authService: AuthService){
    
  }

  ngOnInit(){
    
  }

}
