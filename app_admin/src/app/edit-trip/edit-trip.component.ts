import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-edit-trip",
  templateUrl: "./edit-trip.component.html",
  styleUrls: ["./edit-trip.component.css"],
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;

  public credentials = { name: "", email: ""};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // retrieve stashed tripID
    let tripString = localStorage.getItem("trip");
    let trip = JSON.parse(tripString);
    
    if (!trip) {
      alert("something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate([""]);
      return;
    }

    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [trip.code, Validators.required],
      name: [trip.name, Validators.required],
      length: [trip.length, Validators.required],
      start: [trip.start, Validators.required],
      resort: [trip.resort, Validators.required],
      perPerson: [trip.perPerson, Validators.required],
      image: [trip.image, Validators.required],
      description: [trip.description, Validators.required],
      link: [trip.link, Validators.required],
    });

    this.tripService.getTrip(trip.code).then((data) => {
      // don't use editFrom.setValue() as it will throw console error
      this.editForm.patchValue(data);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.credentials=this.authenticationService.getCurrentUser();
      const token = this.authenticationService.getToken();
      this.tripService.updateTrip(this.editForm.value, this.credentials, token).then((data) => {
        this.router.navigate(["list-trips"]);
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
