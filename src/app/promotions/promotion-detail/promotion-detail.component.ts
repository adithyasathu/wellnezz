import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Promotion } from "../shared/promotion.model";
import { PromotionService } from "../shared/promotion.service";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "PromotionDetail",
    moduleId: module.id,
    templateUrl: "./promotion-detail.component.html"
})
export class PromotionDetailComponent implements OnInit {
    private _promotion: Promotion;

    constructor(
        private _promotionService: PromotionService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const promotionId = params.id;

                this._promotion = this._promotionService.getPromotionById(promotionId);
            });
    }

    get promotion(): Promotion {
        return this._promotion;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onJoinTap(): void {
        console.log("User is interested to join !!");
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /promotions/promotion-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/promotions/promotion-detail-edit", this._promotion.id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
