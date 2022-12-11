import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoomDataService } from "../services/room-data.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-delete-room",
  templateUrl: "./delete-room.component.html",
  styleUrls: ["./delete-room.component.css"],
})

export class DeleteRoomComponent implements OnInit {
  constructor(
    private router: Router,
    private roomService: RoomDataService,
    private authenticationService: AuthenticationService
  ) {}

  roomString = localStorage.getItem("room");
  room = JSON.parse(this.roomString);

  ngOnInit() {}

  deleteRoom() {
    const token = this.authenticationService.getToken();
    this.roomService.deleteRoom(this.room.code, token).then(() => {
      this.router.navigate(['list-rooms'])
    });
  }

  goBack(){
    this.router.navigate(['list-rooms'])
  }

  
}
