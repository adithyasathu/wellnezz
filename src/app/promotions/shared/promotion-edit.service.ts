import { Injectable } from "@angular/core";

import { Promotion } from "./promotion.model";
import { PromotionService } from "./promotion.service";

@Injectable({
    providedIn: "root"
})
export class PromotionEditService {
    private _editModel: Promotion;

    constructor(private _promotionService: PromotionService) {}

    startEdit(id: string): Promotion {
        this._editModel = null;

        return this.getEditablePromotionById(id);
    }

    getEditablePromotionById(id: string): Promotion {
        if (!this._editModel || this._editModel.id !== id) {
            const promotion = this._promotionService.getPromotionById(id);

            // get fresh editable copy of promotion model
            this._editModel = new Promotion(promotion);
        }

        return this._editModel;
    }
}
