import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'furv-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit() {
    if (this.authentificationService.userIsLoggedIn()) {
      const token = JSON.parse(localStorage.getItem('jbb-data'));
      this.decodedToken = this.authentificationService.decodeToken(token.token);
      console.log("user profil token : " + this.decodedToken);
      if (this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

}
