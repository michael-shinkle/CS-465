import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoomDataService } from "../services/room-data.service";
import { Room } from "models/room";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-room-listing",
  templateUrl: "./room-listing.component.html",
  styleUrls: ["./room-listing.component.css"],
  providers: [RoomDataService],
})
export class RoomListingComponent implements OnInit {
  rooms: Room[];
  message: string;

  constructor(
    private roomDataService: RoomDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  private addRoom(): void {
    this.router.navigate(["add-room"]);
  }

  private getTrips(): void {
    console.log("Inside RoomListingComponent#getRooms");
    this.message = "Searching for rooms";
    this.roomDataService.getRooms().then((foundRooms) => {
      this.message = foundRooms.length > 0 ? "" : "No rooms found";
      this.rooms = foundRooms;
    })
  }

  ngOnInit(): void{
    if(this.isLoggedIn()){
      this.getTrips();
    } else {
      this.router.navigateByUrl('#');
    }
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
