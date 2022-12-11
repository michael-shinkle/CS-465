import { Inject, Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { Room } from "models/room";
import { User } from "models/user";
import { AuthResponse } from "models/authResponse";
import { BROWSER_STORAGE } from "../storage";

@Injectable({
  providedIn: "root",
})
export class RoomDataService {
  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = "http://localhost:3000/api/";
  private roomUrl = `${this.apiBaseUrl}rooms/`;

  public getRooms(): Promise<Room[]> {
    console.log("Inside RoomDataService#getRooms");
    return this.http
      .get(this.roomUrl)
      .toPromise()
      .then((response) => response.json() as Room[])
      .catch(this.handleError);
  }

  public getRoom(roomCode: string): Promise<Room> {
    console.log(`Inside RoomDataService#getRoom(${roomCode})`);
    return this.http
      .get(this.roomUrl + roomCode)
      .toPromise()
      .then((response) => response.json() as Room)
      .catch(this.handleError);
  }

  public addRoom(formData: Room, user: User, token: string): Promise<Room> {
    console.log("Inside roomDataService#addRoom");
    
    // add bearer token to authorization header
    let headers = new Headers();
    headers.set("Authorization", "Bearer " + token);

    return this.http
      .post(this.roomUrl, formData, { headers: headers })
      .toPromise()
      .then((response) => response.json() as Room[])
      .catch(this.handleError);
  }

  public updateRoom(formData: Room, user: User, token: string): Promise<Room> {
    console.log("Inside roomDataService#updateRoom");

    // add bearer token to authorization header
    let headers = new Headers();
    headers.set("Authorization", "Bearer " + token);
    return this.http
      .put(this.roomUrl + formData.code, formData, { headers: headers })
      .toPromise()
      .then((response) => response.json() as Room[])
      .catch(this.handleError);
  }

  public deleteRoom(roomCode: string, token: String): Promise<any> {
    console.log("Inside roomDataService#deleteRoom");

    let headers = new Headers();
    headers.set("Authorization", "Bearer " + token);

    return this.http
      .delete(this.roomUrl + roomCode, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error); //for demo purposes only
    return Promise.reject(error.message || error);
  }
}
