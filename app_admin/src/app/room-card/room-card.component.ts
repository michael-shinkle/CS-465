import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Room } from "models/room";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-room-card",
  templateUrl: "./room-card.component.html",
  styleUrls: ["./room-card.component.css"],
})
export class RoomCardComponent implements OnInit {
  @Input("room") room: Room;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  }

  private editRoom(room: Room): void {
    localStorage.removeItem("room");
    localStorage.setItem("room", JSON.stringify(room));
    this.router.navigate(['edit-room'])
  }

  private deleteRoom(room: Room): void {
    localStorage.removeItem("room");
    localStorage.setItem("room", JSON.stringify(room));
    this.router.navigate(['delete-room'])
  }
  
}
