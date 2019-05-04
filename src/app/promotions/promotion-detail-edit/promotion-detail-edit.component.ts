import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { PromotionEditService } from "../shared/promotion-edit.service";
import { Promotion } from "../shared/promotion.model";
import { PromotionService } from "../shared/promotion.service";

@Component({
    moduleId: module.id,
    selector: "PromotionDetailEdit",
    templateUrl: "./promotion-detail-edit.component.html",
    styleUrls: ["./promotion-detail-edit.component.scss"]
})
export class PromotionDetailEditComponent implements OnInit {
    private _promotion: Promotion;
    private _isPromotionImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _promotionService: PromotionService,
        private _promotionEditService: PromotionEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {

        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const promotionId = params.id;

                this._promotion = this._promotionEditService.startEdit(promotionId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get promotion(): Promotion {
        return this._promotion;
    }

    get promotionImageUrl(): string {
        return this._promotion.imageUrl;
    }

    set promotionImageUrl(value: string) {
        this._promotion.imageUrl = value;
        this._isPromotionImageDirty = true;
    }

    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDoneButtonTap(): void {
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Firebase database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/

        /* ***********************************************************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isPromotionImageDirty && this._promotion.imageUrl) {
            queue = queue
                .then(() => this._promotionService.uploadImage(this._promotion.imageStoragePath, this._promotion.imageUrl))
                .then((uploadedFile: any) => {
                    this._promotion.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._promotionService.update(this._promotion))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/promotions"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *************************************************************/

        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        const readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
        const queue = Promise.resolve();
        queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
            .then(() => this._routerExtensions.navigate(["/promotions"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            }));
    }
}
