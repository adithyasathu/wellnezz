import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from "~/app/shared/user.service";

@Component({
    selector: "wellness-loading",
    moduleId: module.id,
    templateUrl: "loading.component.html",
    styleUrls: ["loading.component.scss"]
})
export class LoadingComponent implements OnInit {

    constructor(private userService: UserService, private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    registered(isRegistered: boolean) {
        console.log(" Tapped on ", isRegistered);
        this.userService.gotoLogin(isRegistered);
    }
}
