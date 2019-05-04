import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { firebase } from "nativescript-plugin-firebase/firebase-common";
import { UserService } from "~/app/shared/user.service";
import { User } from "nativescript-plugin-firebase";

@Component({
    selector: "SideDrawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})
export class SideDrawerComponent implements OnInit {

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }

    get user(): User {
        return this._user;
    }

    // The "selectedPage" is a component input property.
    // It is used to pass the current page title from the containing page component.
    @Input() selectedPage: string;

    // The "sideDrawer" is the actual drawer itself
    @Input() sideDrawer: RadSideDrawerComponent;

    _user: User;

    private _navigationItems: Array<any>;

    constructor(
        private routerExtensions: RouterExtensions,
        private userService: UserService
    ) {

    }

    // Use the SideDrawerComponent "onInit" event handler to initialize the properties data values.
    // The navigationItems property is initialized here and is data bound to <ListView> in the SideDrawer view file.
    // Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    ngOnInit(): void {
        this._navigationItems = [
            {
                title: "Promotions",
                name: "promotions",
                route: "/promotions"
            },
            {
                title: "Log Out",
                name: "logout",
                route: "/login"
            }
        ];

        this.userService.currentUser.subscribe((user) => {
            console.log("user", user);
            this._user = user;
        });

    }

    // Use the "itemTap" event handler of the <ListView> component for handling list item taps.
    // The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
    // based on the tapped navigationItem's route.
    onNavigationItemTap(args: ListViewEventData): void {
        const navigationItemView = args.view;
        const navigationItemRoute = navigationItemView.bindingContext.route;

        if (navigationItemView.bindingContext.name === "logout") {
            this.onLogout();
        } else if (this.isPageSelected(navigationItemView.bindingContext.title)) {
            this.sideDrawer.sideDrawer.closeDrawer();
        } else {
            this.routerExtensions.navigate([navigationItemRoute], {
                transition: {
                    name: "fade"
                }
            });
        }
    }

    onLogout(): void {
        firebase.logout();
        this.routerExtensions.navigate(["/login"], {
            clearHistory: true,
            transition: {
                name: "fade"
            }
        });
    }

    // The "isPageSelected" function is bound to every navigation item on the <ListView>.
    // It is used to determine whether the item should have the "selected" class.
    // The "selected" class changes the styles of the item, so that you know which page you are on.
    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
