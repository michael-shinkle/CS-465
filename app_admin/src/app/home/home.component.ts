import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  navTrips(){
    this.router.navigate(['list-trips']);
  }

  navRooms(){
    this.router.navigate(['list-rooms'])
  }

}
