import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "nativescript-plugin-firebase/firebase";

@Injectable()
export class UserService {

    $currentUser = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    createUser(user: any) {
      this.$currentUser.next(user);

      return this.http.put("https://wellnezz.firebaseio.com/users.json", user).subscribe();
    }

    get currentUser(): Observable<User> {
      return this.$currentUser.asObservable();
    }
}
