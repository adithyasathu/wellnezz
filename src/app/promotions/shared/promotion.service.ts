import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Promotion } from "./promotion.model";


const editableProperties = [
    "description",
    "imageUrl",
    "name",
    "expires",
    "address",
    "allStores"
];

/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable({
    providedIn: "root"
})
export class PromotionService {
    private static cloneUpdateModel(promotion: Promotion): object {
        // tslint:disable-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = promotion[e], a), {});
    }

    private _promotions: Array<Promotion> = [];

    constructor(private _ngZone: NgZone) { }

    getPromotionById(id: string): Promotion {
        if (!id) {
            return;
        }

        return this._promotions.filter((promotion) => {
            return promotion.id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "promotions";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).pipe(catchError(this.handleErrors));
    }

    update(promotionModel: Promotion): Promise<any> {
        const updateModel = PromotionService.cloneUpdateModel(promotionModel);

        return firebase.update("/promotions/" + promotionModel.id, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.storage.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Promotion> {
        this._promotions = [];

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._promotions.push(new Promotion(data[id]));
                }
            }
        }

        return this._promotions;
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }
}
