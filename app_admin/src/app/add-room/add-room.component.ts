import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoomDataService } from '../services/room-data.service';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  public credentials = { name: "", email: ""};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ["", Validators.required],
      name: ["", Validators.required],
      rate: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
      link: ["", Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid){
      this.credentials = this.authenticationService.getCurrentUser();
      const token = this.authenticationService.getToken();
      this.roomService.addRoom(this.addForm.value, this.credentials, token).then((data) => {
        console.log(data);
        this.router.navigate(["list-rooms"]);
      })
    }
  }

  get f() {
    return this.addForm.controls;
  }

}
