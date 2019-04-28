import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { Router } from "@angular/router";

@Component({
  selector: 'furv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService, private router:Router) { }

  ngOnInit() {
  }

  register(formData){
    this.authentificationService.register(formData)
                                .subscribe(
                                  data => this.handleRegisterSuccess(data),
                                  error => this.handleRegisterFailure(error)
                                )

  }

  handleRegisterSuccess(data) {
    console.log('success in handleRegister', data);
    this.router.navigate(['/']);
  }

  handleRegisterFailure(error) {
    console.error('failure', error);
  }

}
