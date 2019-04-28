import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'furv-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit() {
    if (this.authentificationService.userIsLoggedIn()) {
      this.refreshFlags();
    }
  }

  refreshFlags() {
    this.isAuthenticated = true;
    this.welcomeMessage = "Bienvenue";
  }

  login(formData){
    this.authentificationService.login(formData)
                                .subscribe(
                                  data => this.handleLoginSuccess(data),
                                  error => this.handleLoginFailure(error)
                                );
  }

  handleLoginSuccess(data) {
    console.log("success", data);
    this.jbbData = data;
    this.refreshFlags();
    localStorage.setItem('jbb-data', JSON.stringify(data));
  }

  handleLoginFailure(error) {
    console.log("error", error);
  }

}
