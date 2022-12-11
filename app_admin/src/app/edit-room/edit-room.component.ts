import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoomDataService } from "../services/room-data.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-edit-room",
  templateUrl: "./edit-room.component.html",
  styleUrls: ["./edit-room.component.css"],
})
export class EditRoomComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;

  public credentials = { name: "", email: ""};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roomService: RoomDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // retrieve stashed roomID
    let roomString = localStorage.getItem("room");
    let room = JSON.parse(roomString);
    
    if (!room) {
      alert("something wrong, couldn't find where I stashed roomCode!");
      this.router.navigate([""]);
      return;
    }

    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [room.code, Validators.required],
      name: [room.name, Validators.required],
      rate: [room.rate, Validators.required],
      image: [room.image, Validators.required],
      description: [room.description, Validators.required],
      link: [room.link, Validators.required],
    });

    this.roomService.getRoom(room.code).then((data) => {
      // don't use editFrom.setValue() as it will throw console error
      this.editForm.patchValue(data);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.credentials=this.authenticationService.getCurrentUser();
      const token = this.authenticationService.getToken();
      this.roomService.updateRoom(this.editForm.value, this.credentials, token).then((data) => {
        this.router.navigate(["list-rooms"]);
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
