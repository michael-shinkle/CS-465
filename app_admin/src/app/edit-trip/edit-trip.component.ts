import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";

@Component({
  selector: "app-edit-trip",
  templateUrl: "./edit-trip.component.html",
  styleUrls: ["./edit-trip.component.css"],
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    // retrieve stashed tripID
    let tripString = localStorage.getItem("trip");
    let trip = JSON.parse(tripString);
    console.log(trip);
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
      console.log(data);
      // don't use editFrom.setValue() as it will throw console error
      this.editForm.patchValue(data);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).then((data) => {
        console.log(data);
        this.router.navigate([""]);
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
