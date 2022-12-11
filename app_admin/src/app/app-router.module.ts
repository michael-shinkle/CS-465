import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import { TripListingComponent } from "./trip-listing/trip-listing.component";
import { AddTripComponent } from "./add-trip/add-trip.component";
import { EditTripComponent } from "./edit-trip/edit-trip.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { DeleteTripComponent } from "./delete-trip/delete-trip.component";
import { RoomListingComponent } from "./room-listing/room-listing.component";
import { AddRoomComponent } from "./add-room/add-room.component";
import { EditRoomComponent } from "./edit-room/edit-room.component";
import { DeleteRoomComponent } from "./delete-room/delete-room.component";


const routes: Routes = [
    {path: 'add-trip', component: AddTripComponent},
    {path: 'edit-trip', component: EditTripComponent},
    {path: 'delete-trip', component: DeleteTripComponent},
    {path: 'add-room', component: AddRoomComponent},
    {path: 'edit-room', component: EditRoomComponent},
    {path: 'delete-room', component: DeleteRoomComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'list-trips', component: TripListingComponent},
    {path: 'list-rooms', component: RoomListingComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}