import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { NavigationService } from "../shared/navigation.service";
import * as appSettings from "tns-core-modules/application-settings";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { options } from "../shared/loading-indicator.options";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from "~/app/shared/user.service";

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {

    constructor(private ref: ChangeDetectorRef,
                private navigationService: NavigationService,
                private user: UserService,
                private loading: LoadingIndicator,
                private page: Page) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    login() {
        this.loading.show(options);
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ["public_profile", "email"]
            }
        }).then((result: any) => {
                this.user.createUser(result);
                this.navigationService.go(["promotions"]);
                appSettings.setString("access_token", result.providers[1].token);
                this.loading.hide();
            },
            (err) => {
                console.log("error logging in to facebook: ", err);
                this.loading.hide();
            }
        );
    }
}
