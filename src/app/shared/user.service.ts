import { Injectable } from "@angular/core";
import { Config } from "~/app/shared/config";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { firestore } from "nativescript-plugin-firebase/app";
import { LoginOptions, User } from "nativescript-plugin-firebase/firebase";
import { DocumentSnapshot, firebase } from "nativescript-plugin-firebase/firebase-common";
import { NavigationService } from "../shared/navigation.service";
import { LoadingIndicator } from "nativescript-loading-indicator";

@Injectable()
export class UserService {

    $currentUser = new BehaviorSubject<User>(null);
    $registeredUser = new BehaviorSubject<boolean>(false);
    userCollection = null;

    constructor(private http: HttpClient,
                private navigationService: NavigationService,
                private loading: LoadingIndicator) { }

    gotoLogin(isRegistered) {
       this.$registeredUser.next(isRegistered);
       this.navigationService.go(["/login"], "fade");
    }

    // https://medium.com/@jasonbyrne/closer-look-at-firebase-set-versus-update-eceff34d056b
    createOrUpdateUser(user: User, userExists: boolean) {
      this.userCollection.doc(user.email)[userExists ? "update" : "set"](user);
      this.$currentUser.next(user);
    }

    get currentUser(): Observable<User> {
      return this.$currentUser.asObservable();
    }

    get isRegisteredUser(): Observable<boolean> {
        return this.$registeredUser.asObservable();
    }

    register(user) {
        firebase.createUser(user).then(() => {
            console.log("user registration successful");
            },
            (errorMessage) => {
                console.error("error occurred while user registration", errorMessage);
            });
    }

    login(loginOptions: LoginOptions) {
        this.loading.show(Config.loadingOptions);
        this.userCollection = firestore().collection("users");
        firebase.login(loginOptions).then(async (result) => {

                const userExists = await this.userExists(result.email);
                this.createOrUpdateUser(result, userExists);
                this.navigationService.go(["promotions"]);
                // appSettings.setString("access_token", result.providers[1].token);
                this.loading.hide();
            },
            (err) => {
                console.log("error login ", err);
                this.loading.hide();
            }
        );
    }

    async userExists(email): Promise<boolean> {
        const documentReference = this.userCollection.doc(email);

        const docSnapShot: DocumentSnapshot = await documentReference.get();

        return docSnapShot.exists;
    }

    logout() {
        firebase.logout();
        this.$currentUser.next(null);
        this.navigationService.go(["/login"], "fade");
    }

}
