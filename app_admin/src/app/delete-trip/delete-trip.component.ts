import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-delete-trip",
  templateUrl: "./delete-trip.component.html",
  styleUrls: ["./delete-trip.component.css"],
})

export class DeleteTripComponent implements OnInit {
  constructor(
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  tripString = localStorage.getItem("trip");
  trip = JSON.parse(this.tripString);

  ngOnInit() {}

  deleteTrip() {
    const token = this.authenticationService.getToken();
    this.tripService.deleteTrip(this.trip.code, token).then(() => {
      this.router.navigate(['list-trips'])
    });
  }

  goBack(){
    this.router.navigate(['list-trips'])
  }

  
}
