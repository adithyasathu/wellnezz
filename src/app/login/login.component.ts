import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from "~/app/shared/user.service";
import { NavigationService } from "~/app/shared/navigation.service";
import { LoginOptions } from "nativescript-plugin-firebase";
import { firebase } from "nativescript-plugin-firebase/firebase-common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface IUserInput {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

@Component({
    selector: "wellness-login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit {

    registeredUser: boolean = false;
    signUpForm: FormGroup;
    signInForm: FormGroup;

    constructor(private userService: UserService,
                private navigationService: NavigationService,
                private page: Page,
                private formBuilder: FormBuilder) {

        this.signUpForm = this.formBuilder.group({
            email: ["", [ Validators.required, Validators.email ] ],
            name: ["", Validators.required],
            password: ["", [ Validators.required, Validators.min(8)] ],
            phoneNumber: ["", [ Validators.pattern("[0-9]{10}")] ]
        });

        this.signInForm = this.formBuilder.group({
            email: ["", [ Validators.required, Validators.email ] ],
            password: ["", [ Validators.required, Validators.min(8)] ]
        });
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.userService.isRegisteredUser
            .subscribe((registeredUser) => this.registeredUser = registeredUser);
    }

    login(action: "facebook" | "mobile" | "google" | "mail") {
        console.log(" Tapped on ", action);
        const options: LoginOptions = { type: firebase.LoginType.PASSWORD };
        switch (action) {

            case "facebook":
                options.type = firebase.LoginType.FACEBOOK;
                break;
            case "google":
                options.type = firebase.LoginType.GOOGLE;
                break;
            case "mobile":
                options.type = firebase.LoginType.PHONE;
                options.phoneOptions = { phoneNumber: "+61414305125" };
                break;
            default:
                options.passwordOptions = {
                    email: this.signUpForm.get("email").value,
                    password: this.signUpForm.get("password").value
                };
        }
        this.userService.login(options);
    }

    register() {
        this.userService.register({
            email: this.signUpForm.get("email").value,
            password: this.signUpForm.get("password").value
        });
    }

    onBackButtonTap() {
        this.navigationService.go(["/loading"]);
    }

    get isRegisteredUser(): boolean {
        return this.registeredUser;
    }

}
