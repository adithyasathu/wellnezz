import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { Promotion } from "./shared/promotion.model";
import { PromotionService } from "./shared/promotion.service";
import { firebase } from "nativescript-plugin-firebase/firebase-common";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { DrawerTransitionBase } from "nativescript-ui-sidedrawer";

@Component({
    selector: "PromotionsList",
    moduleId: module.id,
    templateUrl: "./promotion-list.component.html",
    styleUrls: ["./promotion-list.component.scss"]
})
export class PromotionListComponent implements OnInit, OnDestroy {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _isLoading: boolean = false;
    private _promotions: ObservableArray<Promotion> = new ObservableArray<Promotion>([]);
    private _dataSubscription: Subscription;

    private isAndroid: boolean = isAndroid;
    private isIOS: boolean = isIOS;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private _promotionService: PromotionService,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._promotionService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((promotions: Array<Promotion>) => {
                    this._promotions = new ObservableArray(promotions);
                    this._isLoading = false;
                });
        }
    }

    ngOnDestroy(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }

    logout() {
       console.log("calling logout ...");
       firebase.logout();
       console.log("logged out ...");
       this._routerExtensions.navigate(["/login"],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    get promotions(): ObservableArray<Promotion> {
        return this._promotions;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    // According to guidelines, if you have a drawer on your page, you should always
    // have a button that opens it. Use the showDrawer() function to open the app drawer section.
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    }

    onPromotionItemTap(args: ListViewEventData): void {
        const tappedPromotionItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/promotions/promotion-detail", tappedPromotionItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
